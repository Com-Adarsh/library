import React, { useState } from 'react';
import Head from 'next/head';
import { MessageSquare, Plus, Search, Eye, MessageCircle, User, TrendingUp, CheckCircle, HelpCircle, Lightbulb, AlertCircle, Clock } from 'lucide-react';
import { SUBJECTS } from '@/lib/constants';

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  subject: string;
  replies: number;
  views: number;
  createdAt: string;
  tags: string[];
  category: 'general' | 'help' | 'resources' | 'tips' | 'important';
  isAnswered: boolean;
  isPinned: boolean;
  isHelpful: number;
}

export default function Discussions() {
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: '1',
      title: 'Master Differential Equations: Step-by-Step Guide',
      content: 'Complete walkthrough of integration techniques used in CUSAT exams. Includes practice problems.',
      author: 'Senior Mentor - Physics',
      subject: 'Mathematics',
      replies: 24,
      views: 512,
      createdAt: '2024-03-28',
      tags: ['#DE', '#Important'],
      category: 'tips',
      isAnswered: true,
      isPinned: true,
      isHelpful: 47,
    },
    {
      id: '2',
      title: 'Question Paper Patterns: Physics Sem 5 (Last 5 Years)',
      content: 'Analyzed all question papers from 2019-2024. Key topics covered in detail.',
      author: 'Adarsh K.',
      subject: 'Physics',
      replies: 18,
      views: 289,
      createdAt: '2024-04-05',
      tags: ['#QP', '#Pattern', '#Sem5'],
      category: 'resources',
      isAnswered: true,
      isPinned: false,
      isHelpful: 32,
    },
    {
      id: '3',
      title: 'Best YouTube Channels for Quantum Mechanics',
      content: 'Need recommendations for clear explanations of QM concepts.',
      author: 'Priya S.',
      subject: 'Physics',
      replies: 8,
      views: 145,
      createdAt: '2024-04-10',
      tags: ['#Resources', '#QM'],
      category: 'help',
      isAnswered: false,
      isPinned: false,
      isHelpful: 12,
    },
    {
      id: '4',
      title: 'Chemistry Practical Exams: What to Prepare',
      content: 'Anyone have experience with practical exams? What were the experiments?',
      author: 'Ravi T.',
      subject: 'Chemistry',
      replies: 6,
      views: 98,
      createdAt: '2024-04-11',
      tags: ['#Practical', '#Help'],
      category: 'help',
      isAnswered: false,
      isPinned: false,
      isHelpful: 8,
    },
  ]);

  const [showNewThread, setShowNewThread] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    subject: '',
    category: 'general' as const,
  });

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (newThread.title && newThread.content && newThread.subject) {
      const thread: Thread = {
        id: Date.now().toString(),
        title: newThread.title,
        content: newThread.content,
        author: 'You',
        subject: newThread.subject,
        replies: 0,
        views: 0,
        createdAt: new Date().toISOString().split('T')[0],
        tags: [`#${newThread.subject.slice(0, 3)}`],
        category: newThread.category,
        isAnswered: false,
        isPinned: false,
        isHelpful: 0,
      };
      setThreads([thread, ...threads]);
      setNewThread({ title: '', content: '', subject: '', category: 'general' });
      setShowNewThread(false);
    }
  };

  let filtered = threads.filter((thread) => {
    const matchesSearch =
      thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || thread.subject === selectedSubject;
    const matchesCategory = !selectedCategory || thread.category === selectedCategory;
    return matchesSearch && matchesSubject && matchesCategory;
  });

  // Sort threads
  if (sortBy === 'popular') {
    filtered.sort((a, b) => b.views - a.views);
  } else if (sortBy === 'mostReplies') {
    filtered.sort((a, b) => b.replies - a.replies);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'tips':
        return { icon: Lightbulb, label: 'Senior Tips', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'resources':
        return { icon: TrendingUp, label: 'Resources', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'important':
        return { icon: AlertCircle, label: 'Important', color: 'bg-red-50 text-red-700 border-red-200' };
      case 'help':
        return { icon: HelpCircle, label: 'Need Help', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      default:
        return { icon: MessageSquare, label: 'General', color: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const stats = {
    totalThreads: threads.length,
    answered: threads.filter(t => t.isAnswered).length,
    popular: threads.reduce((max, t) => Math.max(max, t.views), 0),
  };

  return (
    <>
      <Head>
        <title>Discussion Forum - The IMSC Commons</title>
      </Head>

      <main className="min-h-screen pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-slate-navy to-slate-navy/80 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-h1 text-white flex items-center gap-4 mb-2">
              <MessageSquare size={40} />
              Discussion Forum
            </h1>
            <p className="text-lg opacity-90">Connect, share knowledge, and learn from the IMSC community</p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-ghost-white py-6 border-b border-light-gray">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-crimson">{stats.totalThreads}</div>
                <p className="text-slate-gray text-small">Total Discussions</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{stats.answered}</div>
                <p className="text-slate-gray text-small">Answered</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.popular}+</div>
                <p className="text-slate-gray text-small">Most Viewed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Create Thread Button */}
        <section className="bg-white py-6 border-b border-light-gray">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <button
              onClick={() => setShowNewThread(!showNewThread)}
              className="bg-crimson text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition flex items-center gap-2"
            >
              <Plus size={20} />
              Start New Discussion
            </button>
            <p className="text-slate-gray text-small">Have a question? Share your insights!</p>
          </div>
        </section>

        {/* New Thread Form */}
        {showNewThread && (
          <section className="bg-white border-b border-light-gray py-8">
            <div className="container mx-auto px-4 max-w-3xl">
              <form onSubmit={handleCreateThread} className="space-y-4">
                <div>
                  <label className="block text-slate-navy font-medium mb-2">
                    Discussion Title <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="text"
                    value={newThread.title}
                    onChange={(e) => setNewThread((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="What's your question or topic? Be specific for better responses..."
                    className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-navy font-medium mb-2">
                      Subject <span className="text-crimson">*</span>
                    </label>
                    <select
                      value={newThread.subject}
                      onChange={(e) => setNewThread((prev) => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                    >
                      <option value="">Select a subject...</option>
                      {SUBJECTS.map((subject) => (
                        <option key={subject.name} value={subject.name}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-navy font-medium mb-2">
                      Category <span className="text-crimson">*</span>
                    </label>
                    <select
                      value={newThread.category}
                      onChange={(e) => setNewThread((prev) => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                    >
                      <option value="general">General Discussion</option>
                      <option value="help">Need Help</option>
                      <option value="resources">Share Resources</option>
                      <option value="tips">Study Tips</option>
                      <option value="important">Important Info</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-navy font-medium mb-2">
                    Description <span className="text-crimson">*</span>
                  </label>
                  <textarea
                    value={newThread.content}
                    onChange={(e) => setNewThread((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Provide details, context, and any relevant information..."
                    rows={5}
                    className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-crimson text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
                  >
                    Post Discussion
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewThread(false)}
                    className="border-2 border-light-gray px-6 py-2 rounded-lg font-medium hover:bg-ghost-white transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* Search & Filter */}
        <section className="bg-white py-6 border-b border-light-gray sticky top-20 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-gray" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search discussions by keyword..."
                  className="w-full pl-10 pr-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                />
              </div>

              {/* Filters & Sort */}
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                >
                  <option value="">All Subjects</option>
                  {SUBJECTS.map((subject) => (
                    <option key={subject.name} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                >
                  <option value="">All Categories</option>
                  <option value="general">General</option>
                  <option value="help">Need Help</option>
                  <option value="resources">Resources</option>
                  <option value="tips">Senior Tips</option>
                  <option value="important">Important</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                >
                  <option value="recent">Latest</option>
                  <option value="popular">Most Viewed</option>
                  <option value="mostReplies">Most Replies</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Threads List */}
        <section className="py-8 bg-ghost-white min-h-screen">
          <div className="container mx-auto px-4">
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg border border-light-gray">
                <HelpCircle size={48} className="text-slate-gray mx-auto mb-4 opacity-40" />
                <p className="text-slate-gray text-lg">No discussions match your search</p>
                <p className="text-slate-gray text-small mt-2">Try different filters or create a new discussion!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((thread) => {
                  const categorybadge = getCategoryBadge(thread.category);
                  const CategoryIcon = categorybadge.icon;
                  return (
                    <div
                      key={thread.id}
                      className={`card hover:shadow-lg transition cursor-pointer border-l-4 ${
                        thread.isPinned ? 'border-l-crimson bg-white' : 'border-l-light-gray hover:border-l-crimson'
                      }`}
                    >
                      <div className="flex flex-wrap items-start gap-4 mb-3">
                        <div className={`${categorybadge.color} border px-3 py-1 rounded-full flex items-center gap-2 text-small font-medium`}>
                          <CategoryIcon size={16} />
                          {categorybadge.label}
                        </div>
                        {thread.isAnswered && (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full flex items-center gap-2 text-small font-medium">
                            <CheckCircle size={16} />
                            Answered
                          </div>
                        )}
                        {thread.isPinned && (
                          <div className="bg-crimson/10 border border-crimson text-crimson px-3 py-1 rounded-full text-small font-medium">
                            📌 Pinned
                          </div>
                        )}
                      </div>

                      <h3 className="text-h3 text-slate-navy mb-2 hover:text-crimson transition">
                        {thread.title}
                      </h3>
                      <p className="text-slate-gray mb-4 line-clamp-2">{thread.content}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {thread.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-slate-100 text-slate-600 text-small px-3 py-1 rounded-full hover:bg-crimson/10 hover:text-crimson transition"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-light-gray text-small text-slate-gray">
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span className="truncate">{thread.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          {thread.createdAt}
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye size={16} />
                          <span>{thread.views} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle size={16} />
                          <span>{thread.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp size={16} />
                          <span>{thread.isHelpful} helpful</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
