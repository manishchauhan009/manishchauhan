"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -20,
    },
};

const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
};

export default function PageTransition({ children }) {
    const pathname = usePathname();

    const isHome = pathname === "/";
    const isAdmin = pathname.startsWith("/admin");

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
                className={!isHome && !isAdmin ? "pt-24 lg:pt-28" : ""}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
