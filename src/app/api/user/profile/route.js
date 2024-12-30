import { NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import connectDB from '@/dbConfig/dbConfig';
import User from '@/models/user.models';

export async function GET(request) {
    try {
        // Ensure database connection
        await connectDB();
        
        // Get user ID from token
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Find user without password field
        const user = await User.findById(userId)
            .select('-password -__v')
            .lean();
            
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "User found",
            user
        });
    } catch (error) {
        console.error('Profile Error:', error);
        return NextResponse.json(
            { error: error.message || "Error fetching user data" },
            { status: 500 }
        );
    }
}
