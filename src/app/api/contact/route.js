import nodemailer from 'nodemailer';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request) {
    try {
        const body = await request.json();
        const { user_name, user_email, user_phone, user_subject, message } = body;

        // 1. Save to Supabase
        const { error: dbError } = await supabase
            .from('contacts')
            .insert([{
                user_name,
                user_email,
                user_phone,
                user_subject,
                message,
            }]);

        if (dbError) {
            console.error("Supabase Error:", dbError);
        }

        // 2. Send Email via Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${user_subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${user_name}</p>
                <p><strong>Email:</strong> ${user_email}</p>
                <p><strong>Phone:</strong> ${user_phone}</p>
                <p><strong>Subject:</strong> ${user_subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return Response.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        console.error("Contact API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
