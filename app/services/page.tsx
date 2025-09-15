'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceSchema = z.object({
  typeNumber: z.string().min(1, 'Type number is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  surname: z.string().min(2, 'Surname must be at least 2 characters'),
  land: z.string().min(2, 'Country is required'),
  street: z.string().min(5, 'Street address is required'),
  houseNumber: z.string().min(1, 'House number is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  city: z.string().min(2, 'City is required'),
  telephone: z.string().min(10, 'Phone number is required'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

type ServiceForm = z.infer<typeof serviceSchema>;

export default function Services() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema)
  });

  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.section').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => gsap.fromTo(section, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
      });
    });
  }, []);

  const onSubmit = (data: ServiceForm) => {
    console.log('Service request:', data);
    
    // Save service request to localStorage for admin tracking
    const serviceRequest = {
      id: Date.now().toString(),
      customerName: `${data.name} ${data.surname}`,
      customerEmail: data.email,
      customerPhone: data.telephone,
      typeNumber: data.typeNumber,
      serialNumber: data.serialNumber,
      address: `${data.street} ${data.houseNumber}, ${data.postalCode} ${data.city}, ${data.land}`,
      message: data.message,
      status: 'Pending',
      requestDate: new Date().toISOString()
    };
    
    const requests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
    requests.push(serviceRequest);
    localStorage.setItem('serviceRequests', JSON.stringify(requests));
    
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-16 bg-[#200A24] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section mb-12">
          <h1 className="text-4xl font-serif font-bold text-brown-primary mb-6">Service request</h1>
          <p className="text-brown-primary/80 leading-relaxed">
            Welcome to our Content Customer Platform. You can log in here using the serial number you received 
            upon the delivery of your organ as both your username and password. Please make sure to change this 
            after logging in.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Thank you! Your service request has been submitted successfully.
          </div>
        )}

        {/* Service Request Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="section space-y-6">
          {/* Product Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                {...register('typeNumber')}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                type="text"
                placeholder="TYPE NUMBER OF ORGAN"
              />
              {errors.typeNumber && <p className="text-red-500 text-sm mt-1">{errors.typeNumber.message}</p>}
            </div>

            <div>
              <input
                {...register('serialNumber')}
                className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                type="text"
                placeholder="SERIAL NUMBER OF ORGAN"
              />
              {errors.serialNumber && <p className="text-red-500 text-sm mt-1">{errors.serialNumber.message}</p>}
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-serif font-semibold text-brown-primary mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                    type="text"
                    placeholder="NAME"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <input
                    {...register('surname')}
                    className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                    type="text"
                    placeholder="SURNAME"
                  />
                  {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>}
                </div>
              </div>

              <div>
                <input
                  {...register('land')}
                  className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                  type="text"
                  placeholder="LAND"
                />
                {errors.land && <p className="text-red-500 text-sm mt-1">{errors.land.message}</p>}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input
                    {...register('street')}
                    className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                    type="text"
                    placeholder="STREET"
                  />
                  {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
                </div>

                <div>
                  <input
                    {...register('houseNumber')}
                    className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                    type="text"
                    placeholder="HOUSE NUMBER"
                  />
                  {errors.houseNumber && <p className="text-red-500 text-sm mt-1">{errors.houseNumber.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    {...register('postalCode')}
                    className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                    type="text"
                    placeholder="POSTAL CODE"
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>}
                </div>

                <div>
                  <input
                    {...register('city')}
                    className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                    type="text"
                    placeholder="CITY"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                </div>
              </div>

              <div>
                <input
                  {...register('telephone')}
                  className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                  type="tel"
                  placeholder="TELEPHONE NUMBER"
                />
                {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
              </div>

              <div>
                <input
                  {...register('email')}
                  className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                  type="email"
                  placeholder="E-MAIL ADDRESS"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Message Box */}
              <div>
                <textarea
                  {...register('message')}
                  className="w-full px-4 py-3 border border-brown-primary/30 rounded-none bg-white text-black placeholder-black focus:outline-none focus:border-brown-primary"
                  rows={6}
                  placeholder="DESCRIBE YOUR SERVICE REQUEST OR ISSUE..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="bg-yellow-500 text-brown-primary px-8 py-3 rounded-none hover:bg-yellow-400 transition-colors font-medium text-sm tracking-wider"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
