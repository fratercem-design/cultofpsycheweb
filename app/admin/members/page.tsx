'use client';

import { useState } from 'react';
import Footer from '../../components/Footer';

interface Member {
  id: string;
  email: string;
  name: string;
  status: 'active' | 'lapsed' | 'comp';
  subscriptionId: string;
  joinedDate: string;
  lastPayment: string;
}

export default function AdminMembersPage() {
  const [members] = useState<Member[]>([
    // In production, this would come from your database/Stripe
    {
      id: '1',
      email: 'member@example.com',
      name: 'John Doe',
      status: 'active',
      subscriptionId: 'sub_123',
      joinedDate: '2024-01-15',
      lastPayment: '2024-01-15',
    },
  ]);
  const [compEmail, setCompEmail] = useState('');

  const handleGrantComp = () => {
    // In production, this would call an API to grant comp access
    console.log('Granting comp access to:', compEmail);
    setCompEmail('');
    alert('Comp access granted (this is a demo)');
  };

  const handleRemoveAccess = (memberId: string) => {
    // In production, this would call an API to remove access
    if (confirm('Are you sure you want to remove access for this member?')) {
      console.log('Removing access for:', memberId);
      alert('Access removed (this is a demo)');
    }
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Members Manager</h2>

        {/* Grant Comp Access */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Grant Comp Access</h3>
          <div className="flex gap-2">
            <input
              type="email"
              value={compEmail}
              onChange={(e) => setCompEmail(e.target.value)}
              placeholder="email@example.com"
              className="flex-1 px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] focus:outline-none focus:border-[var(--accent)]"
            />
            <button
              onClick={handleGrantComp}
              className="px-6 py-2 bg-[var(--accent)] hover:bg-[#8b5fd6] text-white font-semibold rounded-lg transition-colors"
            >
              Grant Access
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Grant free access for special cases. Access is mostly handled automatically by Stripe events.
          </p>
        </div>

        {/* Members List */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg)] border-b border-[var(--border)]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name / Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Last Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                      No members yet. Members will appear here when they subscribe.
                    </td>
                  </tr>
                ) : (
                  members.map((member) => (
                    <tr key={member.id} className="hover:bg-[var(--bg)]/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[var(--fg)]">{member.name}</div>
                        <div className="text-sm text-gray-400">{member.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            member.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : member.status === 'comp'
                              ? 'bg-[var(--accent)]/20 text-[var(--accent)]'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {member.joinedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {member.lastPayment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleRemoveAccess(member.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          Remove Access
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Note: Member access is primarily managed automatically through Stripe webhook events. 
          Use "Remove Access" only in rare cases.
        </p>
      </div>
      <Footer />
    </>
  );
}
