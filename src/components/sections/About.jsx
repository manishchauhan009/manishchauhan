"use client";

import { motion } from "framer-motion";
import { User, Code, Briefcase, Sparkles, GraduationCap, Globe } from "lucide-react";

// Stat Card Component
const StatCard = ({ icon: Icon, value, label, color }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex flex-col items-center justify-center p-6 bg-[#131a2a]/40 backdrop-blur-md border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-300 group"
    >
        <div className={`p-4 rounded-2xl bg-white/5 mb-4 group-hover:bg-${color}/10 transition-colors`}>
            <Icon className={`w-8 h-8 text-${color} group-hover:scale-110 transition-transform duration-300`} style={{ color: color }} />
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
        <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
);

const About = () => {
    return (
        <section className="relative min-h-screen px-6 sm:px-8 lg:px-12 pt-6 pb-6 overflow-hidden bg-[#0b0f1a]">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {/* 1. Bio / Intro Block (Large: 2x2) */}
                    <div className="md:col-span-2 lg:col-span-2 row-span-2 p-8 md:p-10 bg-[#131a2a]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6">
                                <Sparkles className="w-3 h-3" />
                                <span>About Me</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                SDE I at <span className="text-gradient">Quinite Technologies</span> | MERN & Next.js Specialist
                            </h2>

                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                I'm <strong className="text-white">Manish Chauhan</strong>, a Web Developer specializing in scalable, high-performance applications using the MERN stack and Next.js.
                            </p>

                            <p className="text-gray-400 text-lg leading-relaxed">
                                Currently working on <strong>AI Voice Agents for Sales</strong>. I bridge the gap between creative design and robust engineering, with a strong focus on REST APIs, Agile workflows, and production-ready solutions.
                            </p>
                        </div>
                    </div>

                    {/* 2. Profile Image Block (1x2) */}
                    <div className="md:col-span-1 lg:col-span-1 row-span-2 relative rounded-[2.5rem] overflow-hidden border border-white/10 group">
                        <div className="absolute inset-0 bg-[#131a2a]/20 backdrop-blur-sm z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                            <p className="text-white font-bold tracking-widest uppercase text-sm">Manish Chauhan</p>
                        </div>
                        <img
                            src="/images/profile.png"
                            alt="Manish Chauhan"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.background = 'linear-gradient(to bottom right, #1a2036, #0b0f1a)';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* 3. Stats Blocks */}
                    <div className="md:col-span-3 lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-6">
                        <StatCard
                            icon={Briefcase}
                            value="1+"
                            label="Years Experience"
                            color="#22d3ee" // Cyan
                        />
                        <StatCard
                            icon={Code}
                            value="10+"
                            label="Projects Built"
                            color="#a78bfa" // Purple
                        />
                    </div>

                    {/* 4. Education / Location Block (Wide) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-3 lg:col-span-4 p-8 bg-[#131a2a]/40 backdrop-blur-md border border-white/10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary/20 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">B.Tech in CSE (8.78 CGPA)</h4>
                                <p className="text-gray-400 text-sm">Parul Institute of Technology (2025)</p>
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-white/10"></div>

                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                                <Globe className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">Based in India</h4>
                                <p className="text-gray-400 text-sm">Available for Remote Work Worldwide</p>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default About;
