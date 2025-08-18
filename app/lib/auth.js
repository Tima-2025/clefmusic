// Authentication service
export class AuthService {
  static ADMIN_CREDENTIALS = {
    email: 'admin@clefmusic.com',
    password: 'admin123'
  };

  static isAdmin(email) {
    return email === this.ADMIN_CREDENTIALS.email;
  }

  static validateAdminCredentials(email, password) {
    return email === this.ADMIN_CREDENTIALS.email && password === this.ADMIN_CREDENTIALS.password;
  }

  static async sendAdminLoginNotification(email) {
    // Email notification service (you can integrate with your email provider)
    const loginData = {
      email: email,
      timestamp: new Date().toISOString(),
      ip: 'User IP', // You can get actual IP in production
      userAgent: navigator.userAgent
    };

    // For now, we'll log it (replace with actual email service)
    console.log('Admin Login Notification:', loginData);
    
    // You can integrate with services like EmailJS, SendGrid, or your backend
    // Example with EmailJS:
    /*
    try {
      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: 'your-actual-admin@email.com', // Your real email
        login_email: email,
        login_time: new Date().toLocaleString(),
        ip_address: loginData.ip,
        user_agent: loginData.userAgent
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
    */
    
    return true;
  }

  static getCurrentUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  static logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  static setCurrentUser(user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
}
