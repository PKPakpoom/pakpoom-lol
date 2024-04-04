import { createClient } from '@supabase/supabase-js';

// if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY || !process.env.JWT_SECRET) {
//     throw new Error('Missing environment variable(s)');
// }

const SUPABASE_URL = "https://drnjbcaxcnmzhcmyszbx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRybmpiY2F4Y25temhjbXlzemJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NDI5NDYsImV4cCI6MjAyNjQxODk0Nn0.2gLoBrYGf35oxbKZwkep1AtdkYx1nIYaGjLEfSNUlXU";

export const supabase = createClient(
    SUPABASE_URL,//process.env.SUPABASE_URL, 
    SUPABASE_KEY//process.env.SUPABASE_KEY
);