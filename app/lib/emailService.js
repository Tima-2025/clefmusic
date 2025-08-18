import emailjs from '@emailjs/browser';

export class EmailService {
  static async sendAdminLoginAlert(loginDetails) {
    try {
      const templateParams = {
        to_email: 'your-real-admin@email.com', // Replace with your actual email
        login_email: loginDetails.email,
        login_time: new Date(loginDetails.timestamp).toLocaleString(),
        ip_address: loginDetails.ip || 'Unknown',
        user_agent: loginDetails.userAgent || 'Unknown',
        message: `Admin login detected for CLEF Music website at ${new Date().toLocaleString()}`
      };

      const result = await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      return result;
    } catch (error) {
      console.error('Failed to send email notification:', error);
      throw error;
    }
  }
}
