"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ExternalLink, Github, Layers, Search, Code2 } from "lucide-react";
import {
    SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb,
    SiSupabase, SiFramer, SiTypescript, SiJavascript, SiHtml5,
    SiCss3, SiExpress, SiPostgresql, SiFirebase, SiRedux,
    SiGraphql, SiDocker, SiPython, SiGit
} from "react-icons/si";
import { supabase } from "../../lib/supabaseClient";

// Tech Icon Mapping
const getTechIcon = (techName) => {
    if (!techName) return { icon: Code2, color: '#9CA3AF' };
    const normalize = (name) => name.toLowerCase().replace(/[\s\.]/g, '');
    const tech = normalize(techName);

    const icons = {
        'react': { icon: SiReact, color: '#61DAFB' },
        'reactjs': { icon: SiReact, color: '#61DAFB' },
        'nextjs': { icon: SiNextdotjs, color: '#FFFFFF' },
        'tailwindcss': { icon: SiTailwindcss, color: '#06B6D4' },
        'node': { icon: SiNodedotjs, color: '#339933' },
        'nodejs': { icon: SiNodedotjs, color: '#339933' },
        'mongodb': { icon: SiMongodb, color: '#47A248' },
        'supabase': { icon: SiSupabase, color: '#3ECF8E' },
        'framermotion': { icon: SiFramer, color: '#0055FF' },
        'typescript': { icon: SiTypescript, color: '#3178C6' },
        'javascript': { icon: SiJavascript, color: '#F7DF1E' },
        'html': { icon: SiHtml5, color: '#E34F26' },
        'html5': { icon: SiHtml5, color: '#E34F26' },
        'css': { icon: SiCss3, color: '#1572B6' },
        'css3': { icon: SiCss3, color: '#1572B6' },
        'express': { icon: SiExpress, color: '#FFFFFF' },
        'expressjs': { icon: SiExpress, color: '#FFFFFF' },
        'postgresql': { icon: SiPostgresql, color: '#4169E1' },
        'firebase': { icon: SiFirebase, color: '#FFCA28' },
        'redux': { icon: SiRedux, color: '#764ABC' },
        'graphql': { icon: SiGraphql, color: '#E10098' },
        'docker': { icon: SiDocker, color: '#2496ED' },
        'python': { icon: SiPython, color: '#3776AB' },
        'git': { icon: SiGit, color: '#F05032' },
    };

    return icons[tech] || { icon: Code2, color: '#9CA3AF' };
};

const MOCK_PROJECTS = [
    {
        id: "mock-1",
        title: "E-Commerce Ultra",
        description: "A high-performance modern e-commerce platform with real-time inventory and AI-driven recommendations.",
        tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
        image_url: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        live_link: "#",
        github_link: "#"
    },
    {
        id: "mock-2",
        title: "AI Analytics Dashboard",
        description: "Real-time data visualization dashboard processing large datasets with machine learning integration.",
        tech_stack: ["React", "Python", "Docker", "PostgreSQL", "D3.js"],
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        live_link: "#",
        github_link: "#"
    },
    {
        id: "mock-3",
        title: "Social Connect App",
        description: "A fully featured social media application with real-time messaging, stories, and feed algorithms.",
        tech_stack: ["Node.js", "Express", "MongoDB", "Socket.io", "React"],
        image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        live_link: "#",
        github_link: "#"
    }
];

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredProject, setHoveredProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from("projects")
                    .select("*")
                    .order("created_at", { ascending: false });

                // If real projects exist, use them. Otherwise (or if very few), combine with mock for showcase.
                const formattedProjects = (data || []).map(p => ({
                    ...p,
                    live_link: p.link, // Map 'link' column to 'live_link'
                    tech_stack: p.category ? p.category.split(',').map(t => t.trim()) : [], // Map 'category' to 'tech_stack' array
                }));

                const finalProjects = formattedProjects.length > 0 ? formattedProjects : MOCK_PROJECTS;

                setProjects(finalProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setProjects(MOCK_PROJECTS); // Fallback
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section className="relative min-h-screen flex items-center justify-center section-padding bg-[#0b0f1a]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-primary animate-pulse font-medium">Loading Masterpieces...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen px-6 sm:px-8 lg:px-12 pt-6 pb-6 overflow-hidden bg-[#0b0f1a]">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        Featured <span className="text-gradient">Work</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A showcase of technical challenges solved with modern stacks and creative design.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {projects.map((project, index) => (
                        <Tilt
                            key={project.id}
                            tiltMaxAngleX={5}
                            tiltMaxAngleY={5}
                            scale={1.02}
                            transitionSpeed={2000}
                            className="h-full"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative h-full flex flex-col rounded-2xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-primary/50 transition-colors duration-500"
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                            >
                                {/* Image Container with Overlay */}
                                <div className="relative h-56 md:h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#131a2a] via-transparent to-transparent z-10 opacity-60"></div>
                                    <img
                                        src={project.image_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.style.background = 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(167, 139, 250, 0.1))';
                                        }}
                                    />

                                    {/* Tech Icons Overlay on Image */}
                                    <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap gap-2">
                                        {project.tech_stack?.slice(0, 4).map((tech, i) => {
                                            const { icon: Icon, color } = getTechIcon(tech);
                                            return (
                                                <div
                                                    key={i}
                                                    className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 shadow-lg"
                                                    title={tech}
                                                >
                                                    <Icon style={{ color }} className="w-4 h-4" />
                                                </div>
                                            );
                                        })}
                                        {(project.tech_stack?.length > 4) && (
                                            <div className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white font-bold flex items-center justify-center w-7 h-7">
                                                +{project.tech_stack.length - 4}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 sm:p-8 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                                            {project.title}
                                        </h3>

                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-300 transition-colors">
                                        {project.description}
                                    </p>

                                    <div className="mt-auto">
                                        {project.live_link ? (
                                            <a
                                                href={project.live_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors group-hover:translate-x-1 duration-300"
                                            >
                                                Explore Project <ExternalLink className="w-4 h-4" />
                                            </a>
                                        ) : (
                                            <span className="text-sm text-gray-500 italic">Coming Soon</span>
                                        )}
                                    </div>
                                </div>

                                {/* Hover Border Glow */}
                                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-primary/30 pointer-events-none transition-colors duration-500"></div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
