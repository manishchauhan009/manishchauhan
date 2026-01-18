"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { User, MessageSquare, Send, Clock, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function BlogComments({ blogId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ author: "", text: "" });

    useEffect(() => {
        fetchComments();
    }, [blogId]);

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from("comments")
                .select("*")
                .eq("blog_id", blogId)
                .order("created_at", { ascending: false });

            if (error) throw error;
            setComments(data || []);
        } catch (error) {
            console.error("Error loading comments:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.text.trim() || !form.author.trim()) return;

        setSubmitting(true);
        try {
            const { error } = await supabase
                .from("comments")
                .insert([
                    {
                        blog_id: blogId,
                        text: form.text,
                        author: form.author,
                        // created_at is default now()
                    }
                ]);

            if (error) throw error;

            toast.success("Comment posted!");
            setForm({ author: "", text: "" });
            fetchComments(); // Reload comments
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error("Failed to post comment");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white">Discussion <span className="text-gray-500 text-lg font-normal">({comments.length})</span></h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="bg-[#131a2a]/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Name</label>
                    <input
                        type="text"
                        value={form.author}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Message</label>
                    <textarea
                        value={form.text}
                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                        placeholder="Share your thoughts..."
                        rows="3"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all resize-none"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Post Comment
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-8 text-gray-400">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                        No comments yet. Be the first to share your thoughts!
                    </div>
                ) : (
                    <AnimatePresence>
                        {comments.map((comment) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-[#131a2a]/20 border border-white/5 rounded-2xl p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center text-black font-bold text-lg uppercase">
                                            {comment.author.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{comment.author}</h4>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">{comment.text}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
