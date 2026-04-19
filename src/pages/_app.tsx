import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { AuthProvider } from '@/lib/auth-context';
import Navigation from '@/components/Navigation';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App({ Component, pageProps }: AppProps) {
  // Check if page should hide navigation (like login page)
  const showNavigation = !Component.name?.includes('Login');

  return (
    <AuthProvider>
      {showNavigation && <Navigation />}
      <Component {...pageProps} />
      <SpeedInsights />
    </AuthProvider>
  );
}
