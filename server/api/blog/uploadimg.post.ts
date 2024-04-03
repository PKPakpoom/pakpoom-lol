import { supabase } from '~/server/supabase';
import { type MultiPartData } from 'h3';
import { verifyUser } from '~/server/verifyUser';


export default defineEventHandler(async (event) => {
  if (!(await verifyUser(event)).success) {
    return createError({
        statusCode: 401,
        message: 'Unauthorized',
    });
}
  const filename = event.headers.get("filename");
  if (!filename) {
    throw createError({
      statusCode: 400,
      message: 'No filename provided in request.',
    });
  }
  const formData = await readMultipartFormData(event);
  
  if (!formData) {
    throw createError({
      statusCode: 400,
      message: 'No image file provided in request.',
    });
  }

  const file: MultiPartData = formData[0];
  
  if (!file) {
    throw createError({
      statusCode: 400,
      message: 'No image file provided in request.',
    });
  }

  try {
    const { data, error } = await supabase.storage
      .from('blog_images')
      .upload(filename, file.data.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw error;
    }


    return {
      statusCode: 200,
      body: JSON.stringify({
        data,
      }),
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return createError({
      statusCode: 500,
      message: 'Image upload failed.',
    });
  }
});