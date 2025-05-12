import { BlogController } from "@/blog/controllers/blog.controller";
import { type Type } from "@vigilio/express-core";

export const apiRouters: Type[] = [BlogController];
