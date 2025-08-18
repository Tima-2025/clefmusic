'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  orderType: z.string().min(1, 'Please select an order type'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactForm) => {
    console.log('Contact form:', data);
    
    // Save contact message to localStorage for admin tracking
    const contactMessage = {
      id: Date.now().toString(),
      customerName: data.name,
      customerEmail: data.email,
      orderType: data.orderType,
      message: data.message,
      status: 'New',
      sentDate: new Date().toISOString()
    };
    
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-16 bg-[#200A24] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-brown-primary mb-6">Contact</h1>
          <p className="text-xl text-brown-primary/80">
            We are happy to assist you with all your questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-semibold text-brown-primary mb-6">
                Dear customer, dealer, or supplier,
              </h2>
              <p className="text-brown-primary/80 mb-8 leading-relaxed">
                Thank you for reaching out to us. Please fill in the form below, and we will respond 
                to you as soon as possible.
              </p>
              <p className="text-brown-primary/80 mb-8 leading-relaxed">
                We are available by phone between 09:00-17:00. If it is less urgent, you can always 
                email us at info@clefmusic.com
              </p>
            </div>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  {...register('name')}
                  className="w-full px-4 py-3 border-2 border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                  type="text"
                  placeholder="NAME"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <input
                  {...register('email')}
                  className="w-full px-4 py-3 border-2 border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                  type="email"
                  placeholder="EMAIL ADDRESS"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <select
                  {...register('orderType')}
                  className="w-full px-4 py-3 border-2 border-brown-primary/30 rounded-none bg-white text-black focus:outline-none focus:border-brown-primary"
                >
                  <option value="">PRODUCT TYPE</option>
                  <option value="musical-instruments">Musical Instruments</option>
                  <option value="sound-systems">Sound Systems</option>
                  <option value="lighting-systems">Lighting Systems</option>
                  <option value="other">Other</option>
                </select>
                {errors.orderType && <p className="text-red-500 text-sm mt-1">{errors.orderType.message}</p>}
              </div>

              <div>
                <textarea
                  {...register('message')}
                  className="w-full px-4 py-3 border-2 border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                  rows={6}
                  placeholder="MESSAGE"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                className="bg-brown-primary text-black px-8 py-3 rounded-none hover:bg-brown-dark transition-colors font-medium text-sm tracking-wider"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Right Column - Map and Contact Info */}
          <div className="space-y-8">
            {/* Google Maps Integration */}
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '384px' }}
                center={{ lat: 37.7749, lng: -122.4194 }}
                zoom={15}
                options={{
                  styles: [
                    {
                      featureType: 'all',
                      elementType: 'geometry.fill',
                      stylers: [{ color: '#F5E9DC' }]
                    }
                  ]
                }}
              >
                <Marker 
                  position={{ lat: 37.7749, lng: -122.4194 }}
                  title="CLEF Music Store"
                />
              </GoogleMap>
            </LoadScript>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="border-l-4 border-brown-primary pl-6">
                <h3 className="font-semibold text-brown-primary text-lg mb-2">123 MUSIC STREET</h3>
                <p className="text-brown-primary/80">HARMONY CITY, MC 12345</p>
                <p className="text-brown-primary/80">UNITED STATES</p>
              </div>

              <div className="border-l-4 border-brown-primary pl-6">
                <h3 className="font-semibold text-brown-primary text-lg mb-2">INFO@CLEFMUSIC.COM</h3>
              </div>

              <div className="border-l-4 border-brown-primary pl-6">
                <h3 className="font-semibold text-brown-primary text-lg mb-2">+1 (555) 123-MUSIC</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
