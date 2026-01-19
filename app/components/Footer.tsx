import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Cult of Psyche */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[var(--accent)]">Cult of Psyche</h3>
            <p className="text-sm text-gray-400 mb-4">
              Occult wisdom and transformative teachings for the modern seeker
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-gray-300">Navigate</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recommended" className="hover:text-[var(--accent)] transition-colors">
                  Recommended
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-[var(--accent)] transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/sai-art" className="hover:text-[var(--accent)] transition-colors">
                  SAI Art
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--accent)] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="hover:text-[var(--accent)] transition-colors">
                  Get Alerts
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[var(--accent)] transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-[var(--accent)] transition-colors">
                  Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-gray-300">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a 
                  href="https://youtube.com/@cultofpsyche" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/psycheawakens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  X
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/psycheawakens" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethics & Values */}
        <div className="border-t border-[var(--border)] pt-8 mb-8">
          <h3 className="font-semibold text-sm mb-4 text-gray-300">Ethics & Values</h3>
          <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
            Cult of Psyche operates with integrity, respect, and responsibility. This work demands ethical practice, clear boundaries, and authentic connection. We honor all paths and recognize that each seeker&apos;s journey is unique. Our community is built on mutual respect, consent, and the understanding that true spirituality serves liberation, not exploitation.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] pt-8 text-center text-sm text-gray-400">
          <p>© 2026 Cult of Psyche. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
