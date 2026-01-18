"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogLikeBtn({ blogId, initialLikes }) {
    const [likes, setLikes] = useState(initialLikes || 0);
    const [liked, setLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    useEffect(() => {
        const hasLiked = localStorage.getItem(`blog_liked_${blogId}`);
        if (hasLiked) setLiked(true);
    }, [blogId]);

    const handleLike = async () => {
        if (liked || isLiking) return;

        setIsLiking(true);
        // Optimistic update
        setLikes(prev => prev + 1);
        setLiked(true);
        localStorage.setItem(`blog_liked_${blogId}`, "true");

        try {
            // Check if 'likes' column exists by trying to update it
            // Assuming user has added the column. If not, this might fail silently or throw.
            // RPC function 'increment_blog_likes' is safer if exists. 
            // Fallback: simple update using current value + 1 (less safe for concurrency)

            // Just update directly for now
            const { error } = await supabase.rpc('increment_blog_likes', { blog_id: blogId });

            if (error) {
                // Fallback to direct update if RPC doesn't exist
                const { data: blog, error: fetchError } = await supabase
                    .from("blogs")
                    .select("likes")
                    .eq("id", blogId)
                    .single();

                if (!fetchError && blog) {
                    await supabase
                        .from("blogs")
                        .update({ likes: (blog.likes || 0) + 1 })
                        .eq("id", blogId);
                }
            }
        } catch (error) {
            console.error("Error liking blog:", error);
            // Revert on critical failure
            // setLikes(prev => prev - 1);
            // setLiked(false);
            // localStorage.removeItem(`blog_liked_${blogId}`);
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={liked}
            className={`group relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${liked ? "bg-red-500/10 text-red-500 cursor-default" : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-red-400"}`}
        >
            <div className="relative">
                <Heart className={`w-5 h-5 transition-transform duration-300 ${liked ? "fill-current scale-110" : "group-hover:scale-110"}`} />
                {liked && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0, y: 0 }}
                        animate={{ opacity: 0, scale: 1.5, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center text-red-500"
                    >
                        <Heart className="w-5 h-5 fill-current" />
                    </motion.span>
                )}
            </div>
            <span className="font-medium text-sm">{likes} Likes</span>
        </button>
    );
}
