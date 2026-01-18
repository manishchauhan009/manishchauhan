"use client";

import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Zap, Database, Globe } from "lucide-react";
import Tilt from "react-parallax-tilt";

const services = [
    {
        icon: Layout,
        title: "Frontend Development",
        description: "Building beautiful, responsive, and interactive user interfaces using React, Next.js, and Tailwind CSS."
    },
    {
        icon: Database,
        title: "Backend Development",
        description: "Creating robust server-side applications and APIs with Node.js, Express, and Database integration (MongoDB/SQL)."
    },
    {
        icon: Smartphone,
        title: "Responsive Design",
        description: "Ensuring your website looks and works perfectly on all devices, from mobile phones to large desktop screens."
    },
    {
        icon: Zap,
        title: "Performance Optimization",
        description: "Improving website speed and core web vitals for better user experience and SEO rankings."
    },
    {
        icon: Code,
        title: "Clean Code",
        description: "Writing maintainable, scalable, and well-documented code that is easy to understand and build upon."
    },
    {
        icon: Globe,
        title: "SEO Best Practices",
        description: "Implementing semantic HTML and metadata to improving visibility on search engines."
    }
];

export default function Services() {
    return (
        <section className="py-20 px-6 sm:px-8 lg:px-12 bg-[#0b0f1a] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        What I <span className="text-gradient">Do</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Passionate about creating digital experiences that live on the internet. Here are the core skills I bring to every project.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} className="h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="h-full p-8 rounded-2xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <service.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
}
