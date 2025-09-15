'use client';
import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Users, Package, ShoppingCart, TrendingUp, Eye, Upload, X, Mail, FileText } from 'lucide-react';

// Mock data with enhanced product information
const mockProducts = [
  { 
    id: 1, 
    name: 'Electric Guitar', 
    category: 'Musical Instruments', 
    price: 899, 
    stock: 15, 
    status: 'In Stock',
    image: '/images/electric-guitar.jpg',
    description: 'Professional electric guitar with premium pickups'
  },
  { 
    id: 2, 
    name: 'Digital Piano', 
    category: 'Musical Instruments', 
    price: 1299, 
    stock: 8, 
    status: 'In Stock',
    image: '/images/digital-piano.jpg',
    description: '88-key weighted digital piano'
  },
  { 
    id: 3, 
    name: 'PA Speaker', 
    category: 'Sound Systems', 
    price: 599, 
    stock: 12, 
    status: 'In Stock',
    image: '/images/pa-speaker.jpg',
    description: 'Professional PA speaker system'
  },
  { 
    id: 4, 
    name: 'LED Par Lights', 
    category: 'Lighting Systems', 
    price: 199, 
    stock: 0, 
    status: 'Out of Stock',
    image: '/images/led-lights.jpg',
    description: 'RGB LED par lights for stage lighting'
  },
  { 
    id: 5, 
    name: 'Acoustic Guitar', 
    category: 'Musical Instruments', 
    price: 450, 
    stock: 5, 
    status: 'Coming Soon',
    image: '/images/acoustic-guitar.jpg',
    description: 'Premium acoustic guitar with solid top'
  },
];

