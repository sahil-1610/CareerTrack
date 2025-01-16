import { NextResponse } from "next/server";
import { connectDB } from "@/helpers/dbConfig";
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

    if (user.otp.code !== otp || user.otp.expiry < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

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

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
