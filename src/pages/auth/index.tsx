import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Implement actual authentication with AuthContext
      // For now, show success message
      setTimeout(() => {
        alert('Authentication coming soon! Set up Supabase credentials first.');
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{isSignUp ? 'Sign Up' : 'Sign In'} - The IMSC Commons</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-navy to-slate-navy/80 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-lg shadow-2xl p-8 border border-light-gray">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">📚</div>
              <h1 className="text-h2 text-slate-navy mb-2">
                {isSignUp ? 'Join The IMSC Commons' : 'Welcome Back'}
              </h1>
              <p className="text-slate-gray">
                {isSignUp
                  ? 'Create your account to contribute and collaborate'
                  : 'Sign in to access your resources'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-small">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Sign Up Only) */}
              {isSignUp && (
                <div>
                  <label className="block text-slate-navy font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-slate-gray" size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-slate-navy font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-slate-gray" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-slate-navy font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-slate-gray" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-crimson text-white py-2 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-light-gray"></div>
              <span className="text-slate-gray text-small">Or</span>
              <div className="flex-1 h-px bg-light-gray"></div>
            </div>

            {/* Toggle Sign Up / Sign In */}
            <p className="text-center text-slate-gray mb-4">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                className="text-crimson font-medium hover:underline ml-2"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>

            {/* Back to Home */}
            <Link href="/">
              <button type="button" className="w-full py-2 border-2 border-light-gray rounded-lg font-medium hover:bg-ghost-white transition text-slate-navy">
                Back to Home
              </button>
            </Link>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-sky-blue rounded-lg text-small text-slate-navy">
              ℹ️ <strong>Note:</strong> Full authentication requires Supabase setup. Visit the setup guide to configure your database credentials.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
