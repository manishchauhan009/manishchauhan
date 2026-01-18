"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye, ArrowRight, BookOpen } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";



const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data, error } = await supabase
                    .from("blogs")
                    .select("*")
                    .eq("is_published", true)
                    .order("published_at", { ascending: false });

                const realBlogs = data || [];
                setBlogs(realBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <section className="relative min-h-screen flex items-center justify-center section-padding bg-[#0b0f1a]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-primary animate-pulse font-medium">Loading Insights...</p>
                </div>
            </section>
        );
    }

    return (
        <section
            className="relative min-h-screen px-6 sm:px-8 lg:px-12 pt-6 pb-6 overflow-hidden bg-[#0b0f1a]"
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6">
                        <BookOpen className="w-3 h-3" />
                        <span>Insights & Thoughts</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        My <span className="text-gradient">Blogs</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Sharing my journey, tutorials, and thoughts on the evolving landscape of web development.
                    </p>
                </motion.div>

                {/* Content */}
                {blogs.length > 0 ? (
                    <>
                        {/* Featured / Hero Blog (First Item) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16 group relative rounded-3xl overflow-hidden border border-white/10"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="relative h-64 lg:h-auto overflow-hidden">
                                    <img
                                        src={blogs[0].image_url || "/images/blog-placeholder.jpg"}
                                        alt={blogs[0].title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] to-transparent opacity-60 lg:opacity-30"></div>
                                </div>

                                <div className="p-8 lg:p-12 bg-[#131a2a]/60 backdrop-blur-xl flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(blogs[0].published_at || blogs[0].created_at).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md text-xs font-medium text-white">{blogs[0].category || "Tech"}</span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                        {blogs[0].title}
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed mb-8 line-clamp-3">
                                        {blogs[0].description || blogs[0].summary}
                                    </p>

                                    <Link href={`/blogs/${blogs[0].slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300">
                                        Read Article <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Remaining Blogs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.slice(1).map((blog, index) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative flex flex-col rounded-2xl bg-[#131a2a]/40 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/20 hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={blog.image_url || "https://source.unsplash.com/random/800x600?tech"}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <Link href={`/blogs/${blog.slug}`} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium border border-white/20">Read Article</span>
                                        </Link>
                                    </div>

                                    <div className="flex-1 p-6 flex flex-col">
                                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(blog.published_at || blog.created_at).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {blog.views || 0}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                            {blog.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                                            {blog.description || blog.summary}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-xs text-gray-500 flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                                                {blog.category || "Tech"}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Thoughts Brewing...</h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            I'm currently writing up some interesting articles. Stay tuned!
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Blogs;
