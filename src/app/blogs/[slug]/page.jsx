"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { Calendar, User, Tag, ArrowLeft, Clock, Eye } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import BlogLikeBtn from "../../../components/features/blog/BlogLikeBtn";
import BlogComments from "../../../components/features/blog/BlogComments";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

export default function BlogDetail() {
    const { slug } = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!slug) return;

            try {
                const { data, error } = await supabase
                    .from("blogs")
                    .select("*")
                    .eq("slug", slug)
                    .single();

                if (error) throw error;
                if (!data) throw new Error("Blog not found");

                setBlog(data);

                // Increment views
                await supabase.rpc("increment_blog_views", { blog_id: data.id }).catch(async () => {
                    // Fallback manual increment
                    await supabase.from("blogs").update({ views: (data.views || 0) + 1 }).eq("id", data.id);
                });

            } catch (error) {
                console.error("Error fetching blog:", error);
                // router.push("/blogs"); // Redirect if not found?
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-primary animate-pulse font-medium">Loading Article...</p>
                </div>
            </div>
        );
    }

    if (!blog) return <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center text-white">Article not found</div>;

    return (
        <main className="bg-[#0b0f1a] min-h-screen">
            <Header />

            {/* Hero Header */}
            <div className="relative pt-32 pb-16 px-6 lg:px-12 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-primary">
                            <Tag className="w-3.5 h-3.5" /> {blog.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> {new Date(blog.published_at || blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> {Math.ceil(blog.content?.length / 2000) || 5} min read
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4" /> {blog.views || 0} views
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex items-center justify-between border-y border-white/10 py-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-white font-medium">{blog.author_name || "Admin"}</p>
                                <p className="text-xs text-gray-500">Author</p>
                            </div>
                        </div>
                        <BlogLikeBtn blogId={blog.id} initialLikes={blog.likes} />
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            <div className="max-w-5xl mx-auto px-6 mb-16">
                <div className="aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 relative group">
                    <img
                        src={blog.image_url || "/images/blog-placeholder.jpg"}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] via-transparent to-transparent opacity-50"></div>
                </div>
            </div>

            {/* Content */}
            <article className="max-w-3xl mx-auto px-6 mb-20">
                <div
                    className="prose prose-invert prose-lg max-w-none 
                    prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white 
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                    prose-pre:bg-[#131a2a] prose-pre:border prose-pre:border-white/10"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Related Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-colors cursor-default">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>

            {/* Comments Section */}
            <div className="max-w-3xl mx-auto px-6 pb-24">
                <BlogComments blogId={blog.id} />
            </div>

            <Footer />
        </main>
    );
}
