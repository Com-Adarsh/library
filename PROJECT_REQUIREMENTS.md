# Project Requirements - The IMSC Commons Digital Library

## Phase 1: Minimum Viable Product (MVP)

### 1. Navigation & Content Structure
- **Top Navigation Bar**
  - Logo/Title: "The IMSC Commons"
  - Dropdown 1: "Question Papers" → Physics, Chemistry, Maths, Biology, Statistics, Environmental Science, Econometrics, Photonics, Electives
  - Dropdown 2: "Textbooks" → Same subjects
  - Link: "Discussion Hub"
  - Prominent "Upload" button (Crimson, right-aligned)

- **Subject Pages**
  - Display folder structure for Semesters 1-10
  - Filter toggle: Odd Semesters / Even Semesters
  - Show file count per semester
  - Click semester → list all PDFs with metadata (title, upload date, contributor)

### 2. PDF Upload System
- **Access Control:** Only logged-in, verified users (via role-based access)
- **Upload Form Fields:**
  - Title (required)
  - Subject (dropdown, required)
  - Semester (1-10 dropdown, required)
  - Category (Question Paper / Textbook, required)
  - File (drag-and-drop + browse, PDF only, max 50MB)
  - Description (optional)
  - Contributor Name (auto-filled from profile)

- **Post-Upload:**
  - Auto-compress PDF using a library like `pdf-lib` or Cloudinary
  - Store metadata in PostgreSQL
  - File stored in Supabase Storage
  - Send confirmation email to uploader
  - Flag for admin moderation (status: "pending" → "approved" / "rejected")

### 3. PDF Viewer
- **Requirements:**
  - Display PDF in an embedded viewer (use `react-pdf` or `pdfjs-dist`)
  - Page navigation (Previous/Next)
  - Zoom controls
  - Download button
  - Search within PDF
  - Bookmark pages

### 4. Discussion Hub
- **Forum Features:**
  - Create New Thread button
  - Thread list showing: Title, Author, Reply count, Last updated
  - Subject tags (clickable for filtering)
  - Thread detail page with nested comments
  - Comment moderation: "Report" button
  - Soft delete for threads/comments

- **Database Schema:**
  ```sql
  threads: id, title, content, author_id, subject, created_at, updated_at
  comments: id, thread_id, content, author_id, created_at, updated_at, is_reported
  ```

### 5. Science Pulse (News Feed)
- **Implementation:**
  - Fetch from NewsAPI.org every 6 hours
  - Cache results in database to reduce API calls
  - Display as news cards with thumbnail, title, source, timestamp
  - Filter icons for Physics, Chemistry, Biology, Photonics (clickable)
  - "Read More" link opens source in new tab

- **API Integration:**
  ```
  /api/news?category=science&sort=publishedAt
  ```

### 6. Authentication & Roles
- **User Roles:**
  - Student (read-only, can comment on discussions)
  - Contributor (can upload PDFs, pending approval)
  - Admin/Moderator (approve uploads, moderate discussions)
  - Super Admin (manage users, settings)

- **Auth Provider:** Supabase Auth (Email/Password or OAuth)

---

## Phase 2: Advanced Features

### 1. AI-Powered Global Search
- **Search Bar:** Top of homepage
- **Features:**
  - Search across all subjects, semesters, titles, authors
  - Fuzzy matching for typos
  - Recent searches
  - Search results ranked by relevance
  - Instant autocomplete suggestions

### 2. Top Contributors Leaderboard
- **Display:**
  - Sidebar widget showing top 5 contributors
  - Avatar, name, upload count
  - Monthly/All-time toggle
  - Link to contributor's profile

### 3. Student Notes Repository
- **Sub-category under each subject:** "Student Notes"
- **Upload constraints:** JPG/PNG/PDF only (handwritten scans)
- **Verification:** Can be marked as "Verified" by seniors or mods

### 4. Dark Mode
- **Toggle:** Top-right corner next to user profile
- **Persistence:** Save preference to localStorage/database
- **Colors:** Dark navy background with light text

