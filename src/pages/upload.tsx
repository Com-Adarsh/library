import React, { useState } from 'react';
import Head from 'next/head';
import { Upload as UploadIcon, X } from 'lucide-react';
import { SUBJECTS, SEMESTERS, CATEGORIES } from '@/lib/constants';

export default function Upload() {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    semester: '',
    category: '',
    description: '',
    file: null as File | null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf' && file.size <= 50 * 1024 * 1024) {
      setFormData((prev) => ({
        ...prev,
        file,
      }));
    } else {
      alert('Please select a PDF file (max 50MB)');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.subject || !formData.semester || !formData.category || !formData.file) {
      alert('Please fill in all required fields');
      return;
    }

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    alert('File uploaded successfully! It will be reviewed by moderators.');
    setFormData({
      title: '',
      subject: '',
      semester: '',
      category: '',
      description: '',
      file: null,
    });
    setUploadProgress(0);
  };

  return (
    <>
      <Head>
        <title>Upload - The IMSC Commons</title>
      </Head>

      <main className="min-h-screen pt-20">
        {/* Header */}
        <section className="bg-gradient-to-r from-slate-navy to-slate-navy/80 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-h1 text-white flex items-center gap-4 mb-2">
              <UploadIcon size={40} />
              Contributor Portal
            </h1>
            <p className="text-lg opacity-90">Share educational resources with the community</p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 bg-ghost-white min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border border-light-gray">
                {/* Title Field */}
                <div className="mb-6">
                  <label className="block text-slate-navy font-medium mb-2">
                    Document Title <span className="text-crimson">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Mid-Semester Physics Exam 2024"
                    className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                  />
                </div>

                {/* Subject Field */}
                <div className="mb-6">
                  <label className="block text-slate-navy font-medium mb-2">
                    Subject <span className="text-crimson">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
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

                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Semester Field */}
                  <div>
                    <label className="block text-slate-navy font-medium mb-2">
                      Semester <span className="text-crimson">*</span>
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                    >
                      <option value="">Select semester...</option>
                      {SEMESTERS.map((sem) => (
                        <option key={sem.id} value={sem.id}>
                          {sem.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Field */}
                  <div>
                    <label className="block text-slate-navy font-medium mb-2">
                      Category <span className="text-crimson">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                    >
                      <option value="">Select category...</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description Field */}
                <div className="mb-6">
                  <label className="block text-slate-navy font-medium mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add any relevant notes or details about this resource..."
                    rows={4}
                    className="w-full px-4 py-2 border border-light-gray rounded-lg focus:outline-none focus:border-crimson"
                  />
                </div>

                {/* File Upload */}
                <div className="mb-8">
                  <label className="block text-slate-navy font-medium mb-4">
                    PDF File <span className="text-crimson">*</span>
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
                      isDragging
                        ? 'border-crimson bg-red-50'
                        : 'border-light-gray hover:border-crimson'
                    }`}
                  >
                    {formData.file ? (
                      <div className="flex items-center justify-between bg-ghost-white p-4 rounded">
                        <div className="flex items-center gap-3 flex-1">
                          <UploadIcon className="text-crimson" size={24} />
                          <div className="text-left">
                            <p className="font-medium text-slate-navy">{formData.file.name}</p>
                            <p className="text-small text-slate-gray">
                              {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, file: null }))}
                          className="text-crimson hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <UploadIcon className="text-slate-gray mx-auto mb-3" size={40} />
                        <p className="text-slate-navy font-medium mb-2">
                          Drag and drop your PDF here, or click to browse
                        </p>
                        <p className="text-small text-slate-gray mb-4">
                          Maximum file size: 50 MB
                        </p>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                            className="hidden"
                          />
                          <span className="inline-block bg-crimson text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">
                            Browse Files
                          </span>
                        </label>
                      </>
                    )}
                  </div>
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mb-6">
                    <div className="w-full h-2 bg-light-gray rounded-full overflow-hidden">
                      <div
                        className="h-full bg-crimson transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-small text-slate-gray mt-2 text-center">{uploadProgress}%</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                  className="w-full bg-crimson text-white py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50"
                >
                  Upload Document
                </button>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-50 border border-sky-blue rounded-lg">
                  <p className="text-small text-slate-navy">
                    ℹ️ Your submission will be reviewed by moderators before being published. Make sure your document is
                    relevant and high-quality!
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
