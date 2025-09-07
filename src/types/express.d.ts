import { TokenPayload } from "@/types/jwt";

declare global {
    namespace Express{
        interface Request{
            user?: TokenPayload;
        }
    }
}
