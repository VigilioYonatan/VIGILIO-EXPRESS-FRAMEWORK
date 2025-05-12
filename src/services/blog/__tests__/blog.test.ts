import request from "supertest";
import { describe, it, expect, beforeAll } from "bun:test";
import { app } from "~/main";
import { blogSchema, type BlogSchema } from "../schemas/blog.schema";
import { validatorTest } from "~/libs/server/helpers";
import { arrayAsync } from "@vigilio/valibot";
import type { BlogsStoreDto } from "@/dtos/blog.dto";
import { faker } from "@faker-js/faker";
import { blogs } from "../services/blogs.service";


describe("Blog Endpoint Test", () => {
 

	it("GET /blog", async () => {
		const response = await request(app).get("/api/blog");
		expect(response.status).toBe(200);
		expect(response.body).toMatchObject({ success: true });
		await validatorTest(arrayAsync(blogSchema), response.body.blogs);
	});

  	it("POST /blog", async () => {
		// encontrar errors
		const response = request(app);
		// verificar los body
		const body: BlogsStoreDto = {
			title: faker.lorem.sentence(),
			content: faker.lorem.sentence(),
			enabled: faker.datatype.boolean(),
		};

		const response2 = await response.post("/api/blog").send(body);
		// expect
		expect(response2.status).toBe(201);
		expect(response2.body).toMatchObject({ success: true });

		const blogBody = response2.body.blog;

		await validatorTest(blogSchema, blogBody);

		// validar que se agregó
		blog = blogs.find((b) => b.id === blogBody.id) as BlogSchema;
		expect(blog).not.toBeNull();
		expect(blog).not.toBeUndefined();
		// si es el mido que el body
		expect(blog).toEqual({ id: blog!.id, ...body });
	});

	it("GET /blog/:id", async () => {

    const nonExistentId = 9999;
    const response = await request(app).get(`/api/blog/${nonExistentId}`);
    expect(response.status).toBe(404);

 const responseNewBlog = await request(app).post('/api/blog').send(body);
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ success: true });

    const blogBody = response.body.blog;
		const response2 = await request(app).get(`/api/blog/${blog?.id}`);
		expect(response2.status).toBe(200);
		expect(response2.body).toMatchObject({ success: true });
    console.log(response.body);
    
		// await validatorTest(blogSchema, response.body.blog);
	});


});
