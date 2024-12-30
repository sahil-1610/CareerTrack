import { NextResponse } from "next/server";
import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/user.models";
import { sendWelcomeEmail } from "@/helpers/nodeMailer";

export async function POST(req) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    if (!user.otp || !user.otp.code || !user.otp.expiry) {
      return NextResponse.json({ error: "No OTP found" }, { status: 400 });
    }

    if (new Date() > new Date(user.otp.expiry)) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    if (user.otp.code !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    // Update verification status first
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    // Send welcome email in a try-catch block
    try {
      console.log("Attempting to send welcome email for:", {
        email: user.email,
        username: user.username,
      });
      await sendWelcomeEmail(user.email, user.username);
      console.log("Welcome email sent successfully");
    } catch (emailError) {
      console.error("Welcome email failed:", emailError);
      // Don't throw error here - we still want to return success for verification
    }

    return NextResponse.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify email" },
      { status: 500 }
    );
  }
}
