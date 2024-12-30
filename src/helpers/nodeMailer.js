import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail service instead of custom SMTP
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use app password if 2FA is enabled
    },
});

async function sendVerificationEmail(email, otp) {
    try {
        console.log('Attempting to send email to:', email); // Debug log

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification - CareerTrack',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333;">Verify Your Email</h1>
                    <p>Your verification code is:</p>
                    <h2 style="color: #0066cc; letter-spacing: 2px; font-size: 24px;">${otp}</h2>
                    <p>This code will expire in 10 minutes.</p>
                    <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Email sending error:', error);
        throw new Error('Failed to send verification email');
    }
}

const sendContactFormEmail = async (name, email, subject, message) => {
    try {
        // Email to admin
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `Contact Form: ${subject}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message}</p>
            `
        });

        // Auto-reply to user
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting us',
            html: `
                <h3>Thank you for reaching out!</h3>
                <p>Dear ${name},</p>
                <p>We have received your message and will get back to you soon.</p>
                <p>Best regards,</p>
                <p>Your Team</p>
            `
        });
    } catch (error) {
        throw new Error('Email sending failed');
    }
};

async function sendWelcomeEmail(email, username) {
    if (!email || !username) {
        console.error('Missing required parameters:', { email, username });
        throw new Error('Email and username are required for welcome email');
    }

    try {
        console.log('Attempting to send welcome email to:', email); // Debug log
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to CareerTrack!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333;">Welcome to CareerTrack!</h1>
                    <p>Dear ${username},</p>
                    <p>Thank you for joining CareerTrack! We're excited to have you as part of our community.</p>
                    <p>With CareerTrack, you can:</p>
                    <ul>
                        <li>Track your career progress</li>
                        <li>Build your professional profile</li>
                        <li>Get personalized career recommendations</li>
                        <li>Connect with other professionals</li>
                    </ul>
                    <p>Get started by completing your profile!</p>
                    <p>Best regards,</p>
                    <p>The CareerTrack Team</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions); // Corrected await
        console.log('Welcome email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Welcome email sending error:', error);
        console.error('Error details:', {
            email,
            username,
            errorMessage: error.message,
            stack: error.stack
        });
        throw new Error(`Failed to send welcome email: ${error.message}`);
    }
}

// Single export statement for all functions
export { 
    sendVerificationEmail,
    sendContactFormEmail,
    sendWelcomeEmail
};
