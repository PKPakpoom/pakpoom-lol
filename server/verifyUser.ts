import { type H3Event } from "h3";
import jwt from 'jsonwebtoken';

const JWT_SECRET = "mai bok";

export async function verifyUser(event: H3Event) {
    const token = getCookie(event, "token");
    if (!token) {
        return {
            success: false,
            username: undefined,
        };
    }

    let success = false;
    let username = undefined;
    // @ts-ignore
    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            setCookie(event, "token", "", {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
            success = false;
        } else {
            success = true
            username = (decoded as jwt.JwtPayload).username
        }
    });

    return {
        success: success,
        username: username,
    };
}