import { NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/user.models';

export async function POST(req) {
    try {
        await connectDB();
        const { email, otp } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        if (user.otp.code !== otp || user.otp.expiry < new Date()) {
            return NextResponse.json(
                { error: 'Invalid or expired OTP' },
                { status: 400 }
            );
        }

        user.isVerified = true;
        user.otp = undefined;
        await user.save();

        return NextResponse.json({ message: 'Email verified successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to verify OTP' },
            { status: 500 }
        );
    }
}
