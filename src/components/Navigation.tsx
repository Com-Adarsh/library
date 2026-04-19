import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Upload, ChevronDown, Clock, Calculator } from 'lucide-react';
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md border-b border-light-gray' : 'bg-white/95 backdrop-blur-sm border-b border-light-gray/50'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Left */}
          <Link href="/" className="hover:no-underline flex items-center gap-3">
            <div className="flex items-center gap-3">
              {/* CUSAT Logo Placeholder */}
              <div className="w-10 h-10 bg-slate-navy rounded-lg flex items-center justify-center text-white font-bold text-xs border border-crimson">
                CUSAT
              </div>

              {/* SFI Logo Placeholder */}
              <div className="w-10 h-10 bg-crimson rounded-lg flex items-center justify-center text-white font-bold text-xs">
                SFI
              </div>

              {/* Branding Text */}
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-poppins font-bold text-sm text-slate-navy">The IMSC Commons</span>
                <span className="text-xs text-slate-gray">Digital Library</span>
              </div>
            </div>
          </Link>

          {/* Desktop Menu - Center */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Question Papers Dropdown */}
            <div className="relative group">
              <button className="text-slate-navy font-medium hover:text-crimson transition flex items-center gap-1 py-2">
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

            {/* Textbooks Dropdown */}
            <div className="relative group">
              <button className="text-slate-navy font-medium hover:text-crimson transition flex items-center gap-1 py-2">
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

            <Link href="/discussions" className="text-slate-navy font-medium hover:text-crimson transition hover:no-underline py-2">
              Discussion Hub
            </Link>

            <Link href="/leaderboard" className="text-slate-navy font-medium hover:text-crimson transition hover:no-underline py-2">
              Top Contributors
            </Link>

            {/* Tools Dropdown */}
            <Link href="/tools" className="flex items-center gap-1 text-slate-navy font-medium hover:text-crimson transition hover:no-underline py-2">
              <Calculator size={18} />
              Tools
            </Link>

            <Link href="/about" className="text-slate-navy font-medium hover:text-crimson transition hover:no-underline py-2">
              About
            </Link>
          </div>

          {/* Right Section - Clock, Upload & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Live Clock */}
            <div className="hidden md:flex items-center gap-2 text-slate-600 text-sm px-3 py-1 bg-slate-50 rounded-lg border border-slate-200">
              <Clock size={16} className="text-crimson animate-pulse" />
              <span className="font-mono font-medium">{currentTime}</span>
            </div>

            <Link href="/upload">
              <button className="bg-crimson text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition flex items-center gap-2 shadow-sm hover:shadow-md">
                <Upload size={20} />
                <span className="hidden sm:inline">Upload</span>
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-slate-navy hover:text-crimson transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-light-gray bg-white/98 backdrop-blur-sm">
            {/* Mobile Question Papers */}
            <div className="py-2">
              <button
                onClick={() => toggleDropdown('papers')}
                className="w-full text-left px-0 py-2 text-slate-navy font-medium hover:text-crimson flex items-center justify-between"
              >
                Question Papers
                <ChevronDown size={18} className={`transition-transform ${openDropdown === 'papers' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'papers' && (
                <div className="bg-ghost-white rounded-lg mt-2 py-2 space-y-1">
                  {SUBJECTS.slice(0, 4).map((subject) => (
                    <Link
                      key={subject.name}
                      href={`/subject/${subject.name.replace(/\s+/g, '-').toLowerCase()}?type=question_paper`}
                      className="block px-4 py-2 text-slate-gray hover:text-crimson hover:no-underline text-small"
                    >
                      {subject.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Textbooks */}
            <div className="py-2">
              <button
                onClick={() => toggleDropdown('books')}
                className="w-full text-left px-0 py-2 text-slate-navy font-medium hover:text-crimson flex items-center justify-between"
              >
                Textbooks
                <ChevronDown size={18} className={`transition-transform ${openDropdown === 'books' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'books' && (
                <div className="bg-ghost-white rounded-lg mt-2 py-2 space-y-1">
                  {SUBJECTS.slice(0, 4).map((subject) => (
                    <Link
                      key={subject.name}
                      href={`/subject/${subject.name.replace(/\s+/g, '-').toLowerCase()}?type=textbook`}
                      className="block px-4 py-2 text-slate-gray hover:text-crimson hover:no-underline text-small"
                    >
                      {subject.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Links */}
            <Link
              href="/discussions"
              className="block px-0 py-2 text-slate-navy hover:text-crimson transition hover:no-underline font-medium"
              onClick={() => setIsOpen(false)}
            >
              Discussion Hub
            </Link>
            <Link
              href="/leaderboard"
              className="block px-0 py-2 text-slate-navy hover:text-crimson transition hover:no-underline font-medium"
              onClick={() => setIsOpen(false)}
            >
              Top Contributors
            </Link>
            <Link
              href="/tools"
              className="block px-0 py-2 text-slate-navy hover:text-crimson transition hover:no-underline font-medium flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Calculator size={18} /> Tools
            </Link>
            <Link
              href="/about"
              className="block px-0 py-2 text-slate-navy hover:text-crimson transition hover:no-underline font-medium"
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
