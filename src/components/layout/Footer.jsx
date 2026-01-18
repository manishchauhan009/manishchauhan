"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];

    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/manishchauhan009", label: "GitHub" },
        { icon: FaLinkedin, href: "https://linkedin.com/in/manishchauhan0054", label: "LinkedIn" },
        { icon: FaInstagram, href: "https://instagram.com/__manish__chauhan", label: "Instagram" },
    ];

    return (
        <footer className="relative bg-gradient-to-b from-[#0b0f1a] to-[#050810] border-t border-white/10">
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl lg:text-3xl font-bold">
                            Chauhan <span className="text-gradient">Manish</span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            Full Stack Developer specializing in MERN Stack & Next.js
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="p-3 rounded-xl bg-white/5 hover:bg-primary hover:text-black transition-all duration-300 transform hover:scale-110 text-xl border border-white/10 hover:border-primary"
                                >
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary transition-colors duration-300 inline-flex items-center group"
                                    >
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold text-white">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-gray-400">
                                <FaEnvelope className="text-primary flex-shrink-0" />
                                <a
                                    href="mailto:manishchauhan0054@gmail.com"
                                    className="hover:text-primary transition-colors duration-300 break-all"
                                >
                                    manishchauhan0054@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FaPhone className="text-primary flex-shrink-0" />
                                <a
                                    href="tel:+918406156334"
                                    className="hover:text-primary transition-colors duration-300"
                                >
                                    +91 8406156334
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter/CTA */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold text-white">Let's Connect</h4>
                        <p className="text-gray-400 leading-relaxed">
                            Interested in working together? Let's build something amazing!
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
                        <p>
                            © {currentYear} <span className="text-primary font-semibold">Manish Chauhan</span>. All rights reserved.
                        </p>
                        <p className="flex items-center gap-2">
                            Made with <span className="text-red-500 animate-pulse">❤️</span> using Next.js
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
