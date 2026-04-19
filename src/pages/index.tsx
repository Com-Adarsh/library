import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BookOpen, Users, MessageSquare, Zap, Download, TrendingUp, Atom, TestTube2, Divide, Dna, BarChart3, Leaf, Globe, Sun } from 'lucide-react';
import Navigation from '@/components/Navigation';
import SciencePulse from '@/components/SciencePulse';
import NewsTicker from '@/components/NewsTicker';
import SocialHub from '@/components/SocialHub';
import Footer from '@/components/Footer';
import { SUBJECTS } from '@/lib/constants';

export default function Home() {
  const stats = [
    { label: 'Resources', value: '1000+', icon: BookOpen },
    { label: 'Contributors', value: '500+', icon: Users },
    { label: 'Discussions', value: '2000+', icon: MessageSquare },
    { label: 'Active Daily', value: '24/7', icon: Zap },
  ];

  // Most downloaded resources this month - from database
  const mostDownloaded: any[] = [];

  return (
    <>
      <Head>
        <title>The IMSC Commons - Digital Library</title>
        <meta name="description" content="Empowering Academic Excellence through Collaboration" />
      </Head>
      <Navigation />

      <main className="min-h-screen">
        {/* Enhanced Hero Section with Building Image */}
        <section className="pt-20 pb-20 bg-cover bg-center text-white relative overflow-hidden h-screen flex items-center justify-center"
                 style={{
                   backgroundImage: 'linear-gradient(135deg, rgba(30, 41, 59, 0.65), rgba(188, 0, 0, 0.25)), url(\'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop\')',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   backgroundAttachment: 'fixed'
                 }}>
          
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

          {/* Gradient Overlay - More dramatic */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-navy/60 via-slate-navy/40 to-transparent"></div>

          {/* Dark vignette for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Welcome Badge */}
              <div className="mb-6 inline-block">
                <span className="bg-crimson/90 text-white px-6 py-2 rounded-full text-sm font-bold backdrop-blur-md">
                  🎓 Welcome to The IMSC Commons
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-h1 mb-4 font-poppins font-bold drop-shadow-lg text-white" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
                Knowledge is a Public Right
              </h1>

              {/* Subheading */}
              <p className="text-2xl font-light mb-2 opacity-98 drop-shadow-md text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                Access textbooks, papers, and scientific progress for the IMSC community
              </p>

              {/* Democratic message */}
              <p className="text-lg opacity-95 mb-12 font-inter drop-shadow-md text-white" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.4)' }}>
                A secular, student-governed digital repository at CUSAT. Managed by SFI IMSC Sub-Committee.
              </p>

              {/* Global Search Bar */}
              <div className="mb-12 max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search any subject, semester, or topic... (e.g., 'Quantum Mechanics Sem 5')"
                    className="w-full px-6 py-4 rounded-full text-slate-navy text-lg focus:outline-none focus:ring-2 focus:ring-crimson shadow-2xl backdrop-blur-md bg-white/95"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-crimson text-white px-8 py-2 rounded-full font-medium hover:bg-red-700 transition transform hover:scale-105">
                    Search
                  </button>
                </div>
                <p className="text-sm opacity-80 mt-3 drop-shadow-md">💡 Tip: Try searching for specific topics, exam years, or resource types</p>
              </div>

              {/* News Ticker */}
              <NewsTicker />

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/subject/physics?type=question_paper">
                  <button className="bg-crimson text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition transform hover:scale-105 shadow-lg text-lg">
                    📚 Browse Library
                  </button>
                </Link>
                <Link href="/upload">
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-slate-navy transition transform hover:scale-105 shadow-lg text-lg">
                    ⬆️ Share Resources
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="w-12 h-12 text-crimson mx-auto mb-4" />
                    <div className="text-4xl font-bold text-slate-navy mb-2">{stat.value}</div>
                    <div className="text-slate-gray font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Most Downloaded Resources */}
        <section className="py-16 bg-ghost-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-crimson" size={32} />
              <h2 className="text-h2">This Month's Top Downloads</h2>
            </div>
            <p className="text-slate-gray mb-12">Popular resources that are helping students prepare for exams</p>

            {mostDownloaded.length === 0 ? (
              // Empty state when no resources uploaded
              <div className="text-center py-12 bg-white rounded-lg border border-light-gray">
                <TrendingUp className="text-slate-gray mx-auto mb-4 opacity-30" size={64} />
                <p className="text-slate-gray text-lg mb-6">Be the first to contribute resources!</p>
                <p className="text-slate-gray mb-6 max-w-2xl mx-auto">
                  Start building our community library by uploading question papers, textbooks, and study materials. Your contributions help thousands of students succeed.
                </p>
                <Link href="/upload">
                  <button className="bg-crimson text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition">
                    Upload Resources Now
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mostDownloaded.map((resource, index) => (
                    <div
                      key={resource.id}
                      className="card hover:shadow-lg hover:border-crimson transition group flex flex-col"
                    >
                      {/* Rank Badge */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-crimson text-white font-bold text-small">
                          #{index + 1}
                        </div>
                        <span className="text-small font-medium text-slate-gray px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                          {resource.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-h3 text-slate-navy mb-2 group-hover:text-crimson transition line-clamp-2 flex-grow">
                        {resource.title}
                      </h3>

                      {/* Subject */}
                      <p className="text-slate-gray text-small mb-3">{resource.subject}</p>

                      {/* Downloads & Author */}
                      <div className="flex items-center justify-between pt-4 border-t border-light-gray">
                        <div className="flex items-center gap-2 text-small text-slate-gray">
                          <Download size={16} className="text-emerald-600" />
                          <span className="font-semibold text-emerald-600">{resource.downloads}</span>
                        </div>
                        <span className="text-small text-slate-gray">by {resource.uploadedBy}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-8">
                  <Link href="/leaderboard">
                    <button className="border-2 border-crimson text-crimson px-8 py-3 rounded-lg font-medium hover:bg-crimson hover:text-white transition">
                      See More Top Resources →
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Featured Subjects - Enhanced Grid */}
        <section className="py-16 bg-ghost-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-h2 mb-3 font-poppins font-bold">Explore by Subject</h2>
              <p className="text-slate-gray text-lg max-w-2xl mx-auto">
                9 disciplines, 10 semesters, 1000+ resources. Find what you need in seconds.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {SUBJECTS.map((subject) => {
                // Map string icon names to actual components with specific animations
                const getIconWithAnimation = (iconName: string) => {
                  const baseClasses = "mx-auto transition-all duration-300";
                  
                  const iconMap: { [key: string]: { component: React.ReactNode; animation: string } } = {
                    'Atom': { 
                      component: <Atom size={48} className={`text-crimson ${baseClasses}`} strokeWidth={1.5} />,
                      animation: 'group-hover:animate-spin'
                    },
                    'TestTube2': { 
                      component: <TestTube2 size={48} className={`text-crimson ${baseClasses}`} strokeWidth={1.5} />,
                      animation: 'group-hover:scale-125'
                    },
                    'Divide': { 
                      component: <Divide size={48} className={`text-crimson ${baseClasses}`} strokeWidth={1.5} />,
                      animation: 'group-hover:rotate-180'
                    },
                    'Dna': { 
                      component: <Dna size={48} className={`text-crimson ${baseClasses}`} strokeWidth={1.5} />,
                      animation: 'group-hover:scale-110'
                    },
                    'BarChart3': { 
                      component: <BarChart3 size={48} className={`text-crimson ${baseClasses}`} strokeWidth={1.5} />,
                      animation: 'group-hover:animate-pulse'
                    },
                    'Leaf': { 
                      component: <Leaf size={48} className={`text-emerald-600 ${baseClasses}`} strokeWidth={1.5} />,
                      animation: 'group-hover:scale-110'
                    },
                    'Globe': { 
                      component: <Globe size={48} className={`text-blue-600 ${baseClasses}`} strokeWidth={1.5} />,
                      animation: 'group-hover:animate-spin'
                    },
                    'Sun': { 
                      component: <Sun size={48} className={`text-amber-500 ${baseClasses}`} strokeWidth={1.5} />,
                      animation: 'group-hover:animate-pulse'
                    },
                    'BookOpen': { 
                      component: <BookOpen size={48} className={`text-crimson ${baseClasses}`} strokeWidth={1.5} />,
                      animation: 'group-hover:scale-110'
                    },
                  };

                  const iconData = iconMap[iconName] || { 
                    component: <BookOpen size={48} className={`text-crimson ${baseClasses}`} strokeWidth={1.5} />,
                    animation: 'group-hover:scale-110'
                  };
                  
                  return iconData;
                };

                const { component: icon, animation } = getIconWithAnimation(subject.icon);

                return (
                  <Link
                    key={subject.name}
                    href={`/subject/${subject.name.replace(/\s+/g, '-').toLowerCase()}?type=question_paper`}
                  >
                    <div className="card hover:shadow-xl hover:border-crimson hover:scale-105 transition-all duration-300 cursor-pointer group text-center p-6 bg-white border border-slate-200">
                      {/* Animated Icon Container */}
                      <div className={`mb-4 flex items-center justify-center h-20 ${animation}`}>
                        {icon}
                      </div>

                      {/* Subject Name */}
                      <h3 className="font-bold text-slate-navy mb-2 group-hover:text-crimson transition">
                        {subject.name}
                      </h3>

                      {/* Hover CTA */}
                      <p className="text-small text-slate-gray group-hover:text-crimson transition font-medium">
                        Explore →
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Science Pulse */}
        <SciencePulse limit={3} showViewMore={true} />

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 mb-12 text-center">Why Choose IMSC Commons?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 bg-ghost-white rounded-lg border border-light-gray hover:shadow-lg transition">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-h3 text-slate-navy mb-3">Comprehensive Library</h3>
                <p className="text-slate-gray">
                  Access question papers and textbooks for all 10 semesters across multiple disciplines
                </p>
              </div>
              <div className="p-8 bg-ghost-white rounded-lg border border-light-gray hover:shadow-lg transition">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-h3 text-slate-navy mb-3">Active Discussions</h3>
                <p className="text-slate-gray">
                  Connect with peers, ask questions, and share insights in our vibrant discussion hub
                </p>
              </div>
              <div className="p-8 bg-ghost-white rounded-lg border border-light-gray hover:shadow-lg transition">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-h3 text-slate-navy mb-3">Community-Driven</h3>
                <p className="text-slate-gray">
                  Built by students for students - contribute your resources and help others learn
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-h2 mb-4">Join Our Community</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Be part of a movement to democratize access to quality education at CUSAT
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/discussions">
                <button className="bg-crimson text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition transform hover:scale-105">
                  Start Discussing
                </button>
              </Link>
              <Link href="/upload">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-slate-navy transition transform hover:scale-105">
                  Share Resources
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Floating Social Hub */}
        <SocialHub variant="floating" showCounter={true} />
      </main>
    </>
  );
}
