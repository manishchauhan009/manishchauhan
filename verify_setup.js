const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase Credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyTables() {
    console.log("🔍 Verifying Database Tables...");
    const tables = ['projects', 'blogs', 'contacts', 'resumes'];
    const results = {};

    for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*').limit(1);

        if (error) {
            console.error(`❌ Table '${table}': Access Failed`, error.message);
            results[table] = 'Failed';
        } else {
            console.log(`✅ Table '${table}': Accessible`);
            results[table] = 'OK';
        }
    }
    return results;
}

verifyTables();
