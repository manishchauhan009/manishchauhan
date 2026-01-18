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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0f1a]">
            {/* Particles Background */}
            {init && (
                <Particles
                    id="tsparticles"
                    className="absolute inset-0"
                    options={{
                        particles: {
                            number: { value: 60, density: { enable: true, area: 800 } },
                            color: { value: ["#22d3ee", "#a78bfa"] }, // Cyan to Purple
                            opacity: { value: 0.3 },
                            size: { value: { min: 1, max: 3 } },
                            move: { enable: true, speed: 0.8, direction: "none", random: true, outModes: "out" },
                            links: {
                                enable: true,
                                distance: 150,
                                color: "#ffffff",
                                opacity: 0.1,
                                width: 1,
                            },
                        },
                    }}
                />
            )}

            {/* Gradient Blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 section-padding pt-32 lg:pt-0"> {/* Added padding top for mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-8"
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 backdrop-blur-md"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                            </span>
                            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                                SDE I @ Quinite Technologies
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <div className="space-y-4">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl sm:text-2xl font-medium text-primary tracking-wide"
                            >
                                Hello, I'm
                            </motion.h2>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
                            >
                                Manish
                                <span className="text-gradient"> Chauhan</span>
                            </motion.h1>
                        </div>

                        {/* Typed Text */}
                        <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start w-full">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-300">
                                I <span ref={typedElRef} className="text-primary"></span>
                            </span>
                        </div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-lg text-base sm:text-lg text-gray-400 leading-relaxed"
                        >
                            Currently working as an <span className="text-white font-semibold">SDE I</span> at <span className="text-white font-semibold">Quinite Technologies</span>, building AI voice agents. I specialize in scalable <span className="text-white font-semibold">MERN & Next.js</span> applications and modern UI engineering.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 w-full"
                        >
                            {resumeLink ? (
                                <a
                                    href={resumeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-black transition-all duration-300 bg-primary rounded-xl hover:bg-secondary hover:shadow-[0_0_30px_rgba(167,139,250,0.5)] hover:-translate-y-1"
                                >
                                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                                    Download CV
                                    <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40"></div>
                                </a>
                            ) : (
                                <button disabled className="px-8 py-4 text-base font-bold text-gray-500 bg-gray-800 rounded-xl cursor-not-allowed">
                                    Loading CV...
                                </button>
                            )}

                            <a
                                href="/projects"
                                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:-translate-y-1 backdrop-blur-sm"
                            >
                                <div className="p-1 rounded bg-white/10 group-hover:bg-primary/20 transition-colors">
                                    <ArrowRight className="w-4 h-4 group-hover:text-primary" />
                                </div>
                                View Projects
                            </a>
                        </motion.div>

                        {/* Socials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-center gap-5 pt-4"
                        >
                            <SocialIcon href="https://github.com/manishchauhan009" label="GitHub"><FaGithub /></SocialIcon>
                            <SocialIcon href="https://linkedin.com/in/manishchauhan0054" label="LinkedIn"><FaLinkedin /></SocialIcon>
                            <SocialIcon href="https://instagram.com/__manish__chauhan" label="Instagram"><FaInstagram /></SocialIcon>
                        </motion.div>

                    </motion.div>

                    {/* Right: 3D Tilt Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="relative flex items-center justify-center"
                    >
                        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} transitionSpeed={2500}>
                            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
                                {/* Animated Borders */}
                                <div className="absolute inset-0 rounded-full border border-primary/30 animate-[spin_10s_linear_infinite]"></div>
                                <div className="absolute inset-4 rounded-full border border-secondary/30 animate-[spin_15s_linear_infinite_reverse]"></div>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[60px] animate-pulse"></div>

                                {/* Main Image Container */}
                                <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-white/10 bg-[#131a2a]/50 backdrop-blur-sm shadow-2xl">
                                    <img
                                        src="/images/profile.png"
                                        alt="Manish Chauhan"
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.style.background = 'linear-gradient(135deg, #0b0f1a, #1a2036)';
                                        }}
                                    />

                                    {/* Glass Overlay on Bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-6">
                                        <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-lg">
                                            Manish Chauhan
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-gray-500"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <MousePointer2 className="w-5 h-5 animate-bounce text-primary" />
                </motion.div>
            </div>
        </section>
    );
};

export default Home;
