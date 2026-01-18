import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testSupabase() {
    console.log('Testing Supabase connection...');

    // Test 1: Read
    const { data: readData, error: readError } = await supabase
        .from('projects')
        .select('*');
    console.log('READ test:', { data: readData, error: readError });

    // Test 2: Update
    const { data: updateData, error: updateError } = await supabase
        .from('projects')
        .update({ description: 'Updated at ' + new Date().toISOString() })
        .eq('id', '7a20bccc-e377-4c4f-ba36-318aa2492e67')
        .select();
    console.log('UPDATE test:', { data: updateData, error: updateError });

    // Test 3: Delete (we'll skip this for now)
}

testSupabase();
