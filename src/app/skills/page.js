import dynamic from "next/dynamic";

const Skills = dynamic(() => import("@/components/sections/Skills"), {
    loading: () => (
        <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm font-medium animate-pulse">Loading Skills...</p>
            </div>
        </div>
    )
});

export default function SkillsPage() {
    return <Skills />;
}
