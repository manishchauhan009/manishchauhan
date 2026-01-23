"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Typed from "typed.js";
import { ArrowRight, Download, MousePointer2 } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import { supabase } from "../../lib/supabaseClient";

const SocialIcon = ({ href, children, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 text-2xl border border-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
    >
        {children}
    </a>
);

const Home = () => {
    const [init, setInit] = useState(false);
    const [resumeLink, setResumeLink] = useState(null);
    const typedElRef = useRef(null);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const { data } = await supabase.from("resumes").select("resume_link").single();
                if (data?.resume_link) setResumeLink(data.resume_link);
            } catch (e) {
                console.error("Resume fetch error", e);
            }
        };
        fetchResume();
    }, []);

    useEffect(() => {
        const typed = new Typed(typedElRef.current, {
            strings: [
                "Build Web Apps",
                "Learn New Tech",
                "Create Modern UIs",
                "Solve Problems",
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            cursorChar: '|',
        });
        return () => typed.destroy();
    }, []);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#0b0f1a] pt-36 lg:pt-44 pb-20"> {/* Removed flex-center, added explicit padding */}
            {/* Particles Background */}
            {init && (
                <Particles
                    id="tsparticles"
                    className="absolute inset-0"
                    options={{
                        particles: {
                            number: { value: 40, density: { enable: true, area: 800 } }, // Reduced density
                            color: { value: ["#22d3ee", "#a78bfa"] },
                            opacity: { value: 0.2 }, // Lower opacity
                            size: { value: { min: 1, max: 2 } }, // Smaller particles
                            move: { enable: true, speed: 0.5, direction: "none", random: true, outModes: "out" },
                            links: {
                                enable: true,
                                distance: 150,
                                color: "#ffffff",
                                opacity: 0.05,
                                width: 1,
                            },
                        },
                    }}
                />
            )}

            {/* Gradient Blobs - Adjusted availability */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6"
                    >
                        {/* Status Badge - Moved for better flow */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-2"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-[10px] sm:text-xs font-bold text-primary tracking-widest uppercase">
                                Available for Hire
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <div className="space-y-2">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-lg sm:text-xl font-medium text-gray-400"
                            >
                                Hi there, I'm
                            </motion.h2>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight"
                            >
                                Manish
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">
                                    Chauhan.
                                </span>
                            </motion.h1>
                        </div>

                        {/* Typed Text */}
                        <div className="text-xl sm:text-2xl font-medium text-gray-300 h-8">
                            Building <span ref={typedElRef} className="text-primary font-semibold"></span>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-xl text-base text-gray-400 leading-relaxed"
                        >
                            I'm a <span className="text-white font-semibold">Full Stack Developer</span> focused on creating fluid, user-centric web experiences. I blend technical expertise with design sensibilities to build software that creates impact.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
                        >
                            <a
                                href="/projects"
                                className="px-8 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                View My Work
                            </a>
                            {resumeLink && (
                                <a
                                    href={resumeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all"
                                >
                                    Download Resume
                                </a>
                            )}
                        </motion.div>

                        {/* Minimal Socials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-center gap-6 pt-6 opacity-80"
                        >
                            <a href="https://github.com/manishchauhan009" target="_blank" className="hover:text-primary transition-colors"><FaGithub size={22} /></a>
                            <a href="https://linkedin.com/in/manishchauhan0054" target="_blank" className="hover:text-primary transition-colors"><FaLinkedin size={22} /></a>
                            <a href="https://instagram.com/__manish__chauhan" target="_blank" className="hover:text-primary transition-colors"><FaInstagram size={22} /></a>
                        </motion.div>

                    </motion.div>

                    {/* Right: Redesigned Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flex-shrink-0 relative"
                    >
                        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="relative z-10">
                            <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent shadow-2xl group">
                                <div className="absolute inset-0 bg-[#0b0f1a]/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <img
                                    src="/images/profile.png"
                                    alt="Manish Chauhan"
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.style.background = '#1a2036';
                                    }}
                                />
                                {/* Clean Overlay */}
                                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0b0f1a] to-transparent z-20 pointer-events-none"></div>
                            </div>
                        </Tilt>

                        {/* Decorative Elements behind image */}
                        <div className="absolute -top-4 -right-4 w-full h-full rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute -bottom-4 -left-4 w-full h-full rounded-full border border-secondary/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                    </motion.div>
                </div>

                {/* Scroll Indicator - Subtle */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-500 to-transparent"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
