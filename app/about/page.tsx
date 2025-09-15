'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.section').forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => gsap.fromTo(section, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
      });
    });
  }, []);

  return (
    <div className="bg-[#200A24] min-h-screen">
      {/* Full Width Video Banner */}
      <div className="w-full h-64 relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/hero-banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Content over video */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">CLEF Music</h1>
            <p className="text-xl text-white/90">Your Musical Journey Begins Here</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Us Section */}
        <div className="section text-center mb-20">
          <h2 className="text-4xl font-serif font-bold text-brown-primary mb-8">About Us</h2>
          <p className="text-lg text-brown-primary/80 leading-relaxed max-w-4xl mx-auto">
            CLEF Music is a leading manufacturer and supplier of premium musical instruments, professional sound systems, 
            and innovative lighting solutions. Founded with a passion for music and technology, we have built our reputation 
            on delivering exceptional quality products that inspire creativity and elevate performances. Our commitment to 
            excellence has made us a trusted partner for musicians, sound engineers, and lighting professionals worldwide.
          </p>
        </div>

        {/* Vision and Mission Section */}
        <div className="section grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-cream p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brown-primary rounded-full flex items-center justify-center mr-4">
                <span className="text-cream text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-brown-primary">Our Mission</h3>
            </div>
            <p className="text-brown-primary/80 leading-relaxed">
              CLEF Music is dedicated to providing musicians, sound engineers, and lighting professionals with 
              exceptional equipment that enhances their creative expression. We strive to build lasting relationships 
              with our customers through superior products, expert guidance, and outstanding service. Our mission is 
              to empower artists and professionals to achieve their highest potential through innovative, reliable, 
              and inspiring musical solutions.
            </p>
          </div>

          <div className="bg-cream p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brown-primary rounded-full flex items-center justify-center mr-4">
                <span className="text-cream text-2xl">👁</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-brown-primary">Our Vision</h3>
            </div>
            <p className="text-brown-primary/80 leading-relaxed">
              Our vision is to become the globally recognized leader in musical equipment and professional audio-visual 
              solutions. We aspire to shape the future of music and performance by continuously innovating and providing 
              cutting-edge products that inspire creativity, foster artistic expression, and bring joy to people&apos;s lives. 
              We envision a world where every musician and performer has access to the finest instruments and technology 
              to share their passion with the world.
            </p>
          </div>
        </div>

        {/* Our Services Section */}
        <div className="section mb-20">
          <h2 className="text-4xl font-serif font-bold text-brown-primary text-center mb-12">Our Services</h2>

          {/* Musical Instruments Service */}
          <div className="mb-16">
            <div className="w-full h-64 relative overflow-hidden mb-8 rounded-lg shadow-lg">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://videos.pexels.com/video-files/19057430/19057430-hd_1920_1080_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/30"></div>
              {/* Content over video */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">Musical Instruments</h3>
              </div>
            </div>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-brown-primary/80 leading-relaxed">
                Discover our extensive collection of premium musical instruments, from professional guitars and keyboards 
                to orchestral instruments and percussion. Each instrument is carefully selected for its exceptional quality, 
                superior craftsmanship, and authentic sound. Whether you are a beginner embarking on your musical journey 
                or a seasoned professional seeking that perfect instrument, our diverse range caters to every skill level 
                and musical genre. We partner with renowned manufacturers to bring you instruments that inspire creativity 
                and deliver outstanding performance.
              </p>
            </div>
          </div>

          {/* Sound Systems Service */}
          <div className="mb-16">
            <div className="w-full h-64 relative overflow-hidden mb-8 rounded-lg shadow-lg">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://videos.pexels.com/video-files/26744649/11999035_1920_1080_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/30"></div>
              {/* Content over video */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">Sound Systems</h3>
              </div>
            </div>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-brown-primary/80 leading-relaxed">
                Experience crystal-clear audio with our professional sound systems designed for every venue and occasion. 
                From compact portable speakers perfect for intimate gatherings to powerful PA systems for large concerts 
                and events, we offer comprehensive audio solutions that deliver exceptional sound quality. Our range includes 
                mixing consoles, amplifiers, microphones, and complete sound reinforcement systems. Each system is engineered 
                to provide reliable performance, easy operation, and superior audio fidelity that brings your music to life 
                with stunning clarity and depth.
              </p>
            </div>
          </div>

          {/* Lighting Systems Service */}
          <div className="mb-16">
            <div className="w-full h-64 relative overflow-hidden mb-8 rounded-lg shadow-lg">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://videos.pexels.com/video-files/30873698/13201592_2560_1440_24fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/30"></div>
              {/* Content over video */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white text-center">Lighting Systems</h3>
              </div>
            </div>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-brown-primary/80 leading-relaxed">
                Illuminate your performances with our cutting-edge lighting systems that transform any space into a 
                captivating visual experience. Our comprehensive lighting solutions include LED fixtures, moving head 
                lights, wash lights, and intelligent lighting controllers that create dynamic, synchronized displays. 
                Whether you&apos;re setting the mood for an intimate acoustic performance or creating spectacular effects for 
                a large-scale production, our lighting systems offer endless creative possibilities. With energy-efficient 
                LED technology and user-friendly controls, you can easily design and execute stunning lighting designs 
                that complement and enhance your musical performances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
