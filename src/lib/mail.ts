import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to your preferred provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendWelcomeEmail = async (to: string, name: string) => {
    try {
        // If credentials are not set, log the email instead (for dev)
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('=================================================');
            console.log(`[MOCK EMAIL] To: ${to}`);
            console.log(`Subject: Welcome to PicklePerfect!`);
            console.log(`Hi ${name}, Welcome to the family!`);
            console.log('=================================================');
            return;
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Welcome to PicklePerfect! 🥒',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2e7d32;">Welcome to PicklePerfect!</h1>
          <p>Hi ${name},</p>
          <p>Thank you for joining our community of pickle lovers! We are excited to serve you the most authentic, homemade pickles.</p>
          <p>Start exploring our collection and bring the taste of tradition to your dining table.</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/shop" style="display: inline-block; background-color: #2e7d32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Shop Now</a>
          <p style="margin-top: 30px; color: #666; font-size: 12px;">© ${new Date().getFullYear()} PicklePerfect. All rights reserved.</p>
        </div>
      `,
        });
        console.log(`Welcome email sent to ${to}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};
