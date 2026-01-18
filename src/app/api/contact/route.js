import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request) {
    try {
        const body = await request.json();
        const { user_name, user_email, user_phone, user_subject, message } = body;

        // 1. Save to Supabase (Backend Side)
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
            console.error("Supabase Insertion Error:", dbError);
            // We continue to send email even if DB fails, or throw? 
            // Better to log and try to alert. For now, we proceed.
        }

        // 2. Configure Transporter (Support for Gmail or Generic SMTP)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER || process.env.EMAIL_USER, // Support both naming conventions
                pass: process.env.SMTP_PASS || process.env.EMAIL_PASS,
            },
        });

        // 3. Premium HTML Email Template
        const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Portfolio Inquiry</title>
            <style>
                body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; }
                .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
                .header { background: #0b0f1a; padding: 30px; text-align: center; }
                .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px; }
                .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
                .field { margin-bottom: 24px; border-bottom: 1px solid #eeeeee; padding-bottom: 16px; }
                .field:last-child { border-bottom: none; }
                .label { display: block; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; font-weight: 600; }
                .value { display: block; font-size: 16px; color: #1a1a1a; font-weight: 500; }
                .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; }
                .highlight { color: #22d3ee; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>New Inquiry from <span class="highlight">Portfolio</span></h1>
                </div>
                <div class="content">
                    <div class="field">
                        <span class="label">Name</span>
                        <span class="value">${user_name}</span>
                    </div>
                    <div class="field">
                        <span class="label">Email</span>
                        <span class="value"><a href="mailto:${user_email}" style="color: #22d3ee; text-decoration: none;">${user_email}</a></span>
                    </div>
                    ${user_phone ? `
                    <div class="field">
                        <span class="label">Phone</span>
                        <span class="value">${user_phone}</span>
                    </div>` : ''}
                    <div class="field">
                        <span class="label">Subject</span>
                        <span class="value">${user_subject}</span>
                    </div>
                    <div class="field">
                        <span class="label">Message</span>
                        <span class="value" style="white-space: pre-wrap;">${message}</span>
                    </div>
                </div>
                <div class="footer">
                    <p>Sent via Generic Portfolio Contact Form • ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // 4. Send Email
        await transporter.sendMail({
            from: process.env.SMTP_USER || process.env.EMAIL_USER,
            to: process.env.SMTP_USER || process.env.EMAIL_USER, // Send to yourself
            replyTo: user_email, // Allow directly replying to the sender
            subject: `✨ New Inquiry: ${user_subject} (${user_name})`,
            html: htmlTemplate,
        });

        return Response.json({ success: true, message: "Query sent successfully!" });

    } catch (error) {
        console.error("Contact API Server Error:", error);
        return Response.json({ error: "Failed to process request.", details: error.message }, { status: 500 });
    }
}
