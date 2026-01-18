import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/layout/PageTransition";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

export const metadata = {
    metadataBase: new URL('https://manishchauhan.online'),
    title: {
        default: "Manish Chauhan | Full Stack Developer & Creative Coder",
        template: "%s | Manish Chauhan"
    },
    description: "Personal portfolio of Manish Chauhan, a passionate Full Stack Developer building modern, responsive, and user-friendly web applications using the MERN Stack and Next.js.",
    keywords: ["Manish Chauhan", "Full Stack Developer", "Web Developer", "React Developer", "Next.js", "MERN Stack", "Frontend Developer", "Portfolio"],
    authors: [{ name: "Manish Chauhan", url: "https://manishchauhan.online" }],
    creator: "Manish Chauhan",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://manishchauhan.online",
        title: "Manish Chauhan | Full Stack Developer",
        description: "Explore the projects and journey of a passionate developer turning ideas into reality.",
        siteName: "Manish Chauhan Portfolio",
        images: [
            {
                url: "/images/og-image.jpg", // We should ensure this image exists or use a generic one
                width: 1200,
                height: 630,
                alt: "Manish Chauhan Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Manish Chauhan | Full Stack Developer",
        description: "Building the web, one component at a time.",
        images: ["/images/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning className={poppins.variable}>
            <body suppressHydrationWarning>
                <Header />
                <PageTransition>
                    {children}
                </PageTransition>
                <Footer />
            </body>
        </html>
    );
}
