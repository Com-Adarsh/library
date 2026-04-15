# The IMSC Commons - Digital Library
## SFI IMSC Sub-Committee, CUSAT

**Empowering Academic Excellence through Collaboration.**

The SFI IMSC Sub-Committee Digital Library is a student-led initiative at CUSAT designed to bridge the gap between resources and learners. Our mission is to democratize access to high-quality academic materials, ranging from previous years' question papers to essential textbooks across the diverse landscape of Integrated MSc disciplines.

### 🎯 Mission
Built by the students, for the students, this platform serves as more than just a repository. It is a living ecosystem where future scientists can engage in meaningful discussions, stay updated with global scientific progress, and contribute to a collective legacy of knowledge.

---

## 🌟 Features

### Core Features (MVP)
- **📚 Smart Library Navigation:** Organized by Subject → Semester hierarchy (1-10)
  - Question Papers & Textbooks categorized by: Physics, Chemistry, Maths, Biology, Statistics, Environmental Science, Econometrics, Photonics, Electives

- **📤 Secure Contributor Portal:** 
  - Protected `/upload` route for authorized committee members
  - Drag-and-drop PDF upload with auto-compression
  - Metadata requirement: Title, Subject, Semester, Category

- **💬 Discussion Hub:**
  - Forum-style threads for academic discussions
  - Subject tagging (#Physics, #Chemistry, etc.)
  - Comment system with moderation tools

- **🔬 Science Pulse (Real-time News Feed):**
  - Integrated with NewsAPI for live scientific headlines
  - Subject-based filtering (Physics, Chemistry, Biology, Photonics, etc.)
  - Modern Lucide-react icons for intuitive navigation

### Advanced Features (Phase 2)
- **🏆 Top Contributors Leaderboard:** Recognition system for active community members
- **📖 Student Notes Repository:** Peer-to-peer sharing of handwritten notes
- **🔍 AI-Powered Global Search:** Find resources across all subjects instantly
- **🌙 Dark Mode & Low-Data Mode:** For night studying and mobile optimization
- **📱 PWA Support:** Install as mobile app; offline access to menu and cached PDFs
- **🛠️ Scientific Calculator:** Integrated study tool with trigonometry and constants
- **📝 Split-Screen Study Mode:** PDF viewer + Calculator + Notes on one screen
- **⚖️ People's Pulse:** Curated feed from secular/progressive news sources

---

## 🛠️ Technical Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14+ with React 18, Tailwind CSS |
| **UI Components** | Shadcn/ui, Lucide-react icons |
| **Database** | PostgreSQL (via Supabase) |
| **PDF Storage** | Supabase Storage / Cloudinary |
| **Authentication** | Supabase Auth with role-based access |
| **News Integration** | NewsAPI.org (free tier) |
| **Deployment** | Vercel (recommended for Next.js) |
| **Real-time Updates** | Supabase Realtime |

---

## 🎨 Design Philosophy

**"Modern Socialist" Aesthetic** - Clean, secular, and professional:
- **Primary Accent:** `#BC0000` (Crimson Red) - SFI heritage
- **Text & Icons:** `#1E293B` (Slate Navy) - Professional academic feel
- **Background:** `#F8FAFC` (Ghost White) - Easy on the eyes
- **Success State:** `#059669` (Emerald)
- **Links & News:** `#2563EB` (Blue)

**Typography:** Inter (body), Poppins (headings)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Com-Adarsh/library.git
cd library

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📋 Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_NEWSAPI_KEY=your_newsapi_key
NEXT_PUBLIC_CLOUDINARY_URL=your_cloudinary_url
```

---

## 🤝 Contributing

We believe that knowledge belongs to the community. Here's how you can contribute:

### For Content Contributors (Students/Faculty)
1. Navigate to the **Upload** section
2. Select Subject, Semester, and Category
3. Upload your PDF (max 50MB)
4. Await verification from the sub-committee

### For Code Contributors
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Community Guidelines:** See `COMMUNITY_GUIDELINES.md` for moderation standards.

---

## 📞 Contact & Support

- **Primary Email:** sfiimscsubcommittee25@gmail.com
- **Report Issues:** Use GitHub Issues for bugs or feature requests
- **Suggest Ideas:** Start a Discussion in the "Ideas" category

---

## 📜 License

This project is licensed under the MIT License — see the LICENSE file for details.

---

## ❤️ Acknowledgments

- **Built by:** SFI IMSC Sub-Committee, CUSAT
- **Tagline:** *Made by Students, for Students*
- **Inspiration:** "Education is the most powerful weapon which you can use to change the world." — Nelson Mandela

---

**Last Updated:** 2026-04-15