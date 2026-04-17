export async function createResource(resourceData: {
  title: string;
  subject: string;
  semester: number;
  category: string;
  description?: string;
  file_url: string;
  file_size_mb: number;
  uploader_id: string;
}) {
  const response = await fetch('/api/resources', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resourceData),
  });
  
  if (!response.ok) throw new Error('Failed to create resource');
  return response.json();
}

export async function getResources(filters?: {
  subject?: string;
  semester?: number;
  category?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.subject) params.append('subject', filters.subject);
  if (filters?.semester) params.append('semester', filters.semester.toString());
  if (filters?.category) params.append('category', filters.category);

  const response = await fetch(`/api/resources?${params}`);
  if (!response.ok) throw new Error('Failed to fetch resources');
  return response.json();
}

export async function getResource(id: string) {
  const response = await fetch(`/api/resources/${id}`);
  if (!response.ok) throw new Error('Failed to fetch resource');
  return response.json();
}

export async function createThread(threadData: {
  title: string;
  content: string;
  subject: string;
  author_id: string;
}) {
  const response = await fetch('/api/threads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(threadData),
  });
  
  if (!response.ok) throw new Error('Failed to create thread');
  return response.json();
}

export async function getThreads(filters?: { subject?: string }) {
  const params = new URLSearchParams();
  if (filters?.subject) params.append('subject', filters.subject);
  
  const response = await fetch(`/api/threads?${params}`);
  if (!response.ok) throw new Error('Failed to fetch threads');
  return response.json();
}

export async function getThread(id: string) {
  const response = await fetch(`/api/threads/${id}`);
  if (!response.ok) throw new Error('Failed to fetch thread');
  return response.json();
}

export async function createComment(commentData: {
  thread_id: string;
  content: string;
  author_id: string;
}) {
  const response = await fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(commentData),
  });
  
  if (!response.ok) throw new Error('Failed to create comment');
  return response.json();
}

export async function getComments(threadId: string) {
  const response = await fetch(`/api/threads/${threadId}/comments`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
}

export async function getLeaderboard() {
  const response = await fetch('/api/leaderboard');
  if (!response.ok) throw new Error('Failed to fetch leaderboard');
  return response.json();
}

export async function getUserProfile(userId: string) {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}
