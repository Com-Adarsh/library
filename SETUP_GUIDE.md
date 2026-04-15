# Setup Guide for Next.js Application with Supabase Integration

This guide provides step-by-step instructions on how to set up the Next.js project with Supabase integration locally, deploy it to production, and create the necessary folder structure for the application.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Setting Up Locally](#setting-up-locally)
4. [Deploying to Production](#deploying-to-production)
5. [Folder Structure](#folder-structure)

## Prerequisites
- Node.js (version 14.x or later)
- npm (Node package manager)
- Git
- Supabase account and project setup

## Project Structure
The initial folder structure should look like this:
```
my-nextjs-app/
├── public/
├── src/
│   ├── pages/
│   ├── components/
│   ├── lib/
│   └── styles/
├── .env.local
├── package.json
└── README.md
```

## Setting Up Locally
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Com-Adarsh/library.git
   cd library
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a file named `.env.local` in the root of the project.
   - Add your Supabase URL and API key to the file:
   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   - Open your browser and go to `http://localhost:3000`.

## Deploying to Production
1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to your preferred hosting service** (e.g., Vercel, Netlify, etc.).
   - For Vercel:
     - Use the Vercel CLI to deploy.
     ```bash
     npm i -g vercel
     vercel
     ```
   - Follow the prompts to link your repository and deploy.

## Folder Structure
As you build your application, follow this folder structure:
- **public/**: Static files such as images and fonts.
- **src/**: Contains the main source code of your application.
  - **pages/**: Next.js pages.
  - **components/**: Reusable React components.
  - **lib/**: Helper functions and API integrations, such as Supabase.
  - **styles/**: CSS and styling files.

Ensure that your folder structure aligns with best practices for Next.js applications to maintain scalability and organization.