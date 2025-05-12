import { Injectable, NotFoundException } from "@vigilio/express-core";
import { faker } from "@faker-js/faker";
import type { BlogSchema } from "../schemas/blog.schema";
import type { BlogsStoreDto } from "@/dtos/blog.dto";

export const blogs: BlogSchema[] = Array.from({ length: 20 }).map((_, i) => ({
	id: i + 1,
	title: faker.lorem.words(),
	content: faker.lorem.sentences(),
	enabled: true,
}));

@Injectable()
export class BlogService {
	index() {
		return { success: true, blogs };
	}

	show(id: string) {
		const blog = blogs.find((blog) => blog.id === Number(id));
		if (!blog) {
			throw new NotFoundException("Not found blog");
		}
		return { success: true, blog };
	}

	store(body: BlogsStoreDto) {
		const id = blogs.length + 1;
		const blog: BlogSchema = { id, ...body };
		blogs.push(blog);
		return {
			success: true,
			blog,
		};
	}
}
