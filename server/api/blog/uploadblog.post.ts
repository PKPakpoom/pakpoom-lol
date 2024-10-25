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

    try {
        const { name, author, content, description, tags, cover_img } = body;

        // Validate required fields
        if (!name || !author || !description || !tags || !cover_img) {
            return createError({
                statusCode: 400,
                message: 'Missing required fields.',
            });
        }

        const { data, error } = await supabase
            .from('Blogs')
            .insert([{ name, author, content, description, tags, cover_img }])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return createError({
                statusCode: 400,
                message: 'Database error uploading blog post.',
            });
        }

        return {
            statusCode: 200,
            body: {
                message: 'Blog post uploaded successfully.',
                data, // return data for confirmation
            },
        };

    } catch (error) {
        console.error('Error in blog upload handler:', error);
        return createError({
            statusCode: 400,
            message: 'Error uploading blog post.',
        });
    }
});
