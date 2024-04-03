import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '~/server/supabase';



export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { username, password } = body;

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username and Password are required',
        }));
    }

    let { data, error } = await supabase.from('Admin').select('*').eq('Username', username);
    if (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Error querying the database',
        }));
    }

    if (!data || data.length === 0) {
        return {
            success: false,
        };
    }

    let user = data[0];
    try {
        const result = await new Promise((resolve, reject) => {
            bcrypt.compare(password, user.Hash, function(err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });

        if (result) {
            // @ts-ignore
            const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            setCookie(event, 'token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
            return {
                success: true,
                token: token,
            };
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Error comparing the passwords',
        }));
    }
});