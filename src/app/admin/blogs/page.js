"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Edit, Trash2, Calendar, Eye, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
        if (error) {
            console.error(error);
            toast.error("Failed to load blogs");
        } else {
            setBlogs(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id, image_public_id) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;

        try {
            if (image_public_id) {
                await fetch("/api/delete-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ public_id: image_public_id }),
                });
            }

            const { error } = await supabase.from("blogs").delete().eq("id", id);
            if (error) throw error;

            toast.success("Blog deleted successfully");
            fetchBlogs();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete blog");
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading blogs...</div>;
    }

    return (
        <div className="space-y-8">
            <Toaster position="bottom-right" />

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Blogs</h1>
                    <p className="text-gray-400">Manage your thoughts and articles.</p>
                </div>
                <Link
                    href="/admin/blogs/add"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-bold hover:bg-secondary transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Write New Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group flex flex-col bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="w-full h-48 relative overflow-hidden">
                            <img
                                src={blog.image_url || "/images/placeholder.jpg"}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/50 backdrop-blur-md text-xs font-medium text-white flex items-center gap-1">
                                <Eye className="w-3 h-3" /> {blog.views || 0}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${blog.is_published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                                        {blog.is_published ? "Published" : "Draft"}
                                    </span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.created_at).toLocaleDateString()}</span>
                                </div>
                                <span className="text-gray-400">{blog.category || "Uncategorized"}</span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{blog.description}</p>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-white/5 mt-auto">
                                <Link
                                    href={`/admin/blogs/edit/${blog.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
                                >
                                    <Edit className="w-4 h-4" /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(blog.id, blog.image_public_id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {blogs.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                            <BookIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-300 mb-2">No Articles Yet</h3>
                        <p className="text-gray-500">Share your knowledge with the world.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const BookIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
)
