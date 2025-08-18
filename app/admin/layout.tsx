'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/app/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAccess = () => {
      const currentUser = AuthService.getCurrentUser();
      
      if (!currentUser) {
        // No user logged in - redirect to signin
        router.push('/signin?redirect=admin');
        return;
      }

      if (!AuthService.isAdmin(currentUser.email)) {
        // User is logged in but not admin - redirect to home with error
        alert('Access denied. You do not have permission to access the admin panel.');
        router.push('/');
        return;
      }

      // User is admin
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAdminAccess();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#200A24] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-primary mx-auto mb-4"></div>
          <p className="text-brown-primary">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
