import { NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/user.models';
import { sendVerificationEmail } from '@/helpers/nodeMailer';

export async function POST(req) {
    try {
        await connectDB();
        const { username, email, password } = await req.json();

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Create user
        const user = new User({
            username,
            email,
            password,
            otp: {
                code: otp,
                expiry: otpExpiry
            }
        });

        await user.save();
        await sendVerificationEmail(email, otp);

        return NextResponse.json({ 
            message: 'Verification code sent',
            email 
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to process signup' },
            { status: 500 }
        );
    }
}
