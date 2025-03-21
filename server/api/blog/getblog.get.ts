import { supabase } from '~/server/supabase';

export default defineEventHandler(async (event) => {
    const name = event.headers.get('name');
    const { data, error } = await supabase.from('Blogs').select('name,author,created_at,content,description,tags,cover_img').eq('name', name);
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