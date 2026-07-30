import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, type = "signup" } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1. Generate 4-digit OTP code matching the 4 input boxes UI
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // 2. Store OTP in Supabase public.otp_codes table
    const supabase = await createClient();
    const { error: dbError } = await (supabase as any).from("otp_codes").insert({
      email,
      otp_code: otpCode,
      purpose: type,
      expires_at: expiresAt,
      is_used: false,
    });

    if (dbError) {
      console.error("DB Insert OTP Error:", dbError);
    }

    // 3. Send Direct Email via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY environment variable is not configured." }, { status: 500 });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Greelance <onboarding@resend.dev>",
        to: [email],
        subject: type === "recovery" ? "Greelance - Password Reset Verification Code" : "Greelance - Account Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 25px; border: 1px solid #E4E8F0; border-radius: 16px; background-color: #FFFFFF;">
            <h2 style="color: #050A62; margin-bottom: 8px;">Verification Code</h2>
            <p style="color: #4A5568; font-size: 15px; margin-bottom: 20px;">Use the following code to complete your verification on Greelance:</p>
            <div style="background-color: #F3F7FF; border: 1px solid #D2DCFF; padding: 18px; border-radius: 12px; text-align: center; margin-bottom: 20px;">
              <span style="font-size: 38px; font-weight: bold; color: #3038BD; letter-spacing: 8px;">${otpCode}</span>
            </div>
            <p style="color: #A6B2D0; font-size: 13px;">This verification code will expire in 10 minutes. If you did not request this code, please ignore this email.</p>
          </div>
        `,
      }),
    });

    const resendData = await resendResponse.json();
    console.log("Resend API Response:", resendData);

    if (!resendResponse.ok) {
      return NextResponse.json({ error: resendData.message || "Failed to send email via Resend" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "OTP code sent successfully to your email." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("Send OTP Route Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
