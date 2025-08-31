import { NextFunction, Request, Response } from "express";
import ErrorHandler from "@/utils/errorHandler";
import { env } from "@/config/env";

export const errorMiddleware = ( 
    err: ErrorHandler, 
    req: Request, 
    res: Response, 
    next: NextFunction 
) => {

    err.message ||= "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    const response: {
        success: boolean;
        message: string;
        error?: ErrorHandler;
    } = {
        success: false,
        message: err.message,
    }

    if(env.NODE_ENV === "DEVELOPMENT"){
        response.error = err;
    }

    return res.status(err.statusCode).json(response);
};