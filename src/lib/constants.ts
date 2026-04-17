// Subject definitions for the library
export const SUBJECTS = [
  { name: 'Physics', icon: 'Atom', color: '#2563EB' },
  { name: 'Chemistry', icon: 'TestTube2', color: '#BC0000' },
  { name: 'Mathematics', icon: 'Divide', color: '#1E293B' },
  { name: 'Biology', icon: 'Dna', color: '#7C3AED' },
  { name: 'Statistics', icon: 'BarChart3', color: '#059669' },
  { name: 'Environmental Science', icon: 'Leaf', color: '#16A34A' },
  { name: 'Economics', icon: 'Globe', color: '#2563EB' },
  { name: 'Photonics', icon: 'Sun', color: '#F59E0B' },
  { name: 'Electives', icon: 'BookOpen', color: '#64748B' },
];

export const SEMESTERS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Semester ${i + 1}`,
  type: (i + 1) % 2 === 0 ? 'Even' : 'Odd',
}));

export const CATEGORIES = [
  { value: 'question_paper', label: 'Question Paper' },
  { value: 'textbook', label: 'Textbook' },
  { value: 'student_notes', label: 'Student Notes' },
];
