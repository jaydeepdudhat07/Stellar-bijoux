'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send to your API
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="py-20 px-4 md:px-10 bg-gradient-to-r from-gold-light to-wheat">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold heading-font mb-4 text-gray-900">
          Stay Updated with Our Newsletter
        </h2>
        <p className="text-gray-700 mb-8 tracking-wide">
          Subscribe to receive exclusive offers, new arrivals, and jewelry care tips
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-6 py-4 w-full md:w-96 rounded-md border-2 border-gray-300 focus:border-gold focus:outline-none text-gray-800"
          />
          <button
            type="submit"
            className="px-10 py-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors uppercase tracking-wider font-medium whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        {subscribed && (
          <p className="mt-6 text-green-700 font-medium animate-fadeIn">
            ✓ Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
}

