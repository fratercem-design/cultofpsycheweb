import Link from 'next/link';
import Header from '../components/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <nav className="flex gap-4 border-b border-[var(--border)]">
            <Link
              href="/admin"
              className="px-4 py-2 border-b-2 border-transparent hover:border-[var(--accent)] transition-colors"
            >
              Content Drops
            </Link>
            <Link
              href="/admin/members"
              className="px-4 py-2 border-b-2 border-transparent hover:border-[var(--accent)] transition-colors"
            >
              Members
            </Link>
            <Link
              href="/admin/bookings"
              className="px-4 py-2 border-b-2 border-transparent hover:border-[var(--accent)] transition-colors"
            >
              Bookings
            </Link>
            <Link
              href="/admin/broadcast"
              className="px-4 py-2 border-b-2 border-transparent hover:border-[var(--accent)] transition-colors"
            >
              Broadcast
            </Link>
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}
