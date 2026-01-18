# Portfolio Website - Manish Chauhan

A high-performance, visually stunning portfolio website built with **Next.js**, **Supabase**, and **Tailwind CSS**. This project showcases my skills as a Full Stack Developer, featuring a custom admin panel, dynamic content management, and premium UI animations.

## 🚀 Live Demo

[https://manishchauhan.online](https://manishchauhan.online)

## ✨ Features

- **Premium UI/UX**: Glassmorphism, 3D Tilt effects, and smooth layout transitions using `framer-motion`.
- **Admin Dashboard**: Secure admin panel to manage Projects, Blogs, and Resume updates.
- **Dynamic Content**:
  - **Projects**: Add/Edit/Delete projects with rich details and external links.
  - **Blogs**: Full Markdown/Rich Text editing, "Like" & "View" counters, and Comment system.
  - **Resume Manager**: Update your CV link or upload a PDF directly from the dashboard.
- **Interactive Elements**:
  - **Contact Form**: Real-time submission to Supabase.
  - **Skills Grid**: Categorized tech stack with hover effects.
  - **Experience Timeline**: Vertical timeline for professional history.
- **SEO Optimized**: Fully optimized metadata, OpenGraph tags, and semantic HTML for high discoverability.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend / Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [React Parallax Tilt](https://www.npmjs.com/package/react-parallax-tilt), [TSParticles](https://particles.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Forms**: React Hot Toast for notifications.

## 📂 Folder Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/            # Admin Panel routes (Login, Dashboard, CMS)
│   ├── blogs/            # Public Blog pages
│   ├── projects/         # Public Project pages
│   └── ...
├── components/           # Reusable Components
│   ├── layout/           # Header, Footer, Transitions
│   ├── sections/         # Homepage Sections (Hero, About, Skills, etc.)
│   ├── ui/               # Core UI elements (Buttons, Inputs, Editors)
│   └── features/         # Feature-specific components (Blog Likes, Comments)
├── lib/                  # Utilities (Supabase Client, Helpers)
└── ...
```

## 🚀 Getting Started

1. **Clone the repository**:

    ```bash
    git clone https://github.com/manishchauhan009/manishchauhan.git
    cd manishchauhan
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up Environment Variables**:
    Create a `.env.local` file in the root directory and add your Supabase credentials:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

    *Note: You will need to set up the database schema provided in `supabase_schema.sql`.*

4. **Run the development server**:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🛡️ Database Setup

Run the SQL commands found in `supabase_schema.sql` inside your Supabase SQL Editor to verify tables for `blogs`, `projects`, `contacts`, `resumes`, and `comments` are created with correct RLS policies.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
