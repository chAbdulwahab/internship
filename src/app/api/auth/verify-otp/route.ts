import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, otpCode } = await request.json();

    if (!email || !otpCode) {
      return NextResponse.json({ error: "Email and OTP code are required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Check in public.otp_codes table
    const { data: records, error } = await (supabase as any)
      .from("otp_codes")
      .select("*")
      .eq("email", email)
      .eq("otp_code", otpCode)
      .eq("is_used", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1);

    if (error || !records || records.length === 0) {
      return NextResponse.json({ error: "Invalid or expired OTP code" }, { status: 400 });
    }

    const record = records[0];

    // Mark OTP as used
    await (supabase as any).from("otp_codes").update({ is_used: true }).eq("id", record.id);

    return NextResponse.json({ success: true, message: "OTP verified successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
