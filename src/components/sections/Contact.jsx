"use client";

import { SupabaseClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { supabase } from "../../lib/supabaseClient";

const SocialLink = ({ href, icon: Icon, label, color }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 text-gray-400 hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:-translate-y-1 transition-all duration-300"
    >
        <Icon className="w-6 h-6" />
    </a>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simple validation
        if (!formData.full_name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_name: formData.full_name,
                    user_email: formData.email,
                    user_phone: formData.phone,
                    user_subject: formData.subject,
                    message: formData.message,
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Failed to send message");

            toast.success("Message sent successfully! I'll get back to you soon.");
            setFormData({ full_name: "", email: "", phone: "", subject: "", message: "" });
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative min-h-screen px-6 sm:px-8 lg:px-12 pt-6 pb-6 overflow-hidden bg-[#0b0f1a]"
        >
            {/* Holographic Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[180px] opacity-50"></div>
            </div>

            <Toaster position="bottom-right" toastOptions={{
                style: {
                    background: '#131a2a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }
            }} />

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left: Contact Info & Socials */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                                Let's <span className="text-gradient">Connect</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
                                Have a project in mind or just want to chat? I'm always open to discussing new ideas, opportunities, and cutting-edge tech.
                            </p>

                            <div className="space-y-6 mb-12">
                                <div className="flex items-center gap-5 group">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Email</h4>
                                        <a href="mailto:manishchauhan0054@gmail.com" className="text-base sm:text-xl font-bold text-white hover:text-primary transition-colors break-all">
                                            manishchauhan0054@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 group">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-secondary/50 group-hover:bg-secondary/10 transition-all duration-300">
                                        <Phone className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Phone</h4>
                                        <a href="tel:+918406156334" className="text-xl font-bold text-white hover:text-secondary transition-colors">
                                            +91 8406156334
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-5 group">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300">
                                        <MapPin className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Location</h4>
                                        <p className="text-xl font-bold text-white">India</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <SocialLink href="https://github.com/manishchauhan009" icon={Github} label="Github" />
                                <SocialLink href="https://linkedin.com/in/manishchauhan0054" icon={Linkedin} label="LinkedIn" />
                                <SocialLink href="https://instagram.com/__manish__chauhan" icon={Instagram} label="Instagram" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Holographic Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur-xl opacity-20"></div>

                        <form onSubmit={handleSubmit} className="relative bg-[#131a2a]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl">
                            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400 ml-1">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Project Inquiry"
                                            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Tell me about your project..."
                                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                    ) : (
                                        <>
                                            Send Message <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
