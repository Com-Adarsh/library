import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Filter, FileText, Download, User, Clock } from 'lucide-react';
import { SEMESTERS, SUBJECTS } from '@/lib/constants';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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
  const isTextbook = resourceType === 'textbook';

  // Mock textbook data - replace with actual API call
  const textbooks = [
    {
      id: 1,
      title: `${subjectData.name} Fundamentals - 3rd Edition`,
      author: 'Dr. John Smith',
      size: 12.5,
      uploadedBy: 'Adarsh Kumar',
      uploadedAt: '2025-01-15',
      downloads: 324,
      description: 'Comprehensive textbook covering core concepts and applications'
    },
    {
      id: 2,
      title: `${subjectData.name} Advanced Topics`,
      author: 'Prof. Sarah Chen',
      size: 8.3,
      uploadedBy: 'Priya Patel',
      uploadedAt: '2025-02-20',
      downloads: 187,
      description: 'Advanced level content for in-depth understanding'
    },
    {
      id: 3,
      title: `${subjectData.name} Problem Solving Workbook`,
      author: 'Dr. Michael Ross',
      size: 5.7,
      uploadedBy: 'Nikhil Sharma',
      uploadedAt: '2025-03-10',
      downloads: 256,
      description: 'Practical problems and solutions with explanations'
    },
  ];

  return (
    <>
      <Head>
        <title>{subjectData.name} - {displayType} | The IMSC Commons</title>
      </Head>

      <Navigation />

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

        {/* Filter Section - Only for Question Papers */}
        {!isTextbook && (
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
        )}

        {/* Conditional Content: Semesters Grid (for Question Papers) OR Textbooks List (for Textbooks) */}
        {!isTextbook ? (
          // QUESTION PAPERS - Show Semester Grid
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
        ) : (
          // TEXTBOOKS - Direct Textbooks List (No Semester Organization)
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-h2 font-bold text-slate-navy mb-2">Available Textbooks</h2>
                <p className="text-slate-gray">Find comprehensive textbooks and reference materials for {subjectData.name}</p>
              </div>

              {textbooks.length === 0 ? (
                <div className="text-center py-12 bg-ghost-white rounded-lg">
                  <FileText size={48} className="text-slate-gray mx-auto mb-4 opacity-50" />
                  <p className="text-slate-gray text-lg mb-6">No textbooks available yet</p>
                  <Link href="/upload">
                    <button className="bg-crimson text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition">
                      Contribute a Textbook
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {textbooks.map((textbook) => (
                    <div key={textbook.id} className="card hover:shadow-lg hover:border-crimson transition">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-h3 font-bold text-slate-navy mb-2">{textbook.title}</h3>
                          <p className="text-slate-gray mb-4">{textbook.description}</p>
                          
                          <div className="flex flex-wrap gap-6 text-small text-slate-gray mb-4">
                            <div className="flex items-center gap-2">
                              <FileText size={16} className="text-crimson" />
                              Author: {textbook.author}
                            </div>
                            <div className="flex items-center gap-2">
                              <User size={16} className="text-slate-navy" />
                              Uploaded by: {textbook.uploadedBy}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-slate-navy" />
                              {new Date(textbook.uploadedAt).toLocaleDateString('en-IN')}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-small">
                            <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-gray">
                              {textbook.size} MB
                            </span>
                            <span className="flex items-center gap-1 text-emerald-600 font-medium">
                              <Download size={16} />
                              {textbook.downloads} downloads
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <button className="bg-crimson text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition flex items-center gap-2">
                            <Download size={16} />
                            Download
                          </button>
                          <button className="bg-slate-100 text-slate-navy px-6 py-2 rounded-lg font-medium hover:bg-slate-200 transition">
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

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

        <Footer />
      </main>
    </>
  );
}
