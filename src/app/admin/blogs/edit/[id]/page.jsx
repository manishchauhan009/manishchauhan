"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../../lib/supabaseClient";
import toast from "react-hot-toast";
import { Upload, X, Save, ArrowLeft, Globe, Tag, User, Search, Eye } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import RichTextEditor from "../../../../../components/ui/RichTextEditor";

export default function EditBlog() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Image State
    const [imageType, setImageType] = useState("upload");
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [externalImage, setExternalImage] = useState("");
    const [existingImage, setExistingImage] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        category: "Other",
        tags: "",
        author_name: "Admin",
        meta_title: "",
        meta_description: "",
        is_published: false,
        image_public_id: null,
    });

    useEffect(() => {
        const fetchBlog = async () => {
            // Fetch with specific columns to ensure we get what we expect, or just *
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error(error);
                toast.error("Failed to load blog");
                router.push("/admin/blogs");
            } else {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    description: data.description,
                    content: data.content,
                    category: data.category || "Other",
                    tags: data.tags ? data.tags.join(", ") : "",
                    author_name: data.author_name,
                    meta_title: data.meta_title || "",
                    meta_description: data.meta_description || "",
                    is_published: data.is_published,
                    image_public_id: data.image_public_id,
                });
                setExistingImage(data.image_url);

                // Determine Image Type
                if (data.image_url && !data.image_public_id) {
                    setImageType("external");
                    setExternalImage(data.image_url);
                }

                setLoading(false);
            }
        };

        if (id) fetchBlog();
    }, [id, router]);

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEditorChange = (content) => {
        setFormData({ ...formData, content });
        // Optional: Auto-save draft logic could go here
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
        setSaving(true);

        try {
            let image_url = existingImage;
            let image_public_id = formData.image_public_id;

            // 1. Handle Image
            if (imageType === "upload" && imageFile) {
                // Delete old image if exists
                if (image_public_id) {
                    await axios.post("/api/delete-image", { public_id: image_public_id });
                }

                // Upload new
                const uploadData = new FormData();
                uploadData.append("file", imageFile);

                const response = await axios.post("/api/upload-image", uploadData);
                image_url = response.data.secure_url;
                image_public_id = response.data.public_id;

            } else if (imageType === "external") {
                // If switching to external, delete old uploaded image if it existed
                if (image_public_id && existingImage) {
                    await axios.post("/api/delete-image", { public_id: image_public_id });
                }
                image_url = externalImage;
                image_public_id = ""; // Clear public_id
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
                meta_title: formData.meta_title,
                meta_description: formData.meta_description,
                is_published: formData.is_published,
                updated_at: new Date().toISOString(),
                // Only update published_at if it's being published for the first time? 
                // Or just leave it. Schema says published_at can be used. 
                // For now, let's update it if publishing.
                published_at: formData.is_published ? new Date().toISOString() : null,
            };

            // 3. Update Supabase
            const { error } = await supabase
                .from("blogs")
                .update(blogData)
                .eq("id", id);

            if (error) throw error;

            toast.success("Blog updated successfully!");
            router.push("/admin/blogs");

        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error("Failed to update blog");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading editor...</div>;

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-400" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Edit Post</h1>
                        <p className="text-gray-400 text-sm">Professional Blog Editor</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleSubmit}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-black font-bold hover:bg-secondary transition-colors disabled:opacity-50"
                    >
                        {saving ? "Saving..." : <><Save className="w-5 h-5" /> Update Post</>}
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
                                onChange={handleChange}
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
                                    {imagePreview || existingImage ? (
                                        <>
                                            <img src={imagePreview || existingImage} alt="Preview" className="w-full h-full object-cover" />
                                            {imagePreview && (
                                                <button
                                                    type="button"
                                                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-10 h-10 text-white" />
                                                </button>
                                            )}
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
                                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary focus:bg-white/10 outline-none transition-all text-sm resize-none"
                            />
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}
