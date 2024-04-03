import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY || !process.env.JWT_SECRET) {
    throw new Error('Missing environment variable(s)');
}

export const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_KEY
);