'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please enter your complete address'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema)
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      setCurrentUser(userData);
      reset({
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        country: userData.country,
      });
    } else {
      router.push('/signin');
    }
  }, [router, reset]);

  const onUpdateProfile = async (data: ProfileForm) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...currentUser, ...data };
      
      // Update in localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === currentUser.id ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      setCurrentUser(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#200A24] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto mb-4"></div>
          <p className="text-brown-primary">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#200A24] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-brown-primary text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-cream text-brown-primary rounded-full flex items-center justify-center text-xl font-bold">
                  {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{currentUser.firstName} {currentUser.lastName}</h1>
                  <p className="text-cream/80">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-brown-dark px-4 py-2 rounded-md hover:bg-brown-light transition-colors flex items-center"
              >
                {isEditing ? <X size={20} className="mr-2" /> : <Edit size={20} className="mr-2" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {!isEditing ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="text-brown-primary" size={20} />
                    <div>
                      <p className="text-sm text-brown-primary/60">Name</p>
                      <p className="font-medium text-brown-primary">{currentUser.firstName} {currentUser.lastName}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="text-brown-primary" size={20} />
                    <div>
                      <p className="text-sm text-brown-primary/60">Email</p>
                      <p className="font-medium text-brown-primary">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="text-brown-primary" size={20} />
                    <div>
                      <p className="text-sm text-brown-primary/60">Phone</p>
                      <p className="font-medium text-brown-primary">{currentUser.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-brown-primary mt-1" size={20} />
                    <div>
                      <p className="text-sm text-brown-primary/60">Address</p>
                      <p className="font-medium text-brown-primary">{currentUser.address}</p>
                      <p className="font-medium text-brown-primary">{currentUser.city}, {currentUser.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="text-brown-primary" size={20} />
                    <div>
                      <p className="text-sm text-brown-primary/60">Member Since</p>
                      <p className="font-medium text-brown-primary">
                        {new Date(currentUser.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brown-primary font-medium mb-2">First Name</label>
                    <input
                      {...register('firstName')}
                      className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                      type="text"
                      disabled={loading}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-brown-primary font-medium mb-2">Last Name</label>
                    <input
                      {...register('lastName')}
                      className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                      type="text"
                      disabled={loading}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-brown-primary font-medium mb-2">Phone</label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                    type="tel"
                    disabled={loading}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-brown-primary font-medium mb-2">Address</label>
                  <input
                    {...register('address')}
                    className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                    type="text"
                    disabled={loading}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brown-primary font-medium mb-2">City</label>
                    <input
                      {...register('city')}
                      className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                      type="text"
                      disabled={loading}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-brown-primary font-medium mb-2">Country</label>
                    <input
                      {...register('country')}
                      className="w-full px-4 py-3 border border-brown-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-primary"
                      type="text"
                      disabled={loading}
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-brown-primary text-white px-6 py-3 rounded-md hover:bg-brown-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Save size={20} className="mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border border-brown-primary text-brown-primary px-6 py-3 rounded-md hover:bg-brown-primary hover:text-white transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Account Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-cream rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-brown-primary mb-2">Account Status</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {currentUser.status}
            </span>
          </div>

          <div className="bg-cream rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-brown-primary mb-2">Total Logins</h3>
            <p className="text-2xl font-bold text-brown-primary">{currentUser.loginCount || 0}</p>
          </div>

          <div className="bg-cream rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-brown-primary mb-2">Last Login</h3>
            <p className="text-sm text-brown-primary/80">
              {new Date(currentUser.lastLogin).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
