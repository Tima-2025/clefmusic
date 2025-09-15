'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/app/lib/auth';


const signinSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please enter your complete address'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SigninForm = z.infer<typeof signinSchema>;
type SignupForm = z.infer<typeof signupSchema>;

interface User extends SignupForm {
  id: string;
  loginCount: number;
  status: string;
  joinDate: string;
  lastLogin: string;
}

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const signinForm = useForm<SigninForm>({
    resolver: zodResolver(signinSchema)
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema)
  });

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      if (AuthService.isAdmin(currentUser.email)) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [router]);

  const onSignIn = async (data: SigninForm) => {
    setLoading(true);
    setError('');
    
    try {
      // Check if it's admin login
      if (AuthService.isAdmin(data.email)) {
        if (AuthService.validateAdminCredentials(data.email, data.password)) {
          const adminUser = {
            id: 'admin',
            firstName: 'Admin',
            lastName: 'User',
            email: data.email,
            role: 'admin',
            loginTime: new Date().toISOString()
          };

          AuthService.setCurrentUser(adminUser);
          
          // Send admin login notification
          await AuthService.sendAdminLoginNotification(data.email);
          
          alert('Admin login successful! Notification sent to admin email.');
          router.push('/admin');
        } else {
          setError('Invalid admin credentials');
        }
        return;
      }

      // Customer login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: User) => u.email === data.email && u.password === data.password);
      
      if (user) {
        // Update user's last login and status
        user.lastLogin = new Date().toISOString();
        user.status = 'Active';
        user.loginCount = (user.loginCount || 0) + 1;
        user.role = 'customer';
        
        // Update users array
        const updatedUsers = users.map((u: User) => u.id === user.id ? user : u);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Store current user session
        AuthService.setCurrentUser(user);
        
        alert(`Welcome back, ${user.firstName}! You are now logged in.`);
        router.push('/');
      } else {
        setError('Invalid email or password. Please check your credentials or sign up for a new account.');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onSignUp = async (data: SignupForm) => {
    setLoading(true);
    setError('');
    
    try {
      // Prevent signup with admin email
      if (AuthService.isAdmin(data.email)) {
        setError('This email is reserved for admin use. Please use a different email.');
        setLoading(false);
        return;
      }

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: User) => u.email === data.email);
      
      if (existingUser) {
        setError('An account with this email already exists. Please sign in instead.');
        setLoading(false);
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
        password: data.password,
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        status: 'Active',
        loginCount: 1,
        role: 'customer'
      };
      
      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      AuthService.setCurrentUser(newUser);
      
      alert(`Welcome to CLEF Music, ${newUser.firstName}! Your account has been created successfully.`);
      router.push('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#200A24]">
      <div className="max-w-md w-full bg-cream rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brown-primary">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h1>
          <p className="text-brown-primary/80 mt-2">
            {isSignUp ? 'Join CLEF Music today' : 'Welcome back to CLEF Music'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {!isSignUp ? (
          <form onSubmit={signinForm.handleSubmit(onSignIn)} className="space-y-6">
            <div>
              <label className="block text-brown-primary font-medium mb-2">Email</label>
              <input
                {...signinForm.register('email')}
                className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                type="email"
                placeholder="your@email.com"
                disabled={loading}
              />
              {signinForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{signinForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-brown-primary font-medium mb-2">Password</label>
              <input
                {...signinForm.register('password')}
                className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                type="password"
                placeholder="Your password"
                disabled={loading}
              />
              {signinForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{signinForm.formState.errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brown-primary text-cream py-3 rounded-md hover:bg-brown-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={signupForm.handleSubmit(onSignUp)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-brown-primary font-medium mb-2">First Name</label>
                <input
                  {...signupForm.register('firstName')}
                  className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                  type="text"
                  placeholder="John"
                  disabled={loading}
                />
                {signupForm.formState.errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-brown-primary font-medium mb-2">Last Name</label>
                <input
                  {...signupForm.register('lastName')}
                  className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                  type="text"
                  placeholder="Doe"
                  disabled={loading}
                />
                {signupForm.formState.errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-brown-primary font-medium mb-2">Email</label>
              <input
                {...signupForm.register('email')}
                className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                type="email"
                placeholder="your@email.com"
                disabled={loading}
              />
              {signupForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-brown-primary font-medium mb-2">Phone</label>
              <input
                {...signupForm.register('phone')}
                className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                type="tel"
                placeholder="+1 (555) 123-4567"
                disabled={loading}
              />
              {signupForm.formState.errors.phone && (
                <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-brown-primary font-medium mb-2">Address</label>
              <input
                {...signupForm.register('address')}
                className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                type="text"
                placeholder="123 Main Street, Apt 4B"
                disabled={loading}
              />
              {signupForm.formState.errors.address && (
                <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-brown-primary font-medium mb-2">City</label>
                <input
                  {...signupForm.register('city')}
                  className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                  type="text"
                  placeholder="New York"
                  disabled={loading}
                />
                {signupForm.formState.errors.city && (
                  <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-brown-primary font-medium mb-2">Country</label>
                <input
                  {...signupForm.register('country')}
                  className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                  type="text"
                  placeholder="United States"
                  disabled={loading}
                />
                {signupForm.formState.errors.country && (
                  <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.country.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-brown-primary font-medium mb-2">Password</label>
              <input
                {...signupForm.register('password')}
                className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                type="password"
                placeholder="Create a password"
                disabled={loading}
              />
              {signupForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-brown-primary font-medium mb-2">Confirm Password</label>
              <input
                {...signupForm.register('confirmPassword')}
                className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                type="password"
                placeholder="Confirm your password"
                disabled={loading}
              />
              {signupForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brown-primary text-cream py-3 rounded-md hover:bg-brown-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            className="text-brown-primary hover:text-brown-dark transition-colors font-medium"
            disabled={loading}
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        {!isSignUp && (
          <div className="mt-4 p-4 bg-brown-primary/10 rounded-md">
            <p className="text-sm text-brown-primary/80 text-center">
              <strong>Admin credentials:</strong><br />
              Email: admin@clefmusic.com<br />
              Password: admin123
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
