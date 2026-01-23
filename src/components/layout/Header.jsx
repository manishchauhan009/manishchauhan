"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Journey", href: "/journey" },
        { name: "Skills", href: "/skills" },
        { name: "Projects", href: "/projects" },
        { name: "Blogs", href: "/blogs" },
        { name: "Contact", href: "/contact" },
    ];

    const isActive = (href) => pathname === href;

    if (pathname.startsWith("/admin")) return null;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? "bg-[#0b0f1a]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
                : "bg-[#0b0f1a]/80 backdrop-blur-md border-b border-white/5"
                }`}
        >
            <nav className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex items-center justify-between h-20 lg:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <span className="text-2xl lg:text-3xl font-bold tracking-tight">
                            Manish{" "}
                            <span className="text-gradient">Chauhan</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive(link.href)
                                    ? "text-primary bg-primary/10 shadow-lg shadow-primary/20"
                                    : "text-gray-300 hover:text-primary hover:bg-white/5"
                                    }`}
                            >
                                {link.name}
                                {isActive(link.href) && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-3 rounded-xl text-gray-300 hover:text-primary hover:bg-white/5 transition-all duration-300"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-[#0b0f1a]/98 backdrop-blur-xl border-t border-white/10"
                    >
                        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${isActive(link.href)
                                            ? "text-primary bg-primary/10 shadow-lg"
                                            : "text-gray-300 hover:text-primary hover:bg-white/5"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
