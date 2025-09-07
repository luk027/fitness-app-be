type ResponseFormat<T = any> = {
    success: boolean,
    message: string,
    status: number,
    [key: string]: any;
}

export function createResponse<T = any>(
    success: boolean,
    message: string,
    status: number,
    data?: T
): ResponseFormat<T>{
    return{
        success,
        message,
        status,
        ...(data || {})
    };
}