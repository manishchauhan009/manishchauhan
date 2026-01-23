-- SQL to insert a "Building Scalable Web Applications with Next.js" blog post
-- Run this in your Supabase SQL Editor

INSERT INTO public.blogs (
    title, 
    slug, 
    description, 
    content, 
    category, 
    tags, 
    author_name, 
    image_url, 
    is_published, 
    published_at,
    views,
    likes
)
VALUES (
    'Building Scalable Web Applications with Next.js',
    'building-scalable-web-applications-with-nextjs',
    'Discover how Next.js 14 revolutionizes web development with Server Actions, Partial Prerendering, and Edge Middleware. Learn to build high-performance, SEO-friendly applications that scale exponentially.',
    '<h2>The Evolution of Web Development</h2>
    <p>In the rapidly evolving landscape of web development, <strong>Next.js</strong> has emerged as a powerhouse framework for building production-grade React applications. Its shift towards Server Components and the new App Router has fundamentally changed how we think about rendering and data fetching.</p>
    
    <h3>Why scalability matters?</h3>
    <p>Scalability isn''t just about handling millions of users; it''s about code maintainability, team velocity, and performance consistency. Next.js provides the architectural guardrails to ensure your application remains performant as features grow.</p>
    
    <h3>Key Features for Scale</h3>
    <ul>
        <li><strong>Server Components:</strong> Significantly reduce client-side bundle size by rendering components on the server.</li>
        <li><strong>Edge Runtime:</strong> Move your middleware and API routes closer to the user for near-instant responses.</li>
        <li><strong>Image Optimization:</strong> The <code>next/image</code> component automatically handles resizing, lazy loading, and format conversion.</li>
    </ul>

    <h3>Implementing Server Actions</h3>
    <p>Gone are the days of manually setting up API routes for every form submission. With Server Actions, you can invoke server-side logic directly from your components, creating a seamless and type-safe data mutation story.</p>

    <blockquote>"Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more."</blockquote>

    <h3>Conclusion</h3>
    <p>Adopting Next.js is more than just choosing a framework; it''s investing in a platform that grows with your needs. Whether you are building a personal portfolio or a large-scale enterprise ERP, Next.js provides the tools to succeed.</p>',
    'Web Development',
    ARRAY['Next.js', 'React', 'Scalability', 'Performance', 'Web Dev'],
    'Manish Chauhan',
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop', -- React/Next.js themed image
    true,
    NOW(),
    1240, -- Initial views
    ARRAY[]::text[] -- Initial likes (Empty array to match text[] column type)
);
