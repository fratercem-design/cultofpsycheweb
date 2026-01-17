import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Vault + Signal */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[var(--accent)]">Vault + Signal</h3>
            <p className="text-sm text-gray-400 mb-4">
              Occult wisdom for the modern seeker
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
                <Link href="/start-here" className="hover:text-[var(--accent)] transition-colors">
                  Start Here
                </Link>
              </li>
              <li>
                <Link href="/bio" className="hover:text-[var(--accent)] transition-colors">
                  Bio
                </Link>
              </li>
              <li>
                <Link href="/teachings" className="hover:text-[var(--accent)] transition-colors">
                  Teachings
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="hover:text-[var(--accent)] transition-colors">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link href="/vault" className="hover:text-[var(--accent)] transition-colors">
                  Vault
                </Link>
              </li>
              <li>
                <Link href="/show" className="hover:text-[var(--accent)] transition-colors">
                  Live
                </Link>
              </li>
              <li>
                <Link href="#join" className="hover:text-[var(--accent)] transition-colors">
                  Join
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
                  href="https://twitter.com/cultofpsyche" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/cultofpsyche" 
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
            Vault + Signal operates with integrity, respect, and responsibility. This work demands ethical practice, clear boundaries, and authentic connection. We honor all paths and recognize that each seeker&apos;s journey is unique. Our community is built on mutual respect, consent, and the understanding that true spirituality serves liberation, not exploitation.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--border)] pt-8 text-center text-sm text-gray-400">
          <p>© 2026 Vault + Signal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
