'use client';

import Link from 'next/link';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmailCapture from '../components/EmailCapture';

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
          Join the Community
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          Get exclusive teachings and resources delivered weekly.
        </p>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-8 mb-8">
          <EmailCapture />
        </div>
        <div className="text-center">
          <Link 
            href="/" 
            className="text-[var(--accent)] hover:text-[#d4b8ff] transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
