import { supabase } from '~/server/supabase';


export default defineEventHandler(async (event) => {
    const { data, error } = await supabase.from('Blogs').select('name,author,created_at,description,tags,cover_img');
    if (error) {
        return {
            success: false,
            error: error.message,
        };
    }

    return {
        success: true,
        data: data ?? null,
    };




});