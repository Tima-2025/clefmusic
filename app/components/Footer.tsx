export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#200A24] to-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-white">CLEF Music</h3>
            <p className="text-white mb-4">
              Your premier destination for musical instruments, sound systems, and lighting equipment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Contact Information</h4>
            <div className="space-y-2 text-white">
              <p>📍 123 Music Street, Harmony City, MC 12345</p>
              <p>📞 +1 (555) 123-MUSIC</p>
              <p>✉️ info@clefmusic.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-brown-light mt-8 pt-8 text-center text-white">
          <p>&copy; 2024 CLEF Music. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
