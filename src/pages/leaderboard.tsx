import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Trophy, Medal, Users, TrendingUp, Crown, Loader, AlertCircle } from 'lucide-react';

interface Contributor {
  id: string;
  name: string;
  role: string;
  contributions: number;
  resources: number;
  discussions: number;
  helpful: number;
  avatar: string;
  badge: 'gold' | 'silver' | 'bronze' | 'none';
  joinedDate: string;
}

export default function Leaderboard() {
  const [contributors] = useState<Contributor[]>([
    {
      id: '1',
      name: '🏆 Adarsh K.',
      role: 'Senior Mentor',
      contributions: 42,
      resources: 28,
      discussions: 85,
      helpful: 156,
      avatar: '👨‍💼',
      badge: 'gold',
      joinedDate: '2023-06-15',
    },
    {
      id: '2',
      name: 'Priya S.',
      role: 'Active Contributor',
      contributions: 35,
      resources: 18,
      discussions: 62,
      helpful: 124,
      avatar: '👩‍🔬',
      badge: 'silver',
      joinedDate: '2023-08-22',
    },
    {
      id: '3',
      name: 'Ravi T.',
      role: 'Active Contributor',
      contributions: 28,
      resources: 15,
      discussions: 48,
      helpful: 98,
      avatar: '👨‍🎓',
      badge: 'bronze',
      joinedDate: '2023-09-10',
    },
    {
      id: '4',
      name: 'Maya Patel',
      role: 'Contributor',
      contributions: 22,
      resources: 12,
      discussions: 35,
      helpful: 76,
      avatar: '👩‍🏫',
      badge: 'none',
      joinedDate: '2023-10-05',
    },
    {
      id: '5',
      name: 'Nikhil Roy',
      role: 'Contributor',
      contributions: 18,
      resources: 10,
      discussions: 28,
      helpful: 64,
      avatar: '👨‍💻',
      badge: 'none',
      joinedDate: '2023-11-12',
    },
    {
      id: '6',
      name: 'Asha Devi',
      role: 'Contributor',
      contributions: 15,
      resources: 8,
      discussions: 22,
      helpful: 52,
      avatar: '👩‍🔧',
      badge: 'none',
      joinedDate: '2023-12-01',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('contributions');
  const [filterRole, setFilterRole] = useState('');

  useEffect(() => {
    // Simulate fetching leaderboard data
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, []);

  let filtered = contributors;
  if (filterRole) {
    filtered = filtered.filter((c) =>
      c.role.toLowerCase().includes(filterRole.toLowerCase())
    );
  }

  // Sort contributors
  filtered.sort((a, b) => {
    if (sortBy === 'contributions') return b.contributions - a.contributions;
    if (sortBy === 'resources') return b.resources - a.resources;
    if (sortBy === 'helpful') return b.helpful - a.helpful;
    return 0;
  });

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'gold':
        return { icon: Crown, color: 'text-yellow-500', label: 'Gold' };
      case 'silver':
        return { icon: Medal, color: 'text-gray-400', label: 'Silver' };
      case 'bronze':
        return { icon: Medal, color: 'text-orange-600', label: 'Bronze' };
      default:
        return { icon: null, color: '', label: '' };
    }
  };

  const stats = {
    totalContributors: contributors.length,
    totalResources: contributors.reduce((sum, c) => sum + c.resources, 0),
    totalDiscussions: contributors.reduce((sum, c) => sum + c.discussions, 0),
  };

  return (
    <>
      <Head>
        <title>Top Contributors - The IMSC Commons</title>
        <meta name="description" content="Recognize and celebrate the top contributors to The IMSC Commons" />
      </Head>

      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-navy via-slate-navy/90 to-slate-navy text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <Trophy size={48} className="text-yellow-400" />
              <h1 className="text-h1">Community Leaderboard</h1>
            </div>
            <p className="text-lg opacity-90 max-w-2xl">
              Celebrating the exceptional contributors who are making The IMSC Commons a powerhouse of knowledge
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="bg-ghost-white py-8 border-b border-light-gray">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-light-gray text-center hover:shadow-md transition">
                <Users className="w-8 h-8 text-crimson mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-navy">{stats.totalContributors}+</div>
                <p className="text-slate-gray mt-2">Active Contributors</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-light-gray text-center hover:shadow-md transition">
                <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-navy">{stats.totalResources}+</div>
                <p className="text-slate-gray mt-2">Resources Contributed</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-light-gray text-center hover:shadow-md transition">
                <Medal className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-navy">{stats.totalDiscussions}+</div>
                <p className="text-slate-gray mt-2">Discussions Helped</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Sort */}
        <section className="bg-white py-6 border-b border-light-gray sticky top-20 z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                >
                  <option value="contributions">Total Contributions</option>
                  <option value="resources">Resources Uploaded</option>
                  <option value="helpful">Helpful Votes</option>
                </select>

                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                >
                  <option value="">All Roles</option>
                  <option value="Senior">Senior Mentor</option>
                  <option value="Active">Active Contributor</option>
                  <option value="Contributor">Contributor</option>
                </select>
              </div>
              <div className="text-slate-gray text-small">
                Showing {filtered.length} of {contributors.length} contributors
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Table */}
        {loading ? (
          <section className="py-12 text-center">
            <Loader className="animate-spin w-8 h-8 mx-auto text-crimson" />
            <p className="text-slate-gray mt-4">Loading leaderboard...</p>
          </section>
        ) : (
          <section className="py-8 bg-ghost-white min-h-screen">
            <div className="container mx-auto px-4">
              {filtered.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-light-gray">
                  <AlertCircle size={48} className="text-slate-gray mx-auto mb-4 opacity-40" />
                  <p className="text-slate-gray text-lg">No contributors found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((contributor, index) => {
                    const badgeInfo = getBadgeIcon(contributor.badge);
                    const BadgeIcon = badgeInfo.icon;
                    return (
                      <div
                        key={contributor.id}
                        className={`card flex items-center justify-between p-6 hover:shadow-lg transition border-l-4 ${
                          index === 0
                            ? 'border-l-yellow-500 bg-yellow-50/50'
                            : index === 1
                            ? 'border-l-gray-400 bg-gray-50/50'
                            : index === 2
                            ? 'border-l-orange-600 bg-orange-50/50'
                            : 'border-l-light-gray'
                        }`}
                      >
                        {/* Rank & Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-center">
                            <div className="w-12 h-12 rounded-full bg-crimson/10 text-crimson font-bold text-lg flex items-center justify-center">
                              {index + 1}
                            </div>
                          </div>

                          <div className="text-2xl">{contributor.avatar}</div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-h3 text-slate-navy">{contributor.name}</h3>
                              {BadgeIcon && (
                                <div title={badgeInfo.label}>
                                  <BadgeIcon size={20} className={badgeInfo.color} />
                                </div>
                              )}
                            </div>
                            <p className="text-slate-gray text-small">{contributor.role}</p>
                            <p className="text-slate-gray text-xs mt-1">Joined {contributor.joinedDate}</p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden md:grid grid-cols-4 gap-6 ml-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-crimson">{contributor.contributions}</div>
                            <p className="text-slate-gray text-small">Total</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-600">{contributor.resources}</div>
                            <p className="text-slate-gray text-small">Resources</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{contributor.discussions}</div>
                            <p className="text-slate-gray text-small">Discussions</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{contributor.helpful}</div>
                            <p className="text-slate-gray text-small">Helpful</p>
                          </div>
                        </div>

                        {/* Mobile Stats */}
                        <div className="md:hidden text-right">
                          <div className="flex gap-2">
                            <div className="text-center">
                              <div className="text-lg font-bold text-crimson">{contributor.contributions}</div>
                              <p className="text-slate-gray text-xs">Contrib</p>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-emerald-600">{contributor.helpful}</div>
                              <p className="text-slate-gray text-xs">Helpful</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Join CTA */}
        <section className="bg-slate-navy text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-h2 mb-4">Want to Join the Leaderboard?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Every contribution matters! Share your resources, answer questions, and help fellow students. Together, we're building the best academic platform for CUSAT IMSC students.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/upload"
                className="bg-crimson text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Share Resources
              </a>
              <a
                href="/discussions"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-slate-navy transition"
              >
                Join Discussions
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
