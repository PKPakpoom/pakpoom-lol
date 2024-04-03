import { supabase } from '~/server/supabase';


export default defineEventHandler(async (event) => {
    const filename = event.headers.get("filename");
    if (!filename) {
        return {
            statusCode: 400,
            body: "filename is required"
        };
    }

    const { data } = supabase.storage.from('blog_images').getPublicUrl(filename)

    return {
        publicUrl: data.publicUrl.toString(),
    }

});