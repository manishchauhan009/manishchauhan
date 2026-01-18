"use client";

import { motion } from "framer-motion";
import { User, Code, BookOpen, Map, ArrowRight } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

const pages = [
    {
        title: "About Me",
        description: "Discover my background, passion for code, and who I am beyond the screen.",
        icon: User,
        link: "/about",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "hover:border-blue-400/50"
    },
    {
        title: "My Projects",
        description: "Explore a collection of web applications, experiments, and open-source contributions.",
        icon: Code,
        link: "/projects",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        border: "hover:border-purple-400/50"
    },
    {
        title: "My Journey",
        description: "A timeline of my education, experience, and milestones in the tech world.",
        icon: Map,
        link: "/journey",
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "hover:border-green-400/50"
    },
    {
        title: "Insights & Blogs",
        description: "Thoughts on web development, tutorials, and deep dives into modern tech stacks.",
        icon: BookOpen,
        link: "/blogs",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        border: "hover:border-pink-400/50"
    }
];

export default function SiteOverview() {
    return (
        <section className="py-20 px-6 sm:px-8 lg:px-12 bg-[#0b0f1a] relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        Explore <span className="text-gradient">More</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Navigate through different aspects of my digital garden.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pages.map((page, index) => (
                        <Tilt key={index} tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} className="h-full">
                            <Link href={page.link} className="block h-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`h-full p-8 rounded-3xl bg-[#131a2a]/40 backdrop-blur-xl border border-white/5 ${page.border} transition-all duration-300 group relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative z-10 flex items-start gap-6">
                                        <div className={`p-4 rounded-2xl ${page.bg} ${page.color} shrink-0`}>
                                            <page.icon className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
                                                {page.title}
                                            </h3>
                                            <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                                                {page.description}
                                            </p>
                                            <span className={`inline-flex items-center gap-2 text-sm font-bold ${page.color} group-hover:gap-3 transition-all`}>
                                                Visit Page <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
}
