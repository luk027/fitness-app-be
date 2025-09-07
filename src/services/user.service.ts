import db from "@/config/db";
import { createResponse } from "@/utils/response";

export const getUserDetailService = async( userId: string ) => {
    const user = await db.user.findUnique({ where: { id: userId },
    select:{
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
    } });
    if(!user) return createResponse(false, "User not found.", 404);

    return createResponse(true, "User fetch successfully.", 200, user)
}