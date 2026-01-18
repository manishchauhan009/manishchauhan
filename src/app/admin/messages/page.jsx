"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Mail, Phone, Calendar, MessageSquare, User } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
        if (error) {
            console.error(error);
            toast.error("Failed to load messages");
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this message permanently?")) return;

        try {
            const { error } = await supabase.from("contacts").delete().eq("id", id);
            if (error) throw error;

            toast.success("Message deleted");
            fetchMessages();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete message");
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-400">Loading inbox...</div>;
    }

    return (
        <div className="space-y-8">
            <Toaster position="bottom-right" />

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
                    <p className="text-gray-400">Messages from your portfolio contact form.</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/5 text-sm text-gray-400 border border-white/5">
                    Total Messages: <span className="text-white font-bold">{messages.length}</span>
                </div>
            </div>

            <div className="space-y-4">
                {messages.map((msg, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={msg.id}
                        className="group p-6 rounded-2xl bg-[#131a2a]/60 backdrop-blur-xl border border-white/5 hover:border-primary/30 transition-all duration-300"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Header Info */}
                            <div className="md:w-1/4 space-y-3 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary font-bold text-lg">
                                        {msg.user_name?.charAt(0) || "U"}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{msg.user_name}</h3>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {new Date(msg.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <a href={`mailto:${msg.user_email}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
                                        <Mail className="w-4 h-4" /> {msg.user_email}
                                    </a>
                                    {msg.user_phone && (
                                        <a href={`tel:${msg.user_phone}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
                                            <Phone className="w-4 h-4" /> {msg.user_phone}
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Message Body */}
                            <div className="flex-1 border-l border-white/5 pl-0 md:pl-6 pt-4 md:pt-0">
                                <h4 className="text-lg font-semibold text-white mb-2">{msg.user_subject || "No Subject"}</h4>
                                <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-start">
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className="p-3 rounded-xl bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
                                    title="Delete Message"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {messages.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="inline-flex p-4 rounded-full bg-white/5 mb-4">
                            <MessageSquare className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-300 mb-2">No Messages Yet</h3>
                        <p className="text-gray-500">Your inbox is empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
