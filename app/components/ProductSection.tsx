'use client';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const brochureRequestSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address')
});

type BrochureRequestForm = z.infer<typeof brochureRequestSchema>;

// Mock product data
const categories = [
  {
    name: 'Musical Instruments',
    products: [
      { id: 1, name: 'Electric Guitar', price: '$899', image: '/images/electric-guitar.jpg', stock: 'In Stock', description: 'Professional electric guitar with premium pickups and versatile sound options.' },
      { id: 2, name: 'Digital Piano', price: '$1,299', image: '/images/digital-piano.jpg', stock: 'In Stock', description: '88-key weighted digital piano with authentic piano feel and sound.' },
      { id: 3, name: 'Drum Set', price: '$1,599', image: '/images/drum-set.jpg', stock: 'Limited Stock', description: 'Complete 5-piece drum set with cymbals and hardware included.' },
      { id: 4, name: 'Acoustic Guitar', price: '$450', image: '/images/acoustic-guitar.jpg', stock: 'In Stock', description: 'Premium acoustic guitar with solid wood construction and rich tone.' },
      { id: 5, name: 'Bass Guitar', price: '$650', image: '/images/bass-guitar.jpg', stock: 'In Stock', description: '4-string electric bass guitar with powerful low-end response.' },
      { id: 6, name: 'Keyboard', price: '$750', image: '/images/keyboard.jpg', stock: 'Coming Soon', description: 'Professional 61-key keyboard with multiple voices and effects.' },
    ]
  },
  {
    name: 'Sound Systems',
    products: [
      { id: 7, name: 'PA Speaker', price: '$599', image: '/images/pa-speaker.jpg', stock: 'In Stock', description: 'Professional PA speaker with crystal clear sound reproduction.' },
      { id: 8, name: 'Audio Mixer', price: '$399', image: '/images/audio-mixer.jpg', stock: 'In Stock', description: '12-channel audio mixer with built-in effects and EQ controls.' },
      { id: 9, name: 'Microphone Set', price: '$299', image: '/images/microphone-set.jpg', stock: 'In Stock', description: 'Professional microphone set with wireless capability and accessories.' },
      { id: 10, name: 'Amplifier', price: '$850', image: '/images/amplifier.jpg', stock: 'In Stock', description: 'High-power amplifier for professional sound reinforcement.' },
      { id: 11, name: 'Monitor Speakers', price: '$450', image: '/images/monitor-speakers.jpg', stock: 'Limited Stock', description: 'Studio monitor speakers for accurate sound monitoring.' },
      { id: 12, name: 'Subwoofer', price: '$750', image: '/images/subwoofer.jpg', stock: 'Out of Stock', description: 'Powerful subwoofer for deep bass response in any venue.' },
    ]
  },
  {
    name: 'Lighting Systems',
    products: [
      { id: 13, name: 'LED Par Lights', price: '$199', image: '/images/led-par-lights.jpg', stock: 'In Stock', description: 'RGB LED par lights for colorful stage and event lighting.' },
      { id: 14, name: 'Moving Head Light', price: '$799', image: '/images/moving-head-light.jpg', stock: 'In Stock', description: 'Professional moving head light with gobo patterns and color mixing.' },
      { id: 15, name: 'Light Controller', price: '$349', image: '/images/light-controller.jpg', stock: 'Limited Stock', description: 'DMX light controller for professional lighting control.' },
      { id: 16, name: 'Stage Wash Lights', price: '$550', image: '/images/stage-wash.jpg', stock: 'In Stock', description: 'High-power LED wash lights for stage and architectural lighting.' },
      { id: 17, name: 'Laser Light', price: '$650', image: '/images/laser-light.jpg', stock: 'Coming Soon', description: 'Professional laser light system with multiple patterns and effects.' },
      { id: 18, name: 'Fog Machine', price: '$180', image: '/images/fog-machine.jpg', stock: 'In Stock', description: 'Professional fog machine for atmospheric lighting effects.' },
    ]
  }
];

export default function ProductSection() {
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BrochureRequestForm>({
    resolver: zodResolver(brochureRequestSchema)
  });

  useEffect(() => {
    gsap.utils.toArray('.product-category').forEach((section: any) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(section.querySelectorAll('.product-card'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.2 }
          );
        }
      });
    });
  }, []);

  const handleBrochureRequest = (product) => {
    setSelectedProduct(product);
    setShowBrochureModal(true);
  };

  const onSubmitBrochureRequest = (data: BrochureRequestForm) => {
    const brochureRequest = {
      id: Date.now().toString(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productPrice: selectedProduct.price,
      customerPhone: data.phone,
      customerEmail: data.email,
      requestDate: new Date().toISOString(),
      status: 'Pending'
    };

    // Save brochure request to localStorage for admin tracking
    const requests = JSON.parse(localStorage.getItem('brochureRequests') || '[]');
    requests.push(brochureRequest);
    localStorage.setItem('brochureRequests', JSON.stringify(requests));

    setSubmitted(true);
    reset();
    setTimeout(() => {
      setSubmitted(false);
      setShowBrochureModal(false);
      setSelectedProduct(null);
    }, 2000);
  };

  const getStatusColor = (stock: string) => {
    switch (stock) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Limited Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Coming Soon':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <section className="product-section py-16" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <div key={category.name} className="product-category mb-20">
              <h2 className="text-4xl font-serif font-bold text-black mb-12 text-center">
                {category.name}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product) => (
                  <div 
                    key={product.id} 
                    className="product-card bg-cream rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
                  >
                    <div className="aspect-video bg-brown-primary/10 relative overflow-hidden">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="w-full h-full bg-gradient-to-br from-brown-primary/20 to-brown-primary/40 flex items-center justify-center" style={{ display: product.image ? 'none' : 'flex' }}>
                        <span className="text-brown-primary font-semibold">Product Image</span>
                      </div>
                      
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.stock)}`}>
                          {product.stock}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-brown-primary mb-2 group-hover:text-brown-dark transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-brown-primary/70 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-brown-primary">{product.price}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <button 
                          className="w-full bg-brown-primary text-cream py-2 rounded-md hover:bg-brown-dark transition-colors font-medium"
                          onClick={() => handleBrochureRequest(product)}
                        >
                          Request Brochure
                        </button>
                       
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brochure Request Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-brown-primary">
                Request Brochure
              </h3>
              <button
                onClick={() => {
                  setShowBrochureModal(false);
                  setSelectedProduct(null);
                  reset();
                }}
                className="text-brown-primary/60 hover:text-brown-primary"
              >
                <X size={24} />
              </button>
            </div>

            {selectedProduct && (
              <div className="mb-4 p-3 bg-brown-primary/5 rounded-md">
                <p className="text-white font-medium">{selectedProduct.name}</p>
                <p className="text-white text-sm">{selectedProduct.price}</p>
              </div>
            )}

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-4xl mb-4">✓</div>
                <h4 className="text-lg font-medium text-brown-primary mb-2">Request Submitted!</h4>
                <p className="text-brown-primary/70">We'll send you the brochure via email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmitBrochureRequest)} className="space-y-4">
                <div>
                  <label className="block text-brown-primary font-medium mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-brown-primary font-medium mb-2">Email Address</label>
                  <input
                    {...register('email')}
                    className="w-full px-4 py-3 border border-brown-primary/30 rounded-md focus:outline-none focus:border-brown-primary"
                    type="email"
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBrochureModal(false);
                      setSelectedProduct(null);
                      reset();
                    }}
                    className="flex-1 px-4 py-2 border border-brown-primary text-brown-primary rounded-md hover:bg-brown-primary/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-[#808080] transition-colors"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
