-- 1. Add 'likes' and 'views' columns to 'blogs' table if they don't exist
ALTER TABLE public.blogs 
ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- 2. Create 'comments' table
CREATE TABLE IF NOT EXISTS public.comments (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  blog_id uuid NOT NULL,
  text text NOT NULL,
  author text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT comments_pkey PRIMARY KEY (id),
  CONSTRAINT comments_blog_id_fkey FOREIGN KEY (blog_id) REFERENCES public.blogs (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- 3. Create function to safely increment likes
CREATE OR REPLACE FUNCTION increment_blog_likes(blog_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.blogs
  SET likes = COALESCE(likes, 0) + 1
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;

-- 4. Create function to safely increment views
CREATE OR REPLACE FUNCTION increment_blog_views(blog_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.blogs
  SET views = COALESCE(views, 0) + 1
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;

-- 5. Open RLS Policies for Comments (Adjust as needed for security)
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.comments
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert access for all users" ON public.comments
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- 6. Create 'resumes' table for storing CV link
CREATE TABLE IF NOT EXISTS public.resumes (
  id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
  resume_link text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT resumes_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- 7. Policies for resumes
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.resumes
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable update for authenticated users only" ON public.resumes
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON public.resumes
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);
