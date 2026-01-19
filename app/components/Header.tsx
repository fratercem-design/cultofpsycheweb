import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 sm:px-8 py-4 border-b border-[var(--border)]">
      <Link href="/" className="font-bold text-xl text-[var(--accent)]">
        Cult of Psyche
      </Link>
      <nav>
        <ul className="flex gap-4 sm:gap-6 list-none text-sm">
          <li>
            <Link href="/" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/recommended" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Recommended
            </Link>
          </li>
          <li>
            <Link href="/community" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Community
            </Link>
          </li>
          <li>
            <Link href="/sai-art" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              SAI Art
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link href="/support" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Support
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
