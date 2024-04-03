import { supabase } from '~/server/supabase';
import { verifyUser } from '~/server/verifyUser';

export default defineEventHandler(async (event) => {
    if (!(await verifyUser(event)).success) {
        return createError({
            statusCode: 401,
            message: 'Unauthorized',
        });
    }
    const body = await readBody(event);
    console.log('body:', body);
    try {
        const { name, author, data, description, tags, cover_img } = body;
        if (!name || !author || !data || !description || !tags || !cover_img) {
            return createError({
                statusCode: 400,
                message: 'Missing required fields.',
            });
        }

        const { error } = await supabase
            .from('Blogs')
            .insert([{ name, author, data, description, tags, cover_img }]);

        if (error) {
            console.error('Error uploading blog post:', error);
            throw error;
        }

        return {
            statusCode: 200,
            body: {
                message: 'Blog post uploaded successfully.',
            }
        };


    } catch (error) {
        return createError({
            statusCode: 400,
            message: 'Error uploading blog post.',
        });
    }
});