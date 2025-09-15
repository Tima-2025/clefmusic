// app/(wherever)/ProductSection.tsx
'use client';

import Link from 'next/link';
import { useMemo } from 'react';

// Minimal, static data for the "Our Categories" list.
// Provide local images if available; otherwise omit `image` and an initial badge will render.
type Category = {
  name: string;
  slug: string;
  image?: string; // e.g., '/images/categories/guitars.png'
};

// Helper to create URL-friendly slugs if needed
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const CATEGORIES: Category[] = [
  { name: 'Guitars and Basses', slug: 'guitars-and-basses', image: '/images/categories/guitars.png' },
  { name: 'Drums and Percussion', slug: 'drums-and-percussion', image: '/images/categories/drums.png' },
  { name: 'Keys', slug: 'keys', image: '/images/categories/keys.png' },
  { name: 'Studio and Recording Equipment', slug: 'studio-recording', image: '/images/categories/studio.png' },
  { name: 'Software', slug: 'software', image: '/images/categories/software.png' },
  { name: 'PA Equipment', slug: 'pa-equipment', image: '/images/categories/pa.png' },
  { name: 'Lighting and Stage', slug: 'lighting-stage', image: '/images/categories/lighting.png' },
  { name: 'DJ Equipment', slug: 'dj-equipment', image: '/images/categories/dj.png' },
  { name: 'Broadcast & Video', slug: 'broadcast-video', image: '/images/categories/video.png' },
  { name: 'Microphones', slug: 'microphones', image: '/images/categories/mics.png' },
  { name: 'Effect and Signal Processors', slug: 'effects-signal', image: '/images/categories/effects.png' },
  { name: 'Wind Instruments', slug: 'wind-instruments', image: '/images/categories/wind.png' },
  { name: 'Traditional Instruments', slug: 'traditional-instruments', image: '/images/categories/traditional.png' },
  { name: 'Sheet Music', slug: 'sheet-music', image: '/images/categories/sheet-music.png' },
  { name: 'Cases, Racks and Bags', slug: 'cases-racks-bags', image: '/images/categories/cases.png' },
  { name: 'Cables and Connectors', slug: 'cables-connectors', image: '/images/categories/cables.png' },
  { name: 'Accessories', slug: 'accessories', image: '/images/categories/accessories.png' },
  { name: 'Stompenberg FX', slug: 'stompenberg-fx', image: '/images/categories/stompenberg.png' },
];

export default function ProductSection() {
  // If slugs aren't set above, generate them from names.
  const categories = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        slug: c.slug || slugify(c.name),
      })),
    []
  );

  const handleImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    const badge = img.nextElementSibling as HTMLElement | null;
    if (badge) badge.style.display = 'flex';
  };

  return (
    <section aria-labelledby="our-categories" className="py-10 md:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 id="our-categories" className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 text-center mb-8">
          Our Categories
        </h2>

        {/* 1–3 columns, keeps the same list feel on mobile */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brown-primary/60 rounded-sm"
            >
              <div className="flex items-center gap-5 py-6 border-b border-gray-200">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md ring-1 ring-gray-200 bg-white">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-contain"
                      onError={handleImgError}
                    />
                  ) : null}
                  {/* Fallback badge (shows when image missing or fails) */}
                  <div
                    className="absolute inset-0 hidden items-center justify-center bg-gray-50 text-gray-600 text-xl font-medium"
                    aria-hidden="true"
                  >
                    {cat.name.charAt(0)}
                  </div>
                </div>

                <span className="text-lg md:text-xl text-gray-900 group-hover:text-black transition-colors">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
