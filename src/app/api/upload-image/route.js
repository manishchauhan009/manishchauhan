import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

// Create a Supabase client with the SERVICE KEY for admin rights (bypassing RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return Response.json({ error: "No file provided" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Generate a unique file name
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        const fileName = `uploads/${timestamp}_${safeName}`;

        const { data, error } = await supabase
            .storage
            .from('portfolio')
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            throw error;
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase
            .storage
            .from('portfolio')
            .getPublicUrl(fileName);

        return Response.json({
            secure_url: publicUrl,
            public_id: fileName // Return path as public_id for deletion
        });

    } catch (error) {
        console.error("Upload error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
