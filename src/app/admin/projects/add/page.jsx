"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { Upload, X, Save, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function AddProject() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Image State
    const [imageType, setImageType] = useState("upload"); // 'upload' or 'external'
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [externalImage, setExternalImage] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech_stack: "", // Input as comma separated string, save as array
        github_link: "",
        live_link: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let image_url = "";
            let image_public_id = "";

            // 1. Handle Image (Upload or External)
            if (imageType === "upload" && imageFile) {
                const uploadData = new FormData();
                uploadData.append("file", imageFile);

                const response = await axios.post("/api/upload-image", uploadData);
                image_url = response.data.secure_url;
                image_public_id = response.data.public_id;
            } else if (imageType === "external") {
                image_url = externalImage;
            }

            // 2. Format Data
            const techArray = formData.tech_stack.split(",").map(t => t.trim()).filter(t => t);

            const projectData = {
                title: formData.title,
                description: formData.description,
                category: techArray.join(", "), // Map tech_stack to 'category' column
                link: formData.live_link || "#", // Map live_link to 'link' column
                image_url,
                image_public_id,
            };

            // 3. Insert into Supabase
            const { error } = await supabase.from("projects").insert([projectData]);
            if (error) throw error;

            toast.success("Project added successfully!");
            router.push("/admin/projects");

        } catch (error) {
            console.error("Error adding project:", error);
            toast.error("Failed to add project");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-400" />
                    </Link>
                    <h1 className="text-3xl font-bold text-white">Add New Project</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 space-y-8">

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-400">Project Cover</label>
                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                            <button
                                type="button"
                                onClick={() => setImageType("upload")}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${imageType === "upload" ? "bg-primary text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Upload
                            </button>
                            <button
                                type="button"
                                onClick={() => setImageType("external")}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${imageType === "external" ? "bg-primary text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                External URL
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {imageType === "upload" ? (
                            // Upload UI
                            <div className="relative group">
                                {imagePreview ? (
                                    <div className="relative w-48 h-32 rounded-xl overflow-hidden border border-white/10">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => { setImageFile(null); setImagePreview(null); }}
                                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-8 h-8 text-white" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-48 h-32 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-500 hover:border-primary/50 hover:text-primary transition-all bg-white/5 relative">
                                        <Upload className="w-8 h-8 mb-2" />
                                        <span className="text-xs">Upload Image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            // External URL UI
                            <div className="flex-1 space-y-4">
                                <div className="flex gap-4">
                                    <input
                                        type="url"
                                        value={externalImage}
                                        onChange={(e) => setExternalImage(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all"
                                    />
                                    {externalImage && (
                                        <div className="w-32 h-20 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                            <img src={externalImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="E.g. E-Commerce Platform"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Tech Stack</label>
                            <input
                                type="text"
                                name="tech_stack"
                                value={formData.tech_stack}
                                onChange={handleChange}
                                placeholder="React, Node.js, Tailwind..."
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all"
                            />
                            <p className="text-xs text-gray-500">Comma separated values</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Project detailed description..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all resize-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">GitHub Repository</label>
                            <input
                                type="url"
                                name="github_link"
                                value={formData.github_link}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Live Demo URL</label>
                            <input
                                type="url"
                                name="live_link"
                                value={formData.live_link}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-black font-bold hover:bg-secondary transition-colors disabled:opacity-50"
                        >
                            {loading ? "Saving..." : (
                                <>
                                    <Save className="w-5 h-5" /> Save Project
                                </>
                            )}
                        </button>
                    </div>
            </form>
        </div>
    );
}