### 5. Low-Data Mode
- **Features:**
  - Disable background images
  - Lazy-load news thumbnails
  - Compress images to 50% quality
  - Inline CSS instead of external stylesheets (cached)

### 6. Progressive Web App (PWA)
- **Requirements:**
  - Service worker for offline support
  - App manifest
  - Install prompt on mobile
  - Offline access to: Navigation menu, cached PDFs, cached news
  - Works on: iOS Safari, Chrome, Firefox

### 7. People's Pulse (Current Affairs)
- **Content Sources:**
  - RSS feeds from: Janata Weekly, Frontline (Science section), SocialistWorker.org
  - Curated categories: Labour Rights, Public Education, Environment, International Solidarity
  - Tagline: *"Education is the most powerful weapon which you can use to change the world."* — Nelson Mandela

### 8. Scientific Calculator
- **Features:**
  - Basic arithmetic (+, -, ×, ÷)
  - Trigonometry (sin, cos, tan, asin, acos, atan)
  - Logarithms (log, ln)
  - Powers and roots (x^y, √)
  - Constants: π, e, phi
  - History of calculations
  - Keyboard shortcuts (Enter = equals, Backspace = clear)

### 9. Split-Screen Study Mode
- **Implementation:**
  - Toggle "Study Mode" when viewing a PDF
  - Resizable divider between PDF (70%) and Tools (30%)
  - Right panel shows: Scientific Calculator + Notes pad
  - Notes auto-save to user profile

---

## Technical Specifications

### Database Schema (PostgreSQL)

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role ENUM('student', 'contributor', 'moderator', 'admin'),
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Resources (PDFs)
CREATE TABLE resources (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  semester INT CHECK (semester BETWEEN 1 AND 10),
  category ENUM('question_paper', 'textbook', 'student_notes'),
  file_url VARCHAR(500) NOT NULL,
  file_size_mb DECIMAL(10, 2),
  uploader_id UUID REFERENCES users(id),
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  download_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Discussion Threads
CREATE TABLE threads (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  author_id UUID REFERENCES users(id),
  subject VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY,
  thread_id UUID REFERENCES threads(id),
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  is_reported BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE
);

-- News Cache
CREATE TABLE news_cache (
  id UUID PRIMARY KEY,
  title VARCHAR(500),
  description TEXT,
  source VARCHAR(255),
  url VARCHAR(500),
  image_url VARCHAR(500),
  category VARCHAR(50),
  published_at TIMESTAMP,
  cached_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);
```

### API Endpoints (Backend)

```
GET    /api/subjects → List all subjects
GET    /api/subjects/:subject/semesters/:sem → Get resources
POST   /api/upload → Upload PDF (authenticated)
GET    /api/resources/:id → Get resource details
POST   /api/discussions → Create thread
GET    /api/discussions?subject=:subject → List threads
POST   /api/discussions/:threadId/comments → Add comment
GET    /api/news → Get news feed (with caching)
GET    /api/search?q=:query → Global search
GET    /api/contributors/leaderboard → Top contributors
```

---

## Success Metrics

- [ ] All MVP features functional and tested
- [ ] Page load time < 2s on 4G
- [ ] Mobile responsiveness (tested on iOS 14+, Android 10+)
- [ ] 95+ Lighthouse score
- [ ] Zero security vulnerabilities (Next.js built-in protections)
- [ ] Community adoption: 50+ uploads in first month
- [ ] 99.9% uptime for file serving (via Supabase)

---

## Launch Timeline

| Phase | Timeline | Deliverables |
|-------|----------|--------------|
| Design & Setup | Week 1-2 | UI mockups, database schema, API design |
| MVP Development | Week 3-6 | Navigation, upload, viewer, discussions |
| Testing & Deployment | Week 7-8 | QA, security audit, launch to production |
| Phase 2 Features | Month 2-3 | Search, calculator, PWA, dark mode |
| Community Building | Ongoing | Marketing, contributor onboarding |