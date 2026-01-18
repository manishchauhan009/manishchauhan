"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiTailwindcss,
    SiMongodb, SiPostgresql, SiSupabase, SiFramer, SiGit,
    SiJavascript, SiHtml5, SiCss3, SiExpress, SiPython,
    SiPostman, SiVercel, SiMysql
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Cpu, Globe, Database, PenTool, Terminal } from "lucide-react";

// Skill Categories
const categories = [
    { id: "all", label: "All Skills", icon: Globe },
    { id: "frontend", label: "Frontend", icon: Cpu },
    { id: "backend", label: "Backend", icon: Terminal },
    { id: "database", label: "Database", icon: Database },
    { id: "tools", label: "Tools", icon: PenTool },
];

const skills = [
    // Frontend
    { name: "React.js", icon: SiReact, color: "#61DAFB", category: "frontend", level: "Intermediate" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", category: "frontend", level: "Intermediate" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "frontend", level: "Intermediate" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "frontend", level: "Intermediate" },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF", category: "frontend", level: "Intermediate" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "frontend", level: "Intermediate" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26", category: "frontend", level: "Intermediate" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6", category: "frontend", level: "Intermediate" },

    // Backend
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "backend", level: "Intermediate" },
    { name: "Express.js", icon: SiExpress, color: "#ffffff", category: "backend", level: "Intermediate" }, // White for contrast
    { name: "Python", icon: SiPython, color: "#3776AB", category: "backend", level: "Intermediate" },
    { name: "Java", icon: FaJava, color: "#007396", category: "backend", level: "Intermediate" },

    // Database
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "database", level: "Intermediate" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1", category: "database", level: "Intermediate" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "database", level: "Intermediate" },
    { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", category: "database", level: "Intermediate" },

    // Tools
    { name: "Git", icon: SiGit, color: "#F05032", category: "tools", level: "Intermediate" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37", category: "tools", level: "Intermediate" },
    { name: "Vercel", icon: SiVercel, color: "#FFFFFF", category: "tools", level: "Intermediate" },
];

const Skills = () => {
    const [activeTab, setActiveTab] = useState("all");

    const filteredSkills = activeTab === "all"
        ? skills
        : skills.filter(skill => skill.category === activeTab);

    return (
        <section className="relative min-h-screen px-6 sm:px-8 lg:px-12 pt-6 pb-6 overflow-hidden bg-[#0b0f1a]">
            {/* Background Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-secondary/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        Tech <span className="text-gradient">Ecosystem</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A curated stack of technologies I use to build robust, scalable applications
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveTab(category.id)}
                            className={`relative px-6 py-3 rounded-full flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${activeTab === category.id
                                ? "text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {activeTab === category.id && (
                                <motion.div
                                    layoutId="activeTabSkill"
                                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <category.icon className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">{category.label}</span>
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="group relative"
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-[#131a2a]/40 backdrop-blur-md border border-white/5 p-6 h-full transition-all duration-300 hover:border-white/20 hover:-translate-y-2 hover:shadow-xl group-hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)]">

                                    {/* Top Glow based on brand color */}
                                    <div
                                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                                        style={{ backgroundColor: skill.color }}
                                    ></div>

                                    {/* Content */}
                                    <div className="flex flex-col items-center justify-center space-y-4 text-center z-10 relative">
                                        <div
                                            className="p-4 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300"
                                        >
                                            <skill.icon
                                                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
                                                style={{ color: skill.color }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">{skill.name}</h3>
                                            <span
                                                className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:text-white transition-colors"
                                            >
                                                {skill.level}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Border Gradient */}
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: `linear-gradient(to right, transparent, ${skill.color}, transparent)` }}
                                    ></div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
