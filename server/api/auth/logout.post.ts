export default defineEventHandler(async (event) => {
    setCookie(event, 'token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(0),
    });

    return {
        success: true,
    };
});