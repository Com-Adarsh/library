import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface RecentUpload {
  id: string;
  title: string;
  contributor: string;
  timestamp: string;
  subject: string;
}

export default function Footer() {
  const [recentUploads] = useState<RecentUpload[]>([]);

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200">
      {/* Transparency Log Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-navy mb-2">📊 Transparency Log</h3>
          <p className="text-slate-600 text-sm mb-6">
            Live record of the latest resources added to The IMSC Commons. 
            <span className="ml-2 text-crimson font-semibold">Real-time, verified contributions from our community.</span>
          </p>

          {/* Recent Uploads Grid */}
          <div className="grid gap-4">
            {recentUploads.length === 0 ? (
              <div className="bg-white rounded-lg p-8 border border-slate-200 text-center">
                <p className="text-slate-500 text-sm mb-2">No uploads yet</p>
                <p className="text-slate-400 text-xs">New contributions will appear here in real-time</p>
              </div>
            ) : (
              recentUploads.map((upload) => (
                <div
                  key={upload.id}
                  className="bg-white rounded-lg p-4 border border-slate-200 hover:border-crimson hover:shadow-md transition-all duration-300 flex items-start justify-between group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-navy group-hover:text-crimson transition-colors truncate">
                          {upload.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="text-xs bg-emerald/10 text-emerald px-2 py-1 rounded font-medium">
                            {upload.subject}
                          </span>
                          <span className="text-xs text-slate-500">
                            by <span className="font-semibold text-slate-600">{upload.contributor}</span>
                          </span>
                          <span className="text-xs text-slate-400 ml-auto">
                            {upload.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button className="p-2 hover:bg-crimson/10 rounded transition-colors text-slate-400 group-hover:text-crimson">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* View All Link */}
          <button className="mt-6 text-sm font-semibold text-crimson hover:text-crimson/80 flex items-center gap-2">
            View Complete Transparency Log →
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-8"></div>

        {/* Community Channels Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-crimson/5 border border-emerald-200 rounded-xl p-8 mb-8">
          <div className="text-center mb-6">
            <h4 className="font-bold text-slate-navy text-xl mb-2">🌟 Community Channels</h4>
            <p className="text-slate-600 text-sm">Stay connected with the IMSC community</p>
          </div>
          <div className="flex justify-center gap-6">
            <a
              href="https://whatsapp.com/channel/0029VaesYjiHgZWZT1NwWo1z"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="text-2xl">💬</span>
              WhatsApp Channel
            </a>
            <a
              href="https://www.instagram.com/sfi_imsc_subcommittee_cusat"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="text-2xl">📸</span>
              Instagram
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-8"></div>
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-bold text-slate-navy mb-4">About</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              The IMSC Commons is a democratic resource platform for students, by students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-navy mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-slate-600 hover:text-crimson transition">Home</a></li>
              <li><a href="/discussions" className="text-slate-600 hover:text-crimson transition">Discussions</a></li>
              <li><a href="/tools" className="text-slate-600 hover:text-crimson transition">Study Tools</a></li>
            </ul>
          </div>

          {/* Governance */}
          <div>
            <h4 className="font-bold text-slate-navy mb-4">Governance</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-crimson transition">Democratic Principles</a></li>
              <li><a href="#" className="text-slate-600 hover:text-crimson transition">Contribution Guidelines</a></li>
              <li><a href="#" className="text-slate-600 hover:text-crimson transition">Community Standards</a></li>
              <li><a href="#" className="text-slate-600 hover:text-crimson transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-navy mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <p className="text-slate-600">
                <span className="font-semibold">Email:</span> <br />
                <a href="mailto:sfiimscsubcommittee25@gmail.com" className="text-crimson hover:underline">sfiimscsubcommittee25@gmail.com</a>
              </p>
              <p className="text-slate-600">
                <span className="font-semibold">Managed by:</span> <br />
                SFI IMSC Sub-Committee
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-8"></div>

        {/* Final Footer */}
        <div className="text-center space-y-4">
          <div className="bg-gradient-to-r from-slate-navy to-crimson text-white rounded-lg p-6 mb-4">
            <h4 className="font-bold text-lg mb-2">🗳️ Connect with the Collective</h4>
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">The IMSC Commons is more than a repository—it is a community.</span> For live updates on campus politics, academic announcements, and student welfare initiatives, follow our vibrant <span className="text-emerald-300 font-bold text-lg">Community Channels</span> above. We believe in transparent, real-time communication as the backbone of a democratic campus.
            </p>
          </div>
          
          <p className="text-slate-600 text-sm">
            <span className="font-semibold">An Open-Access Resource for the Common Good.</span> Managed by the SFI IMSC Sub-Committee.
          </p>
          <p className="text-xs text-slate-500">
            🗳️ Democratic. 📚 Secular. 🤝 By Students, For Students.
          </p>
          <p className="text-xs text-slate-400 pt-2">
            Last updated: {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
