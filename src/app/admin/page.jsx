"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen, BookOpen, MessageSquare, Plus, ArrowRight } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const StatCard = ({ title, value, icon: Icon, color, href }) => (
    <Link
        href={href}
        className="group p-6 rounded-3xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-${color}/20 transition-all`}></div>

        <div className="relative z-10 flex justify-between items-start">
            <div>
                <p className="text-gray-400 font-medium mb-1">{title}</p>
                <h3 className="text-4xl font-bold text-white">{value}</h3>
            </div>
            <div className={`p-4 rounded-2xl bg-white/5 text-${color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8" style={{ color: color }} />
            </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors">
            Manage {title} <ArrowRight className="w-4 h-4" />
        </div>
    </Link>
);

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        projects: 0,
        blogs: 0,
        messages: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { count: projectsCount } = await supabase.from("projects").select("*", { count: "exact", head: true });
                const { count: blogsCount } = await supabase.from("blogs").select("*", { count: "exact", head: true });
                const { count: messagesCount } = await supabase.from("contacts").select("*", { count: "exact", head: true });

                setStats({
                    projects: projectsCount || 0,
                    blogs: blogsCount || 0,
                    messages: messagesCount || 0
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="p-8 text-gray-400">Loading Dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
                    <p className="text-gray-400">Welcome back, here's what's happening today.</p>
                </div>
                <Link
                    href="/"
                    target="_blank"
                    className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium transition-all"
                >
                    View Live Site
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Projects"
                    value={stats.projects}
                    icon={FolderOpen}
                    color="#22d3ee" // Cyan
                    href="/admin/projects"
                />
                <StatCard
                    title="Blogs"
                    value={stats.blogs}
                    icon={BookOpen}
                    color="#a78bfa" // Purple
                    href="/admin/blogs"
                />
                <StatCard
                    title="Messages"
                    value={stats.messages}
                    icon={MessageSquare}
                    color="#34d399" // Green
                    href="/admin/messages"
                />
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="flex gap-4">
                    <Link
                        href="/admin/projects/add"
                        className="flex items-center gap-3 px-6 py-4 rounded-xl bg-primary text-black font-bold hover:bg-secondary transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Project
                    </Link>
                    <Link
                        href="/admin/blogs/add"
                        className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-bold transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Write New Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}
