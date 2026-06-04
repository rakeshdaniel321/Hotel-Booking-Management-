import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
  async sendResendEmail(taskData) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Urban Spoon <onboarding@resend.dev>', 
        to: [taskData.email],
        subject: '🔒 Secure Verification Code',
        html: `
          <div style="font-family: sans-serif; padding: 20px; max-width: 500px; border: 1px solid #eee;">
            <h2>OTP Verification</h2>
            <p>Your 4-digit secure authentication code is:</p>
            <h1 style="color: #007bff; letter-spacing: 5px;">${taskData.otp}</h1>
            <p style="font-size: 12px; color: #666;">Expires in 5 minutes.</p>
          </div>
        `
      });

      if (error) {
        console.error('[Resend SDK Error]:', error.message);
        return { success: false, error };
      }
      return { success: true, data };
    } catch (err) {
      console.error('[Resend System Crash]:', err.message);
      return { success: false, error: err };
    }
  }
  

}

export default new EmailService();