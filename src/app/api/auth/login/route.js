import { NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/user.models';

export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        const user = await User.findByCredentials(email, password);
        if (!user.isVerified) {
            return NextResponse.json(
                { error: 'Please verify your email first' },
                { status: 401 }
            );
        }

        const token = await user.generateAuthToken();
        
        const response = NextResponse.json({
            message: 'Login successful',
            user: {
                username: user.username,
                email: user.email
            }
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid login credentials' },
            { status: 401 }
        );
    }
}
