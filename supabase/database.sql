-- Database Schema for IMSC Commons
-- Execute this in Supabase SQL Editor

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'contributor', 'moderator', 'admin')),
  avatar_url VARCHAR(500),
  bio TEXT,
  contribution_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Resources (PDFs) Table
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  semester INT CHECK (semester BETWEEN 1 AND 10),
  category VARCHAR(50) NOT NULL CHECK (category IN ('question_paper', 'textbook', 'student_notes')),
  file_url VARCHAR(500) NOT NULL,
  file_size_mb DECIMAL(10, 2),
  description TEXT,
  uploader_id UUID REFERENCES users(id) ON DELETE SET NULL,
  uploader_name VARCHAR(255),
  uploader_email VARCHAR(255),
  file_path VARCHAR(500),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  download_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Discussion Threads Table
CREATE TABLE threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  subject VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0
);

-- Comments on Threads Table
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES threads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  is_reported BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- News Cache Table
CREATE TABLE news_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  source VARCHAR(255),
  url VARCHAR(500),
  image_url VARCHAR(500),
  category VARCHAR(50),
  published_at TIMESTAMP,
  cached_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_resources_subject ON resources(subject);
CREATE INDEX idx_resources_semester ON resources(semester);
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_status ON resources(status);
CREATE INDEX idx_threads_author ON threads(author_id);
CREATE INDEX idx_threads_subject ON threads(subject);
CREATE INDEX idx_comments_thread ON comments(thread_id);
CREATE INDEX idx_comments_author ON comments(author_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_news_expires ON news_cache(expires_at);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users
CREATE POLICY "Users can view public profiles" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for Resources
CREATE POLICY "Anyone can view approved resources" ON resources
  FOR SELECT USING (status = 'approved' OR auth.uid() = uploader_id);

CREATE POLICY "Contributors can insert resources" ON resources
  FOR INSERT WITH CHECK (
    auth.uid() = uploader_id AND
    (SELECT role FROM users WHERE id = auth.uid()) IN ('contributor', 'admin', 'moderator')
  );

CREATE POLICY "Users can update own uploads" ON resources
  FOR UPDATE USING (auth.uid() = uploader_id);

-- RLS Policies for Threads
CREATE POLICY "Anyone can view threads" ON threads
  FOR SELECT USING (is_deleted = false);

CREATE POLICY "Authenticated users can create threads" ON threads
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own threads" ON threads
  FOR UPDATE USING (auth.uid() = author_id);

-- RLS Policies for Comments
CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (is_deleted = false);

CREATE POLICY "Authenticated users can create comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own comments" ON comments
  FOR UPDATE USING (auth.uid() = author_id);

-- Create Functions for Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create Triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_threads_updated_at BEFORE UPDATE ON threads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
