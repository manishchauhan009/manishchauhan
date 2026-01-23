import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

// Create a Supabase client with the SERVICE KEY for admin rights
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request) {
    try {
        const { public_id } = await request.json();

        if (!public_id) {
            return Response.json({ error: "public_id (file path) is required" }, { status: 400 });
        }

        // Delete from Supabase Storage
        const { data, error } = await supabase
            .storage
            .from('portfolio')
            .remove([public_id]);

        if (error) {
            throw error;
        }

        return Response.json({ success: true, data });
    } catch (error) {
        console.error("Delete image error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
