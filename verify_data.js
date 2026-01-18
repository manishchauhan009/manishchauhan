const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase Credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProjects() {
    console.log("🔍 Checking Projects Table...");

    const { data, error } = await supabase
        .from('projects')
        .select('id, title, image_url, image_public_id, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error("❌ Error fetching projects:", error);
        return;
    }

    if (data.length === 0) {
        console.log("⚠️ No projects found in database.");
    } else {
        console.log(`✅ Found ${data.length} projects:`);
        data.forEach(p => {
            console.log("---------------------------------------------------");
            console.log(`Title: ${p.title}`);
            console.log(`Image URL: ${p.image_url}`);
            console.log(`Public ID: ${p.image_public_id}`);
        });
    }
}

checkProjects();
