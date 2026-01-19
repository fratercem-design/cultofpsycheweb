'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  time: string;
  timezone: string;
  callLink: string;
  intakeNotes: string;
  paymentStatus: 'paid' | 'refunded' | 'no-show';
  amount: number;
}

export default function AdminBookingsPage() {
  const [bookings] = useState<Booking[]>([
    // In production, this would come from your database
    {
      id: '1',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      date: '2024-02-15',
      time: '14:00',
      timezone: 'EST',
      callLink: 'https://cal.com/cultofpsyche/abc123',
      intakeNotes: 'Interested in tarot reading for career guidance.',
      paymentStatus: 'paid',
      amount: 50,
    },
  ]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [notes, setNotes] = useState('');

  const handleUpdateNotes = (bookingId: string) => {
    // In production, this would call an API to update notes
    console.log('Updating notes for booking:', bookingId, notes);
    setNotes('');
    alert('Notes updated (this is a demo)');
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Booking Manager</h2>

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 text-center text-gray-400">
              No upcoming appointments. Bookings will appear here when customers book sessions.
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{booking.customerName}</h3>
                    <p className="text-sm text-gray-400">{booking.customerEmail}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.paymentStatus === 'paid'
                        ? 'bg-green-500/20 text-green-400'
                        : booking.paymentStatus === 'refunded'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Date & Time:</span>
                    <p className="text-[var(--fg)]">
                      {booking.date} at {booking.time} ({booking.timezone})
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Amount:</span>
                    <p className="text-[var(--fg)]">${booking.amount}</p>
                  </div>
                </div>

                {booking.callLink && (
                  <div className="mb-4">
                    <a
                      href={booking.callLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors text-sm"
                    >
                      View Call Link →
                    </a>
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Intake Notes
                  </label>
                  <textarea
                    value={booking.intakeNotes || notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)] resize-y"
                    placeholder="Add or update intake notes..."
                  />
                  <button
                    onClick={() => handleUpdateNotes(booking.id)}
                    className="mt-2 px-4 py-2 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    Update Notes
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
