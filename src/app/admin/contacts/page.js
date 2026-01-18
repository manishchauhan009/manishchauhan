"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

export default function AdminContacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
        if (error) {
            console.error(error);
            toast.error("Failed to load contacts");
        } else {
            setContacts(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this contact message? This action cannot be undone.")) return;

        try {
            const { error } = await supabase.from("contacts").delete().eq("id", id);
            if (error) throw error;

            toast.success("Contact deleted successfully");
            fetchContacts();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete contact");
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

                <div className="space-y-4">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="bg-gray-800 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{contact.user_name}</h3>
                                    <p className="text-gray-400 text-sm">{contact.user_email} | {contact.user_phone}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(contact.id)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
                                >
                                    Delete
                                </button>
                            </div>
                            <p className="text-lg font-semibold mb-2">{contact.user_subject}</p>
                            <p className="text-gray-300">{contact.message}</p>
                            <p className="text-gray-500 text-sm mt-4">
                                {new Date(contact.created_at).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
