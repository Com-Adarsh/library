import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Filter, FileText } from 'lucide-react';
import { SEMESTERS, SUBJECTS } from '@/lib/constants';

export default function SubjectPage() {
  const router = useRouter();
  const { subject } = router.query;
  const [filterType, setFilterType] = useState('all');

  // Find the subject details
  const subjectData = SUBJECTS.find(
    (s) => s.name.replace(/\s+/g, '-').toLowerCase() === subject
  );

  if (!subjectData) {
    return <div className="pt-20 text-center">Subject not found</div>;
  }

  const resourceType = router.query.type as string;
  const displayType = resourceType === 'question_paper' ? 'Question Papers' : 'Textbooks';

  return (
    <>
      <Head>
        <title>{subjectData.name} - {displayType} | The IMSC Commons</title>
      </Head>

      <main className="min-h-screen pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-slate-navy to-slate-navy/80 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">📚</span>
              <div>
                <h1 className="text-h1 text-white">{subjectData.name}</h1>
                <p className="text-lg opacity-90">{displayType} Repository</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="bg-ghost-white py-6 border-b border-light-gray">
          <div className="container mx-auto px-4 flex items-center gap-4 flex-wrap">
            <Filter size={20} className="text-slate-navy" />
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterType === 'all'
                  ? 'bg-crimson text-white'
                  : 'bg-white border border-light-gray text-slate-navy hover:border-crimson'
              }`}
            >
              All Semesters
            </button>
            <button
              onClick={() => setFilterType('odd')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterType === 'odd'
                  ? 'bg-crimson text-white'
                  : 'bg-white border border-light-gray text-slate-navy hover:border-crimson'
              }`}
            >
              Odd Semesters
            </button>
            <button
              onClick={() => setFilterType('even')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filterType === 'even'
                  ? 'bg-crimson text-white'
                  : 'bg-white border border-light-gray text-slate-navy hover:border-crimson'
              }`}
            >
              Even Semesters
            </button>
          </div>
        </section>

        {/* Semesters Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SEMESTERS.filter((sem) =>
                filterType === 'all' || sem.type === (filterType === 'odd' ? 'Odd' : 'Even')
              ).map((semester) => (
                <Link
                  key={semester.id}
                  href={`/subject/${subject}/semester/${semester.id}?type=${resourceType}`}
                >
                  <div className="card cursor-pointer transform hover:scale-105 transition-transform hover:border-crimson">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-crimson text-white rounded-lg p-3">
                        <FileText size={32} />
                      </div>
                      <div>
                        <h3 className="text-h3 font-bold text-slate-navy">{semester.name}</h3>
                        <p className="text-slate-gray">{semester.type} Semester</p>
                      </div>
                    </div>
                    <p className="text-small text-slate-gray">
                      Click to view all {displayType.toLowerCase()} for this semester
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-small text-slate-gray">0 resources</span>
                      <span className="text-crimson font-medium">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Upload CTA */}
        <section className="py-12 bg-ghost-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-h2 mb-4">Missing Resources?</h2>
            <p className="text-body text-slate-gray mb-6 max-w-2xl mx-auto">
              Help the community by uploading relevant {displayType.toLowerCase()} for {subjectData.name}
            </p>
            <Link href="/upload">
              <button className="bg-crimson text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition">
                Contribute Now
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
