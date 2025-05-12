import {
	Body,
	Controller,
	Get,
	Injectable,
	Params,
	Post,
} from "@vigilio/express-core";
import { Pipe, Validator } from "@vigilio/express-core/valibot";
import { objectAsync, string } from "@vigilio/valibot";
import { BlogService } from "../services/blogs.service";
import { blogStoreDto, type BlogsStoreDto } from "@/dtos/blog.dto";

@Injectable()
@Controller("/blog")
export class BlogController {
	constructor(private readonly blogService: BlogService) {}

	@Get("/")
	async index() {
		const result = this.blogService.index();
		return result;
	}

	@Pipe(objectAsync({ id: string() }))
	@Get("/:id")
	async show(@Params("id") id: string) {
		const result = this.blogService.show(id);
		return result;
	}

	// @Status(201)
	@Validator(blogStoreDto)
	@Post("/")
	async store(@Body() body: BlogsStoreDto) {
		const result = this.blogService.store(body);
		return result;
	}
}
