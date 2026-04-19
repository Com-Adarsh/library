import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Download, FileText, Clock, User } from 'lucide-react';
import { SEMESTERS, SUBJECTS } from '@/lib/constants';

export default function SemesterPage() {
  const router = useRouter();
  const { subject, semester } = router.query;

  // Find subject data
  const subjectData = SUBJECTS.find(
    (s) => s.name.replace(/\s+/g, '-').toLowerCase() === subject
  );

  // Find semester data
  const semesterData = SEMESTERS.find((s) => s.id === parseInt(semester as string));

  if (!subjectData || !semesterData) {
    return <div className="pt-20 text-center">Page not found</div>;
  }

  const resourceType = router.query.type === 'question_paper' ? 'Question Papers' : 'Textbooks';

  // Real data from database - empty until resources are uploaded
  const resources: any[] = [];

  return (
    <>
      <Head>
        <title>
          {subjectData.name} - {semesterData.name} | The IMSC Commons
        </title>
      </Head>

      <main className="min-h-screen pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-slate-navy to-slate-navy/80 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="mb-4">
              <Link href={`/subject/${subject}?type=${router.query.type}`} className="text-white hover:underline">
                ← Back to {subjectData.name}
              </Link>
            </div>
            <h1 className="text-h1 text-white">
              {subjectData.name} - {semesterData.name}
            </h1>
            <p className="text-lg opacity-90">{resourceType}</p>
          </div>
        </section>

        {/* Resources List */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 mb-8">Available Resources ({resources.length})</h2>

            {resources.length === 0 ? (
              <div className="text-center py-12 bg-ghost-white rounded-lg">
                <FileText size={48} className="text-slate-gray mx-auto mb-4 opacity-50" />
                <p className="text-slate-gray text-lg mb-6">No resources available yet</p>
                <Link href="/upload">
                  <button className="bg-crimson text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">
                    Be the first to contribute
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="card hover:shadow-lg transition">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-h3 text-slate-navy mb-2">{resource.title}</h3>
                        <div className="flex flex-wrap gap-6 text-small text-slate-gray">
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            {resource.uploadedBy}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            {resource.uploadedAt}
                          </div>
                          <div className="flex items-center gap-2">
                            <Download size={16} />
                            {resource.downloads} downloads
                          </div>
                        </div>
                      </div>
                      <button className="bg-crimson text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition flex items-center gap-2 whitespace-nowrap">
                        <Download size={18} />
                        Download
                      </button>
                    </div>
                    <div className="mt-4 text-small text-slate-gray">
                      PDF • {resource.size} MB
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Upload CTA */}
        <section className="py-12 bg-ghost-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-h2 mb-4">Have Resources to Share?</h2>
            <Link href="/upload">
              <button className="bg-crimson text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition">
                Upload Now
              </button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
