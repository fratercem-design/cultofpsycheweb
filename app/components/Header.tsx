import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 sm:px-8 py-4 border-b border-[var(--border)]">
      <Link href="/" className="font-bold text-xl text-[var(--accent)]">
        Vault + Signal
      </Link>
      <nav>
        <ul className="flex gap-4 sm:gap-6 list-none text-sm">
          <li>
            <Link href="/" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/start-here" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Start Here
            </Link>
          </li>
          <li>
            <Link href="/bio" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Bio
            </Link>
          </li>
          <li>
            <Link href="/teachings" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Teachings
            </Link>
          </li>
          <li>
            <Link href="/recommendations" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Recommendations
            </Link>
          </li>
          <li>
            <Link href="/vault" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Vault
            </Link>
          </li>
          <li>
            <Link href="/show" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Live
            </Link>
          </li>
          <li>
            <Link href="#join" className="text-[var(--fg)] no-underline hover:text-[var(--accent)] transition-colors">
              Join
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
