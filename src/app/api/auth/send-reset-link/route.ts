import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const origin = request.headers.get("origin") || "http://localhost:3000";
    const resetUrl = `${origin}/reset-password?email=${encodeURIComponent(email)}`;

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY is not configured in .env.local" }, { status: 500 });
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
        subject: "Reset Your Greelance Password",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 25px; border: 1px solid #E4E8F0; border-radius: 16px; background-color: #FFFFFF;">
            <h2 style="color: #050A62; margin-bottom: 8px;">Reset Password Request</h2>
            <p style="color: #4A5568; font-size: 15px; margin-bottom: 25px;">We received a request to reset the password for your Greelance account.</p>
            <div style="text-align: center; margin-bottom: 25px;">
              <a href="${resetUrl}" style="display: inline-block; background-color: #3038BD; color: #FFFFFF; font-weight: bold; font-size: 15px; padding: 14px 30px; text-decoration: none; border-radius: 25px;">Reset Password</a>
            </div>
            <p style="color: #A6B2D0; font-size: 13px;">If you did not request a password reset, you can safely ignore this email.</p>
          </div>
        `,
      }),
    });

    const resendData = await resendResponse.json();
    console.log("Resend Reset Link Response:", resendData);

    if (!resendResponse.ok) {
      return NextResponse.json({ error: resendData.message || "Failed to send reset email" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Password reset link sent successfully to your email." });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("Send Reset Link Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
