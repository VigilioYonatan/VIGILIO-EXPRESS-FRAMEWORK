import { Controller, Get, Injectable, Req, Res } from "@vigilio/express-core";
import type { Request, Response } from "express";
import { Header, render } from "~/libs/server/framework";
import { BlogService } from "./blog/services/blogs.service";
import { Pipe } from "@vigilio/express-core/valibot";
import { objectAsync, string } from "@vigilio/valibot";

@Injectable()
@Controller("/")
export class AppController {
	constructor(private readonly blogService: BlogService) {}

	@Get("/")
	home(@Req() req: Request, @Res() res: Response) {
		const head = Header({ title: "Home", description: "this is a home page" });
		return render({ head })(req, res);
	}
	@Get("/blogs")
	blogs(@Req() req: Request, @Res() res: Response) {
		const result = this.blogService.index();
		const head = Header({ title: "Blogs", description: "this is a home page" });
		return render({ head,props:result })(req, res);
	}

    @Pipe(objectAsync({id:string()}))
	@Get("/blogs/:id")
	blog(@Req() req: Request, @Res() res: Response) {
		const result = this.blogService.show(req.params.id);
		const head = Header({ title: "Blogs", description: "this is a home page" });
		return render({ head,props:result })(req, res);
	}
}
