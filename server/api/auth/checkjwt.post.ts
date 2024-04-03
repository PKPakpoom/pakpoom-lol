import { verifyUser } from "~/server/verifyUser";

export default defineEventHandler(async (event) => {
    return verifyUser(event);
});