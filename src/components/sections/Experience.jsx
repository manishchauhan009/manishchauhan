"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Building2, GraduationCap } from "lucide-react";

const experiences = [
    {
        id: 1,
        role: "SDE I (AI Voice Agent)",
        company: "Quinite Technologies",
        period: "Present",
        location: "On-site",
        type: "work",
        description: "Working on AI voice agents for Sales, leveraging advanced AI technologies to automate and enhance customer interactions."
    },
    {
        id: 2,
        role: "Web Developer Intern",
        company: "Script India",
        period: "Dec 2024 - Mar 2025",
        location: "Remote/Hybrid",
        type: "work",
        description: "Developed production-ready web apps including a Member Management System. Implemented CRUD with MERN stack, integrated Formik/Yup validation, and optimized performance."
    },
    {
        id: 3,
        role: "Summer Engineering Intern",
        company: "Tech Startups",
        period: "May 2024 - Jun 2024",
        location: "Remote",
        type: "work",
        description: "Built a scalable MERN stack web application, improving performance by 20%. Collaborated in an agile team of five developers and applied system design principles."
    },
    {
        id: 4,
        role: "B.Tech in Computer Science",
        company: "Parul Institute of Technology",
        period: "2021 - 2025",
        location: "Vadodara, India",
        type: "education",
        description: "CGPA: 8.78. GATE Qualified in Data Science and AI (2025). certifications in Software Engineering and Data Analytics (NPTEL)."
    },
    {
        id: 5,
        role: "Higher Secondary (XII)",
        company: "LG Haria Multipurpose School",
        period: "2021",
        location: "Vapi, India",
        type: "education",
        description: "Completed with 82.6% (CBSE Board)."
    },
    {
        id: 6,
        role: "Secondary School (X)",
        company: "Winners English High School",
        period: "2019",
        location: "Vapi, India",
        type: "education",
        description: "Completed with 81.6% (GSEB Board)."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="relative min-h-screen px-6 sm:px-8 lg:px-12 pt-6 pb-6 overflow-hidden bg-[#0b0f1a]">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        My <span className="text-gradient">Journey</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        A timeline of my professional growth and educational milestones.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Central Line */}
                    <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 md:-translate-x-1/2"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative flex items-start md:items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 top-0 md:top-auto w-10 h-10 flex items-center justify-center rounded-full bg-[#0b0f1a] border-2 border-primary shadow-[0_0_20px_rgba(34,211,238,0.3)] z-10 md:-translate-x-1/2">
                                    {exp.type === "work" ? (
                                        <Briefcase className="w-4 h-4 text-primary" />
                                    ) : (
                                        <GraduationCap className="w-4 h-4 text-secondary" />
                                    )}
                                </div>

                                {/* Spacer for Desktop Balance */}
                                <div className="hidden md:block w-1/2"></div>

                                {/* Content Card */}
                                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-10">
                                    <div className={`
                                        p-6 md:p-8 rounded-2xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/10 
                                        hover:border-primary/30 transition-all duration-300 group
                                        ${index % 2 === 0 ? "text-left" : "md:text-left text-left"}
                                    `}>
                                        <div className="flex flex-col gap-2 mb-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                                                <Calendar className="w-4 h-4" />
                                                <span>{exp.period}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                                {exp.role}
                                            </h3>
                                            <div className="flex items-center gap-2 text-gray-400 font-medium">
                                                <Building2 className="w-4 h-4" />
                                                <span>{exp.company}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 leading-relaxed mb-4">
                                            {exp.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin className="w-4 h-4" />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
