-- FIX: Reset 'likes' column to INTEGER to resolve type mismatches
-- Run this in Supabase SQL Editor

-- 1. Drop the current 'likes' column (which might be text[])
ALTER TABLE public.blogs DROP COLUMN IF EXISTS likes;

-- 2. Add 'likes' column back as INTEGER
ALTER TABLE public.blogs ADD COLUMN likes INTEGER DEFAULT 0;

-- 3. Redefine the increment function to handle INTEGER
CREATE OR REPLACE FUNCTION increment_blog_likes(blog_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.blogs
  SET likes = COALESCE(likes, 0) + 1
  WHERE id = blog_id;
END;
$$ LANGUAGE plpgsql;

-- 4. Set initial likes for existing blogs (Optional)
UPDATE public.blogs SET likes = 12 WHERE likes IS NULL;
