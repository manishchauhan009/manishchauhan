"use client";

import { motion } from "framer-motion";

const stats = [
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies Learned", value: "12+" },
    { label: "Commitment", value: "100%" },
    { label: "Hours Coding", value: "1000+" },
];

export default function TrustStats() {
    return (
        <section className="py-12 border-y border-white/5 bg-[#0b0f1a]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <h3 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-gray-400 font-medium uppercase tracking-widest text-xs sm:text-sm">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
