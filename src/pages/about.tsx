import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Users, BookOpen, MessageSquare, Heart, Globe, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Democratic Access',
      description: 'Education is a public good, not a commodity. We provide free, 24/7 access to all resources.',
    },
    {
      icon: Users,
      title: 'Student-Governed',
      description: 'By students, for students. Managed by the SFI IMSC Sub-Committee with community participation.',
    },
    {
      icon: Globe,
      title: 'Secular & Inclusive',
      description: 'A secular, inclusive platform that welcomes all IMSC students regardless of background.',
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Library',
      description: 'Curated textbooks, question papers, and study materials across all disciplines.',
    },
    {
      icon: MessageSquare,
      title: 'Community Dialogue',
      description: 'Open discussion forums for peer-to-peer learning and knowledge sharing.',
    },
    {
      icon: Zap,
      title: 'Science-Driven',
      description: 'Real-time scientific news and intellectual engagement for the academic community.',
    },
  ];

  return (
    <>
      <Head>
        <title>About - The IMSC Commons</title>
        <meta name="description" content="Learn about the SFI IMSC Sub-Committee Digital Library at CUSAT" />
      </Head>

      <Navigation />

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-navy to-slate-navy/80 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-h1 mb-4 font-poppins font-bold">The IMSC Commons</h1>
            <p className="text-xl opacity-90">
              A Secular, Democratic Digital Library at CUSAT
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-h2 mb-6 text-crimson font-bold font-poppins">Our Mission</h2>
              <div className="space-y-6 text-lg text-slate-gray">
                <p>
                  <strong>The IMSC Commons</strong> is a secular, student-governed digital repository managed by the <strong>SFI IMSC Sub-Committee at CUSAT</strong>. We exist to ensure that <strong>education remains a public right, not a privilege</strong>.
                </p>
                <p>
                  Situated at the heart of the Cochin University of Science and Technology, this platform stands as a testament to the power of collective action. We believe in:
                </p>
                <ul className="space-y-3 ml-6">
                  <li>✓ <strong>Democratic Access:</strong> Free, 24/7 access to academic resources for all IMSC students</li>
                  <li>✓ <strong>Academic Integrity:</strong> Curated, peer-reviewed materials verified by the community</li>
                  <li>✓ <strong>Scientific Progress:</strong> Real-time updates on cutting-edge research and discoveries</li>
                  <li>✓ <strong>Collective Learning:</strong> Open dialogue and peer support through community discussions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values - Grid */}
        <section className="py-16 bg-ghost-white">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 mb-12 text-center font-bold font-poppins">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="card p-8 bg-white border border-slate-200 hover:shadow-lg hover:border-crimson transition group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-crimson/10 flex items-center justify-center group-hover:bg-crimson group-hover:text-white transition">
                        <Icon size={24} className="text-crimson group-hover:text-white" />
                      </div>
                      <h3 className="text-h3 text-slate-navy group-hover:text-crimson transition font-semibold">{value.title}</h3>
                    </div>
                    <p className="text-slate-gray">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 mb-12 text-center font-bold font-poppins">Impact by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Active Students', value: '500+' },
                { label: 'Resources', value: '1000+' },
                { label: 'Discussions', value: '2000+' },
                { label: 'Contributors', value: '50+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-6 bg-ghost-white rounded-lg border border-slate-200 hover:shadow-md transition">
                  <div className="text-4xl font-bold text-crimson mb-2">{stat.value}</div>
                  <div className="text-slate-gray font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Democratic Principles */}
        <section className="py-16 bg-slate-navy text-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-h2 mb-8 font-bold font-poppins">Democratic Principles</h2>
            <div className="space-y-4 text-lg opacity-95">
              <p>
                We operate on principles of democratic governance and secular values:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🗳️</span>
                  <div>
                    <strong>Democratic:</strong> Decisions are made collectively by the IMSC community
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✊</span>
                  <div>
                    <strong>Secular & Inclusive:</strong> We welcome all students regardless of caste, creed, or religion
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <strong>Transparent:</strong> All content moderation policies are open to community scrutiny
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <strong>Academic:</strong> We prioritize intellectual rigor and verified knowledge
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-h2 mb-6 font-bold font-poppins">Connect With Us</h2>
            <p className="text-lg text-slate-gray mb-8">
              Have questions, suggestions, or want to contribute? Reach out to the SFI IMSC Sub-Committee.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-slate-gray mb-2 font-medium">Email:</p>
                <a
                  href="mailto:sfiimscsubcommittee25@gmail.com"
                  className="text-2xl font-bold text-crimson hover:underline"
                >
                  sfiimscsubcommittee25@gmail.com
                </a>
              </div>

              <div className="flex items-center justify-center gap-4 flex-wrap mt-6 pt-6 border-t border-light-gray">
                <a
                  href="https://www.whatsapp.com/channel/0029VaesYjiHgZWZT1NwWo1z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition flex items-center gap-2"
                >
                  💬 WhatsApp Channel
                </a>
                <span className="text-light-gray">•</span>
                <a
                  href="https://www.instagram.com/sfi_imsc_subcommittee_cusat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700 font-medium transition flex items-center gap-2"
                >
                  📸 Instagram
                </a>
              </div>
            </div>

            <div className="bg-ghost-white p-8 rounded-lg border border-slate-200">
              <p className="text-slate-navy font-bold mb-2 text-lg">Made by Students for Students</p>
              <p className="text-slate-gray">
                Part of the broader SFI movement for democratic, secular, and quality education at CUSAT.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-crimson text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-h2 mb-6 font-bold font-poppins">Join the Movement</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Help us democratize access to quality education. Contribute your resources or participate in discussions today.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/upload">
                <button className="bg-white text-crimson px-8 py-3 rounded-lg font-bold hover:bg-ghost-white transition transform hover:scale-105">
                  Upload Resources
                </button>
              </Link>
              <Link href="/discussions">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-crimson transition transform hover:scale-105">
                  Join Discussions
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
