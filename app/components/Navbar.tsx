'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search, User, LogOut, Settings, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../lib/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  // Mock product data for search
  const products = [
    { id: 1, name: 'Electric Guitar', category: 'Musical Instruments', price: '$899' },
    { id: 2, name: 'Digital Piano', category: 'Musical Instruments', price: '$1,299' },
    { id: 3, name: 'Drum Set', category: 'Musical Instruments', price: '$1,599' },
    { id: 4, name: 'PA Speaker', category: 'Sound Systems', price: '$599' },
    { id: 5, name: 'Audio Mixer', category: 'Sound Systems', price: '$399' },
    { id: 6, name: 'Microphone Set', category: 'Sound Systems', price: '$299' },
    { id: 7, name: 'LED Par Lights', category: 'Lighting Systems', price: '$199' },
    { id: 8, name: 'Moving Head Light', category: 'Lighting Systems', price: '$799' },
    { id: 9, name: 'Light Controller', category: 'Lighting Systems', price: '$349' },
  ];

  // Check for logged in user
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      const user = AuthService.getCurrentUser();
      setCurrentUser(user);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FIXED: Define handleSearchClick function
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus on search input when opening
      setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  const handleProductClick = (product: any) => {
    alert(`You clicked on: ${product.name} - ${product.price}`);
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const handleProductsClick = () => {
    setIsOpen(false);
    const productsSection = document.querySelector('.product-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      if (window.location.pathname !== '/') {
        window.location.href = '/#products';
      }
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
    setShowProfileMenu(false);
    router.push('/');
    alert('You have been logged out successfully.');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const isAdmin = currentUser && AuthService.isAdmin(currentUser.email);

  return (
    <nav className="sticky top-0 z-50 bg-brown-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-cream font-serif text-2xl font-bold hover:text-black transition-colors">
            CLEF Music
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-cream hover:text-black transition-colors font-medium">
              About
            </Link>
            
            <button
              onClick={handleSearchClick}
              className="text-cream hover:text-black transition-colors p-2 rounded-md hover:bg-white"
              title="Search Products"
            >
              <Search size={20} />
            </button>





            

            <button
              onClick={handleProductsClick}
              className="text-cream hover:text-black transition-colors font-medium"
            >
              Products
            </button>

            <Link href="/services" className="text-cream hover:text-black transition-colors font-medium">
              Services
            </Link>
            <Link href="/contact" className="text-cream hover:text-black transition-colors font-medium">
              Contact
            </Link>

            {/* Admin Panel Link (only visible to admin) */}
            {isAdmin && (
              <Link 
                href="/admin" 
                className="text-cream hover:text-black transition-colors font-medium flex items-center"
                title="Admin Panel"
              >
                <Shield size={18} className="mr-1" />
                Admin
              </Link>
            )}
          </div>

          {/* User Profile or Login Button */}
          {currentUser ? (
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  isAdmin 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-brown-dark hover:bg-brown-light text-cream'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isAdmin 
                    ? 'bg-white text-red-600' 
                    : 'bg-cream text-brown-primary'
                }`}>
                  {isAdmin ? <Shield size={16} /> : getInitials(currentUser.firstName, currentUser.lastName)}
                </div>
                <span className="font-medium">
                  {isAdmin ? 'Admin' : currentUser.firstName}
                </span>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {isAdmin ? 'Administrator' : `${currentUser.firstName} ${currentUser.lastName}`}
                    </p>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                    {isAdmin && (
                      <p className="text-xs text-red-600 font-medium mt-1">Admin Access</p>
                    )}
                  </div>
                  
                  {!isAdmin && (
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        router.push('/profile');
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} className="mr-2" />
                      Profile Settings
                    </button>
                  )}
                  
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        router.push('/admin');
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Shield size={16} className="mr-2" />
                      Admin Panel
                    </button>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/signin" 
              className="hidden md:block bg-brown-dark text-cream px-4 py-2 rounded-md hover:bg-brown-light transition-colors font-medium"
            >
              Log In
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cream hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-brown-dark">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/about" className="block text-cream hover:text-white px-3 py-2 transition-colors">
                About
              </Link>
              
              <button
                onClick={handleSearchClick}
                className="flex items-center text-cream hover:text-white px-3 py-2 transition-colors w-full text-left"
              >
                <Search size={20} className="mr-2" />
                Search Products
              </button>

              <button
                onClick={handleProductsClick}
                className="block text-cream hover:text-white px-3 py-2 transition-colors w-full text-left"
              >
                Products
              </button>

              <Link href="/services" className="block text-cream hover:text-white px-3 py-2 transition-colors">
                Services
              </Link>
              <Link href="/contact" className="block text-cream hover:text-white px-3 py-2 transition-colors">
                Contact
              </Link>

              {isAdmin && (
                <Link href="/admin" className="flex items-center text-cream hover:text-white px-3 py-2 transition-colors">
                  <Shield size={18} className="mr-2" />
                  Admin Panel
                </Link>
              )}
              
              {currentUser ? (
                <>
                  <div className="px-3 py-2 border-t border-brown-light">
                    <p className="text-cream font-medium">
                      {isAdmin ? 'Administrator' : `${currentUser.firstName} ${currentUser.lastName}`}
                    </p>
                    <p className="text-cream/70 text-sm">{currentUser.email}</p>
                    {isAdmin && <p className="text-red-300 text-xs font-medium">Admin Access</p>}
                  </div>
                  {!isAdmin && (
                    <Link href="/profile" className="block text-cream hover:text-white px-3 py-2 transition-colors">
                      Profile Settings
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block text-cream hover:text-white px-3 py-2 transition-colors w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/signin" className="block text-cream hover:text-white px-3 py-2 transition-colors">
                  Log In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-brown-primary/20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative mb-4">
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-black text-black"
                placeholder="Search for musical instruments, sound systems, lighting..."
              />
              <Search className="absolute right-3 top-3 text-brown-primary/60" size={20} />
            </div>

            {searchTerm && (
              <div className="max-h-96 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-brown-primary/60 mb-3">
                      Found {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
                    </p>
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center justify-between p-3 hover:bg-white rounded-md cursor-pointer transition-colors border-l-4 border-brown-primary/20 hover:border-black"
                      >
                        <div>
                          <h4 className="font-medium text-black">{product.name}</h4>
                          <p className="text-sm text-brown-primary/60">{product.category}</p>
                        </div>
                        <span className="font-semibold text-black">{product.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-brown-primary/60">No products found for "{searchTerm}"</p>
                    <p className="text-sm text-brown-primary/50 mt-1">
                      Try searching for guitars, speakers, microphones, lighting, etc.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!searchTerm && (
              <div>
                <h4 className="font-medium text-brown-primary mb-3">Popular Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {['Electric Guitar', 'PA Speaker', 'LED Lights', 'Audio Mixer', 'Drum Set'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="px-3 py-1 bg-paige text-brown-primary rounded-full text-sm hover:bg-brown-primary hover:text-cream transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-brown-primary/60 hover:text-brown-primary text-sm"
              >
                Close Search
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
