"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { Upload, X, Save, ArrowLeft, Globe, Tag, User, Search, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import RichTextEditor from "../../../../components/ui/RichTextEditor";

export default function AddBlog() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Image State
    const [imageType, setImageType] = useState("upload");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [externalImage, setExternalImage] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "Other",
        tags: "", // Input as string
        author_name: "Admin",
        meta_title: "",
        meta_description: "",
        is_published: false,
    });

    // Auto-generate slug from title if slug is empty
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug || slugify(title)
        }));
    };

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')     // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-');  // Replace multiple - with single -
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditorChange = (content) => {
        setFormData({ ...formData, content });
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

            // 1. Handle Image
            if (imageType === "upload" && imageFile) {
                const uploadData = new FormData();
                uploadData.append("file", imageFile);

                const response = await axios.post("/api/upload-image", uploadData);
                image_url = response.data.secure_url;
                image_public_id = response.data.public_id;
            } else if (imageType === "external") {
                image_url = externalImage;
            }

            // 2. Prepare Data
            const tagsArray = formData.tags
                ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                : [];

            const blogData = {
                title: formData.title,
                slug: formData.slug || slugify(formData.title),
                description: formData.description,
                content: formData.content,
                image_url,
                image_public_id,
                category: formData.category,
                tags: tagsArray,
                author_name: formData.author_name,
                meta_title: formData.meta_title || formData.title,
                meta_description: formData.meta_description || formData.description,
                is_published: formData.is_published,
                published_at: formData.is_published ? new Date().toISOString() : null,
                updated_at: new Date().toISOString(),
            };

            // 3. Insert into Supabase
            const { error } = await supabase.from("blogs").insert([blogData]);

            if (error) {
                if (error.code === '23505') throw new Error("Slug already exists. Please choose a unique URL.");
                throw error;
            }

            toast.success(formData.is_published ? "Blog published successfully!" : "Draft saved successfully!");
            router.push("/admin/blogs");

        } catch (error) {
            console.error("Error adding blog:", error);
            toast.error(error.message || "Failed to add blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-400" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Create New Post</h1>
                        <p className="text-gray-400 text-sm">Professional Blog Editor</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            setFormData(prev => ({ ...prev, is_published: false }));
                            // Trigger submit programmatically or just rely on user clicking a specific button?
                            // Since form submit handles everything, we can just have two buttons inside the form or handled via state
                            // For simplicity, we'll let the user toggle the switch or have specific buttons below.
                        }}
                        className="text-gray-400 hover:text-white font-medium"
                    >
                        Save as Draft
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                        {loading ? "Publishing..." : <><Save className="w-5 h-5" /> Publish</>}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content (Left Col) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 rounded-3xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Post Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="Enter a captivating title..."
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all text-lg font-medium"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Permalink (Slug)
                            </label>
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400">
                                <span className="text-xs">/blogs/</span>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="flex-1 bg-transparent border-none outline-none text-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Short Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Brief summary for search engines and cards..."
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all resize-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Main Content</label>
                            <div className="rounded-xl overflow-hidden border border-white/10">
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={handleEditorChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right Col) */}
                <div className="space-y-6">

                    {/* Publishing Status */}
                    <div className="p-6 rounded-3xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 space-y-4">
                        <h3 className="font-bold text-white flex items-center gap-2"><Eye className="w-5 h-5 text-primary" /> Visibility</h3>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <span className="text-gray-300">Published</span>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, is_published: !prev.is_published }))}
                                className={`relative w-12 h-6 rounded-full transition-colors ${formData.is_published ? "bg-primary" : "bg-gray-700"}`}
                            >
                                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.is_published ? "translate-x-6" : "translate-x-0"}`} />
                            </button>
                        </div>
                    </div>

                    {/* Image Settings */}
                    <div className="p-6 rounded-3xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 space-y-4">
                        <h3 className="font-bold text-white">Featured Image</h3>

                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10 mb-4">
                            <button
                                type="button"
                                onClick={() => setImageType("upload")}
                                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${imageType === "upload" ? "bg-primary text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                Upload
                            </button>
                            <button
                                type="button"
                                onClick={() => setImageType("external")}
                                className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${imageType === "external" ? "bg-primary text-black" : "text-gray-400 hover:text-white"}`}
                            >
                                External URL
                            </button>
                        </div>

                        {imageType === "upload" ? (
                            <div className="space-y-4">
                                <div className="relative group w-full aspect-video rounded-xl overflow-hidden bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors">
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => { setImageFile(null); setImagePreview(null); }}
                                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-10 h-10 text-white" />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center p-4">
                                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                                            <span className="text-xs text-gray-400">Click to upload</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <input
                                    type="url"
                                    value={externalImage}
                                    onChange={(e) => setExternalImage(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all text-sm"
                                />
                                {externalImage && (
                                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
                                        <img src={externalImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Organization */}
                    <div className="p-6 rounded-3xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 space-y-4">
                        <h3 className="font-bold text-white flex items-center gap-2"><Tag className="w-4 h-4 text-primary" /> Organization</h3>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Technology"
                                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400">Tags (Comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="React, Next.js, AI"
                                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 flex items-center gap-2"><User className="w-3 h-3" /> Author</label>
                            <input
                                type="text"
                                name="author_name"
                                value={formData.author_name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    {/* SEO */}
                    <div className="p-6 rounded-3xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 space-y-4">
                        <h3 className="font-bold text-white flex items-center gap-2"><Search className="w-4 h-4 text-primary" /> SEO Settings</h3>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400">Meta Title</label>
                            <input
                                type="text"
                                name="meta_title"
                                value={formData.meta_title}
                                onChange={handleChange}
                                placeholder="SEO optimized title"
                                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400">Meta Description</label>
                            <textarea
                                name="meta_description"
                                value={formData.meta_description}
                                onChange={handleChange}
                                rows="3"
                                placeholder="SEO description..."
                                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all text-sm resize-none"
                            />
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}
