import { blogSchema } from "@/blog/schemas/blog.schema";
import { omitAsync, type Input } from "@vigilio/valibot";

export const blogStoreDto = omitAsync(blogSchema, ["id"]);
export type BlogsStoreDto = Input<typeof blogStoreDto>;

export const blogUpdateDto = omitAsync(blogSchema, ["id"]);
export type BlogsUpdateDto = Input<typeof blogUpdateDto>;
