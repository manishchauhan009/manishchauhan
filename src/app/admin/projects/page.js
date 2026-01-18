"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Plus, Edit, Trash2, Github, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            toast.error("Failed to load projects");
        } else {
            setProjects(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id, image_public_id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            if (image_public_id) {
                await fetch("/api/delete-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ public_id: image_public_id }),
                });
            }

            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) throw error;

            toast.success("Project deleted successfully");
            fetchProjects();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete project");
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading contents...</div>;
    }

    return (
        <div className="space-y-8">
            <Toaster position="bottom-right" />

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                    <p className="text-gray-400">Manage your portfolio showcase.</p>
                </div>
                <Link
                    href="/admin/projects/add"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-bold hover:bg-secondary transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add New Project
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={project.id}
                        className="group flex flex-col sm:flex-row bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="w-full sm:w-48 h-48 sm:h-auto relative shrink-0">
                            <img
                                src={project.image_url || "/images/placeholder.jpg"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                {project.github_link && (
                                    <a href={project.github_link} target="_blank" className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors">
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                                {project.live_link && (
                                    <a href={project.live_link} target="_blank" className="p-2 rounded-full bg-primary/20 hover:bg-primary text-primary hover:text-black transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(project.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{project.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech_stack?.slice(0, 3).map((tech, i) => (
                                    <span key={i} className="px-2 py-1 rounded-md bg-white/5 text-xs text-secondary border border-white/5">{tech}</span>
                                ))}
                                {(project.tech_stack?.length > 3) && (
                                    <span className="px-2 py-1 text-xs text-gray-500">+{project.tech_stack.length - 3}</span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-white/5">
                                <Link
                                    href={`/admin/projects/edit/${project.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
                                >
                                    <Edit className="w-4 h-4" /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(project.id, project.image_public_id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {projects.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                            <FolderOpen className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-300 mb-2">No Projects Yet</h3>
                        <p className="text-gray-500">Click the button above to add your first masterpice.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const FolderOpen = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" /></svg>
)
