import { Gauge, BookOpen } from 'lucide-react';
import Navigation from '../../components/Navigation';

export default function Tools() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ghost-white to-slate-50">
      <Navigation />

      {/* Hero */}
      <div className="relative h-80 bg-gradient-to-br from-slate-navy to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="flex items-center gap-3 mb-4">
            <Gauge className="w-8 h-8 text-emerald" />
            <h1 className="text-5xl font-bold">Study Tools</h1>
          </div>
          <p className="text-xl text-ghost-white/90">Everything you need for productive studying</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Study Tools Content */}
        <div className="mb-16">
          <div className="bg-white rounded-xl p-10 shadow-lg border border-slate-200">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-slate-navy">Study Tools</h2>
              <p className="text-slate-600 text-sm max-w-3xl">
                Our study tools section is being updated. You can still access uploads and resources while we improve the toolset.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mt-8">
                <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-navy mb-2">Resource Center</h3>
                  <p className="text-slate-600 text-sm">Search and download papers, textbooks, and notes for every semester.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-navy mb-2">Community Help</h3>
                  <p className="text-slate-600 text-sm">Ask questions, collaborate with peers, and learn from discussion threads.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Tips Card */}
        <div className="bg-gradient-to-r from-crimson/10 to-emerald/10 rounded-xl p-8 border border-crimson/20">
          <div className="flex gap-4">
            <BookOpen className="w-6 h-6 text-crimson flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-slate-navy mb-2">💡 Pro Tips for Effective Study Sessions</h3>
              <ul className="space-y-2 text-slate-700">
                <li>✓ Use keyboard shortcuts: <code className="bg-slate-200 px-2 py-1 rounded text-sm">Enter</code> for =, <code className="bg-slate-200 px-2 py-1 rounded text-sm">Backspace</code> for delete, <code className="bg-slate-200 px-2 py-1 rounded text-sm">Esc</code> to clear</li>
                <li>✓ Keep the calculator open while reading PDFs or question papers</li>
                <li>✓ Calculation history is displayed below for your reference</li>
                <li>✓ Use Scientific notation for very large or small numbers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-navy mb-6">🚀 Coming Soon</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Note-Taking Pad', desc: 'Quick notes while studying' },
              { title: 'Formula Sheet', desc: 'Quick reference for common formulas' },
              { title: 'Unit Converter', desc: 'Convert between different units' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-navy mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
                <div className="mt-4 text-xs text-slate-500">🔜 Coming Soon</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 bg-slate-navy text-ghost-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            An Open-Access Resource for the Common Good. Managed by the SFI IMSC Sub-Committee.
          </p>
        </div>
      </div>
    </div>
  );
}
