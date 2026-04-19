import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Upload, ChevronDown, Clock, Calculator, MessageCircle } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live clock in IST
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(time);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md border-b border-slate-200' : 'bg-white/70 backdrop-blur-md border-b border-slate-200/40'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-3">
              <img src="/cusat-logo.svg" alt="CUSAT" className="h-12 w-auto" />
              <img src="/abhimanyu-logo.svg" alt="Abhimanyu Memorial" className="h-12 w-auto" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.04em] uppercase text-slate-900 leading-tight">
                ABHIMANYU <span className="text-red-700">LEARNING SPACE</span>
              </h1>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold italic text-slate-500 mt-1">
                Knowledge is a Weapon, Education is Liberation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <a
              href="https://whatsapp.com/channel/0029VaesYjiHgZWZT1NwWo1z"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:border-red-700 hover:text-red-700"
            >
              <MessageCircle size={20} />
            </a>
            <Link href="/upload">
              <button className="rounded-full bg-red-700 px-6 py-2 text-sm font-bold uppercase text-white shadow-lg transition hover:bg-red-800">
                Upload Resource
              </button>
            </Link>
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:border-red-700 hover:text-red-700"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-between gap-6 mt-4">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <button className="text-slate-900 font-medium hover:text-red-700 transition flex items-center gap-1 py-2">
                Question Papers <ChevronDown size={18} />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white border border-light-gray rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                {SUBJECTS.map((subject) => (
                  <Link
                    key={subject.name}
                    href={`/subject/${subject.name.replace(/\s+/g, '-').toLowerCase()}?type=question_paper`}
                    className="block px-4 py-2 text-slate-navy hover:bg-ghost-white hover:text-crimson hover:no-underline text-small"
                  >
                    {subject.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="text-slate-900 font-medium hover:text-red-700 transition flex items-center gap-1 py-2">
                Textbooks <ChevronDown size={18} />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white border border-light-gray rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                {SUBJECTS.map((subject) => (
                  <Link
                    key={subject.name}
                    href={`/subject/${subject.name.replace(/\s+/g, '-').toLowerCase()}?type=textbook`}
                    className="block px-4 py-2 text-slate-navy hover:bg-ghost-white hover:text-crimson hover:no-underline text-small"
                  >
                    {subject.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/discussions" className="text-slate-900 font-medium hover:text-red-700 transition hover:no-underline py-2">
              Discussion Hub
            </Link>
            <Link href="/leaderboard" className="text-slate-900 font-medium hover:text-red-700 transition hover:no-underline py-2">
              Top Contributors
            </Link>
            <Link href="/tools" className="text-slate-900 font-medium hover:text-red-700 transition hover:no-underline py-2 flex items-center gap-1">
              <Calculator size={18} /> Tools
            </Link>
            <Link href="/about" className="text-slate-900 font-medium hover:text-red-700 transition hover:no-underline py-2">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="hidden xl:inline-flex items-center gap-2 bg-white/90 rounded-full border border-slate-200 px-3 py-2 shadow-sm">
              <Clock size={16} className="text-red-700" /> {currentTime}
            </span>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg">
            <div className="space-y-3">
              <button
                onClick={() => toggleDropdown('papers')}
                className="w-full text-left text-slate-900 font-medium hover:text-red-700 transition flex items-center justify-between"
              >
                Question Papers
                <ChevronDown size={18} className={`${openDropdown === 'papers' ? 'rotate-180' : ''} transition-transform`} />
              </button>
              {openDropdown === 'papers' && (
                <div className="space-y-1 rounded-lg bg-slate-50 p-2">
                  {SUBJECTS.slice(0, 4).map((subject) => (
                    <Link
                      key={subject.name}
                      href={`/subject/${subject.name.replace(/\s+/g, '-').toLowerCase()}?type=question_paper`}
                      className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-white hover:text-red-700"
                    >
                      {subject.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 mt-3">
              <button
                onClick={() => toggleDropdown('books')}
                className="w-full text-left text-slate-900 font-medium hover:text-red-700 transition flex items-center justify-between"
              >
                Textbooks
                <ChevronDown size={18} className={`${openDropdown === 'books' ? 'rotate-180' : ''} transition-transform`} />
              </button>
              {openDropdown === 'books' && (
                <div className="space-y-1 rounded-lg bg-slate-50 p-2">
                  {SUBJECTS.slice(0, 4).map((subject) => (
                    <Link
                      key={subject.name}
                      href={`/subject/${subject.name.replace(/\s+/g, '-').toLowerCase()}?type=textbook`}
                      className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-white hover:text-red-700"
                    >
                      {subject.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/discussions"
              className="block rounded-lg px-4 py-3 text-slate-900 font-medium hover:bg-slate-50 hover:text-red-700"
              onClick={() => setIsOpen(false)}
            >
              Discussion Hub
            </Link>
            <Link
              href="/leaderboard"
              className="block rounded-lg px-4 py-3 text-slate-900 font-medium hover:bg-slate-50 hover:text-red-700"
              onClick={() => setIsOpen(false)}
            >
              Top Contributors
            </Link>
            <Link
              href="/tools"
              className="block rounded-lg px-4 py-3 text-slate-900 font-medium hover:bg-slate-50 hover:text-red-700"
              onClick={() => setIsOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/about"
              className="block rounded-lg px-4 py-3 text-slate-900 font-medium hover:bg-slate-50 hover:text-red-700"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
