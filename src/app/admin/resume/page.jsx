"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../lib/supabaseClient";
import { Upload, Link as LinkIcon, Save, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

export default function ResumeManager() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [resumeData, setResumeData] = useState({ id: null, resume_link: "" });
    const [uploadMode, setUploadMode] = useState("file"); // 'file' or 'link'
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const { data, error } = await supabase.from("resumes").select("*").single();
            if (error && error.code !== "PGRST116") throw error; // PGRST116 is 'not found' which is fine initially
            if (data) setResumeData(data);
        } catch (error) {
            console.error("Error fetching resume:", error);
            toast.error("Failed to load current resume settings.");
        } finally {
            setFetching(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            let finalLink = resumeData.resume_link;

            // 1. Handle File Upload
            if (uploadMode === "file" && file) {
                const fileName = `resume_${Date.now()}.pdf`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from("portfolio") // Using 'portfolio' bucket, ensure it exists!
                    .upload(`resumes/${fileName}`, file);

                if (uploadError) throw uploadError;

                // Get Public URL
                const { data: publicUrlData } = supabase.storage
                    .from("portfolio")
                    .getPublicUrl(`resumes/${fileName}`);

                finalLink = publicUrlData.publicUrl;
            } else if (uploadMode === "link" && !resumeData.resume_link) {
                toast.error("Please enter a valid link.");
                setLoading(false);
                return;
            }

            // 2. Update Database
            const payload = {
                resume_link: finalLink,
                updated_at: new Date().toISOString()
            };

            let error;
            if (resumeData.id) {
                // Update existing
                const { error: updateError } = await supabase
                    .from("resumes")
                    .update(payload)
                    .eq("id", resumeData.id);
                error = updateError;
            } else {
                // Insert new
                const { error: insertError } = await supabase
                    .from("resumes")
                    .insert([payload]);
                error = insertError;
            }

            if (error) throw error;

            toast.success("Resume updated successfully!");
            setFile(null);
            fetchResume(); // Refresh
        } catch (error) {
            console.error("Error saving resume:", error);
            toast.error(error.message || "Failed to save resume.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="text-white p-10">Loading settings...</div>;
    }

    return (
        <div className="space-y-8">
            <Toaster position="bottom-right" toastOptions={{ style: { background: '#131a2a', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' } }} />

            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-white mb-2">Resume Manager</h1>
                <p className="text-gray-400">Update the resume link displayed on your portfolio homepage.</p>
            </div>

            {/* Current Resume Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-[#131a2a] border border-white/5"
            >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="text-green-500" /> Current Configuration
                </h2>

                {resumeData.resume_link ? (
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl">
                        <FileText className="w-8 h-8 text-primary" />
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm text-gray-400 mb-1">Active Resume Link</p>
                            <a
                                href={resumeData.resume_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline truncate block"
                            >
                                {resumeData.resume_link}
                            </a>
                        </div>
                        <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded">
                            Active
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 p-4 rounded-xl">
                        <AlertCircle className="w-5 h-5" />
                        <span>No resume linked yet. Upload one below.</span>
                    </div>
                )}
            </motion.div>

            {/* Update Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl bg-[#131a2a] border border-white/5"
            >
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setUploadMode("file")}
                        className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${uploadMode === "file"
                                ? "bg-primary text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        <Upload className="w-5 h-5" /> Upload PDF
                    </button>
                    <button
                        onClick={() => setUploadMode("link")}
                        className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${uploadMode === "link"
                                ? "bg-primary text-black shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                            }`}
                    >
                        <LinkIcon className="w-5 h-5" /> Direct Link
                    </button>
                </div>

                {uploadMode === "file" ? (
                    <div className="space-y-4">
                        <div className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${file ? "border-primary/50 bg-primary/5" : "border-white/10 hover:border-white/20"
                            }`}>
                            <input
                                type="file"
                                id="resume-upload"
                                accept="application/pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                    <Upload className={`w-8 h-8 ${file ? "text-primary" : "text-gray-400"}`} />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-white mb-1">
                                        {file ? file.name : "Click to upload PDF"}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF up to 10MB"}
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 mb-1 block">External Resume URL</label>
                        <input
                            type="url"
                            value={resumeData.resume_link}
                            onChange={(e) => setResumeData({ ...resumeData, resume_link: e.target.value })}
                            placeholder="https://drive.google.com/..."
                            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-all"
                        />
                    </div>
                )}

                <button
                    onClick={handleSave}
                    disabled={loading || (uploadMode === "file" && !file)}
                    className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        <>
                            <Save className="w-5 h-5" /> Save Changes
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );
}
