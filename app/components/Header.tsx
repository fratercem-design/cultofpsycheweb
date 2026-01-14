import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 sm:px-8 py-4 border-b border-[var(--border)]">
      <Link href="/" className="font-bold text-xl text-[var(--accent)]">
        Cult of Psyche
      </Link>
      <nav>
        <ul className="flex gap-6 list-none">
          <li>
            <Link href="/show" className="text-[var(--fg)] no-underline text-sm hover:text-[var(--accent)] transition-colors">
              Show
            </Link>
          </li>
          <li>
            <a href="#mantras" className="text-[var(--fg)] no-underline text-sm hover:text-[var(--accent)] transition-colors">
              Mantras
            </a>
          </li>
          <li>
            <a href="#store" className="text-[var(--fg)] no-underline text-sm hover:text-[var(--accent)] transition-colors">
              Store
            </a>
          </li>
          <li>
            <a href="#charity" className="text-[var(--fg)] no-underline text-sm hover:text-[var(--accent)] transition-colors">
              Charity
            </a>
          </li>
          <li>
            <a href="#about" className="text-[var(--fg)] no-underline text-sm hover:text-[var(--accent)] transition-colors">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
