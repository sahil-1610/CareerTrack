import { NextResponse } from 'next/server';
import connectDB from '@/dbConfig/dbConfig';
import Contact from '@/models/contact.models';
import { sendContactFormEmail } from '@/helpers/nodeMailer';

export async function POST(req) {
    try {
        await connectDB();
        const { name, email, subject, message } = await req.json();

        // Validate inputs
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Create contact entry
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        await contact.save();

        // Send emails
        await sendContactFormEmail(name, email, subject, message);

        return NextResponse.json({
            message: 'Thank you for your message. We will contact you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to submit contact form' },
            { status: 500 }
        );
    }
}