const initialCategories = ['Musical Instruments', 'Sound Systems', 'Lighting Systems'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState('');
  const [users, setUsers] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [brochureRequests, setBrochureRequests] = useState([]);
  
  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'In Stock',
    image: '',
    description: ''
  });

  // Load data from localStorage
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
    setServiceRequests(JSON.parse(localStorage.getItem('serviceRequests') || '[]'));
    setContactMessages(JSON.parse(localStorage.getItem('contactMessages') || '[]'));
    setBrochureRequests(JSON.parse(localStorage.getItem('brochureRequests') || '[]'));
  }, [activeTab]); // Reload when switching tabs

  const stats = [
    { title: 'Total Products', value: mockProducts.length.toString(), icon: Package, color: 'bg-blue-500' },
    { title: 'Total Customers', value: users.length.toString(), icon: Users, color: 'bg-green-500' },
    { title: 'Service Requests', value: serviceRequests.length.toString(), icon: ShoppingCart, color: 'bg-purple-500' },
    { title: 'Brochure Requests', value: brochureRequests.length.toString(), icon: FileText, color: 'bg-yellow-500' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Settings },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'services', label: 'Service Requests', icon: ShoppingCart },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'brochures', label: 'Brochure Requests', icon: FileText },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductForm({ ...productForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log('Adding product:', productForm);
    alert('Product added successfully!');
    setShowAddProduct(false);
    setProductForm({ name: '', category: '', price: '', stock: '', status: 'In Stock', image: '', description: '' });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      image: product.image,
      description: product.description
    });
    setShowEditProduct(true);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    console.log('Updating product:', editingProduct.id, productForm);
    alert('Product updated successfully!');
    setShowEditProduct(false);
    setEditingProduct(null);
    setProductForm({ name: '', category: '', price: '', stock: '', status: 'In Stock', image: '', description: '' });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowAddCategory(false);
      alert('Category added successfully!');
    } else {
      alert('Category already exists or is empty!');
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    const productsInCategory = mockProducts.filter(p => p.category === categoryToDelete);
    if (productsInCategory.length > 0) {
      alert(`Cannot delete category "${categoryToDelete}" as it has ${productsInCategory.length} products. Please reassign or delete the products first.`);
    } else {
      setCategories(categories.filter(cat => cat !== categoryToDelete));
      alert('Category deleted successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Coming Soon':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActiveUsersCount = () => {
    return users.filter(u => u.status === 'Active').length;
  };

  const getNewUsersThisWeek = () => {
    return users.filter(u => {
      const joinDate = new Date(u.joinDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return joinDate >= weekAgo;
    }).length;
  };

  const handleUpdateRequestStatus = (requestId, currentRequests, setRequests, storageKey, newStatus = 'Completed') => {
    const updatedRequests = currentRequests.map(r => 
      r.id === requestId ? { ...r, status: newStatus } : r
    );
    setRequests(updatedRequests);
    localStorage.setItem(storageKey, JSON.stringify(updatedRequests));
    alert(`Status updated to ${newStatus}!`);
  };

  return (
    <div className="min-h-screen bg-[#200A24]">
      {/* Admin Header */}
      <div className="bg-brown-primary text-black shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-serif font-bold text-black">CLEF Music Admin</h1>
            <div className="flex items-center space-x-4">
              <span className="text-cream/80">Welcome, Administrator</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('currentUser');
                  window.location.href = '/signin';
                }}
                className="bg-brown-dark px-4 py-2 rounded-md hover:bg-brown-light transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-brown-primary/20">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-brown-primary text-brown-primary'
                        : 'border-transparent text-brown-primary/60 hover:text-brown-primary hover:border-brown-primary/30'
                    }`}
                  >
                    <Icon size={20} className="mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.title} className="bg-cream rounded-lg shadow-md p-6">
                    <div className="flex items-center">
                      <div className={`${stat.color} rounded-lg p-3`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-brown-primary/60">{stat.title}</p>
                        <p className="text-2xl font-semibold text-brown-primary">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Customer Overview */}
            <div className="bg-cream rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-brown-primary mb-4">Customer Overview</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div>
                    <p className="text-green-800 font-medium">Active Customers</p>
                    <p className="text-2xl font-bold text-green-600">{getActiveUsersCount()}</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div>
                    <p className="text-blue-800 font-medium">New This Week</p>
                    <p className="text-2xl font-bold text-blue-600">{getNewUsersThisWeek()}</p>
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <div>
                    <p className="text-purple-800 font-medium">Service Requests</p>
                    <p className="text-2xl font-bold text-purple-600">{serviceRequests.length}</p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <div>
                    <p className="text-yellow-800 font-medium">Contact Messages</p>
                    <p className="text-2xl font-bold text-yellow-600">{contactMessages.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Status Overview */}
            <div className="bg-cream rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-brown-primary mb-4">Product Status Overview</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-green-800 font-medium">In Stock</p>
                      <p className="text-2xl font-bold text-green-600">
                        {mockProducts.filter(p => p.status === 'In Stock').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-red-800 font-medium">Out of Stock</p>
                      <p className="text-2xl font-bold text-red-600">
                        {mockProducts.filter(p => p.status === 'Out of Stock').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-blue-800 font-medium">Coming Soon</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {mockProducts.filter(p => p.status === 'Coming Soon').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-cream rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-brown-primary mb-4">Recent Service Requests</h3>
                <div className="space-y-3">
                  {serviceRequests.slice(0, 5).map((request) => (
                    <div key={request.id} className="flex justify-between items-center py-2 border-b border-brown-primary/10">
                      <div>
                        <p className="font-medium text-brown-primary">{request.customerName}</p>
                        <p className="text-sm text-brown-primary/60">{new Date(request.requestDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-cream rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-brown-primary mb-4">Recent Brochure Requests</h3>
                <div className="space-y-3">
                  {brochureRequests.slice(0, 5).map((request) => (
                    <div key={request.id} className="flex justify-between items-center py-2 border-b border-brown-primary/10">
                      <div>
                        <p className="font-medium text-brown-primary">{request.productName}</p>
                        <p className="text-sm text-brown-primary/60">{request.customerEmail}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-brown-primary">Products Management</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-brown-primary text-black px-4 py-2 rounded-md hover:bg-brown-dark transition-colors flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Product
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 text-brown-primary/60" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                placeholder="Search products..."
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts
                .filter(product => 
                  product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  product.category.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => (
                <div key={product.id} className="bg-cream rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-video bg-brown-primary/10 relative">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brown-primary/20 to-brown-primary/40 flex items-center justify-center">
                        <span className="text-brown-primary font-semibold">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-brown-primary mb-2">{product.name}</h3>
                    <p className="text-sm text-brown-primary/60 mb-2">{product.category}</p>
                    <p className="text-sm text-brown-primary/80 mb-3">{product.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xl font-bold text-brown-primary">${product.price}</span>
                      <span className="text-sm text-brown-primary/60">Stock: {product.stock}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 bg-brown-primary text-black py-2 px-3 rounded-md hover:bg-brown-dark transition-colors text-sm flex items-center justify-center"
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </button>
                      <button className="px-3 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-brown-primary">Categories Management</h2>
              <button
                onClick={() => setShowAddCategory(true)}
                className="bg-brown-primary text-black px-4 py-2 rounded-md hover:bg-brown-dark transition-colors flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add Category
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => {
                const productCount = mockProducts.filter(p => p.category === category).length;
                return (
                  <div key={category} className="bg-cream rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-brown-primary">{category}</h3>
                        <p className="text-brown-primary/60">{productCount} products</p>
                      </div>
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-brown-primary">Customer Management</h2>
              <div className="text-sm text-brown-primary/60">
                Total Registered: {users.length}
              </div>
            </div>
            
            <div className="bg-cream rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-brown-primary/10">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Location</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Join Date</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Login Count</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-brown-primary/60">
                          No customers registered yet.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="border-b border-brown-primary/10">
                          <td className="py-3 px-4 text-brown-primary font-medium">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="py-3 px-4 text-brown-primary">{user.email}</td>
                          <td className="py-3 px-4 text-brown-primary">{user.phone}</td>
                          <td className="py-3 px-4 text-brown-primary">{user.city}, {user.country}</td>
                          <td className="py-3 px-4 text-brown-primary">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-brown-primary">{user.loginCount || 0}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => alert(`User Details:\n${JSON.stringify(user, null, 2)}`)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Eye size={18} />
                              </button>
                              <button className="text-green-600 hover:text-green-800">
                                <Edit size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Service Requests Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-brown-primary">Service Requests</h2>
            
            <div className="bg-cream rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-brown-primary/10">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Type/Serial</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Address</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceRequests.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-brown-primary/60">
                          No service requests yet.
                        </td>
                      </tr>
                    ) : (
                      serviceRequests.map((request) => (
                        <tr key={request.id} className="border-b border-brown-primary/10">
                          <td className="py-3 px-4 text-brown-primary font-medium">{request.customerName}</td>
                          <td className="py-3 px-4 text-brown-primary">{request.customerEmail}</td>
                          <td className="py-3 px-4 text-brown-primary">{request.customerPhone}</td>
                          <td className="py-3 px-4 text-brown-primary">
                            <div className="text-sm">
                              <div>Type: {request.typeNumber}</div>
                              <div>Serial: {request.serialNumber}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-brown-primary text-sm">{request.address}</td>
                          <td className="py-3 px-4 text-brown-primary">
                            {new Date(request.requestDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => alert(`Service Request Details:\n\nCustomer: ${request.customerName}\nMessage: ${request.message}\n\nFull Details:\n${JSON.stringify(request, null, 2)}`)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                onClick={() => handleUpdateRequestStatus(request.id, serviceRequests, setServiceRequests, 'serviceRequests')}
                                className="text-green-600 hover:text-green-800"
                              >
                                <Edit size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-brown-primary">Contact Messages</h2>
            
            <div className="bg-cream rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-brown-primary/10">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Product Type</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Message Preview</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactMessages.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-brown-primary/60">
                          No contact messages yet.
                        </td>
                      </tr>
                    ) : (
                      contactMessages.map((message) => (
                        <tr key={message.id} className="border-b border-brown-primary/10">
                          <td className="py-3 px-4 text-brown-primary font-medium">{message.customerName}</td>
                          <td className="py-3 px-4 text-brown-primary">{message.customerEmail}</td>
                          <td className="py-3 px-4 text-brown-primary">{message.orderType}</td>
                          <td className="py-3 px-4 text-brown-primary text-sm">
                            {message.message?.substring(0, 50)}...
                          </td>
                          <td className="py-3 px-4 text-brown-primary">
                            {new Date(message.sentDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                              {message.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => alert(`Contact Message:\n\nFrom: ${message.customerName}\nEmail: ${message.customerEmail}\nProduct: ${message.orderType}\n\nMessage:\n${message.message}`)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                onClick={() => handleUpdateRequestStatus(message.id, contactMessages, setContactMessages, 'contactMessages', 'Replied')}
                                className="text-green-600 hover:text-green-800"
                              >
                                <Edit size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Brochure Requests Tab */}
        {activeTab === 'brochures' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-brown-primary">Brochure Requests</h2>
            
            <div className="bg-cream rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-brown-primary/10">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Customer Phone</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Customer Email</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Request Date</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-brown-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brochureRequests.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-brown-primary/60">
                          No brochure requests yet.
                        </td>
                      </tr>
                    ) : (
                      brochureRequests.map((request) => (
                        <tr key={request.id} className="border-b border-brown-primary/10">
                          <td className="py-3 px-4 text-brown-primary font-medium">{request.productName}</td>
                          <td className="py-3 px-4 text-brown-primary">{request.productPrice}</td>
                          <td className="py-3 px-4 text-brown-primary">{request.customerPhone}</td>
                          <td className="py-3 px-4 text-brown-primary">{request.customerEmail}</td>
                          <td className="py-3 px-4 text-brown-primary">
                            {new Date(request.requestDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => alert(`Brochure Request Details:\n\nProduct: ${request.productName} (${request.productPrice})\nCustomer: ${request.customerEmail}\nPhone: ${request.customerPhone}\nRequested: ${new Date(request.requestDate).toLocaleString()}`)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Eye size={18} />
                              </button>
                              <button 
                                onClick={() => handleUpdateRequestStatus(request.id, brochureRequests, setBrochureRequests, 'brochureRequests', 'Sent')}
                                className="text-green-600 hover:text-green-800"
                                title="Mark as Sent"
                              >
                                <Edit size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {(showAddProduct || showEditProduct) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#200A24] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-brown-primary">
                {showAddProduct ? 'Add New Product' : 'Edit Product'}
              </h3>
              <button
                onClick={() => {
                  setShowAddProduct(false);
                  setShowEditProduct(false);
                  setEditingProduct(null);
                  setProductForm({ name: '', category: '', price: '', stock: '', status: 'In Stock', image: '', description: '' });
                }}
                className="text-brown-primary/60 hover:text-brown-primary"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={showAddProduct ? handleAddProduct : handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block text-brown-primary font-medium mb-2">Product Image</label>
                <div className="border-2 border-dashed border-brown-primary/30 rounded-lg p-4">
                  {productForm.image ? (
                    <div className="relative">
                      <img 
                        src={productForm.image} 
                        alt="Product preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setProductForm({ ...productForm, image: '' })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-brown-primary/60" />
                      <div className="mt-2">
                        <label className="cursor-pointer bg-brown-primary text-black px-4 py-2 rounded-md hover:bg-brown-dark transition-colors">
                          Upload Image
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                      <p className="text-sm text-brown-primary/60 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              <input
                type="text"
                placeholder="Product Name"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                required
              />
              
              <select 
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <input
                type="number"
                placeholder="Price"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                required
                min="0"
                step="0.01"
              />
              
              <input
                type="number"
                placeholder="Stock Quantity"
                value={productForm.stock}
                onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                required
                min="0"
              />

              <select
                value={productForm.status}
                onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                required
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
              
              <textarea
                placeholder="Product Description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                required
              />
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProduct(false);
                    setShowEditProduct(false);
                    setEditingProduct(null);
                    setProductForm({ name: '', category: '', price: '', stock: '', status: 'In Stock', image: '', description: '' });
                  }}
                  className="flex-1 px-4 py-2 border border-brown-primary text-brown-primary rounded-md hover:bg-brown-primary/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brown-primary text-black rounded-md hover:bg-brown-dark transition-colors"
                >
                  {showAddProduct ? 'Add Product' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#200A24] rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-brown-primary">Add New Category</h3>
              <button
                onClick={() => {
                  setShowAddCategory(false);
                  setNewCategory('');
                }}
                className="text-brown-primary/60 hover:text-brown-primary"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                required
              />
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategory('');
                  }}
                  className="flex-1 px-4 py-2 border border-brown-primary text-brown-primary rounded-md hover:bg-brown-primary/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brown-primary text-black rounded-md hover:bg-brown-dark transition-colors"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
