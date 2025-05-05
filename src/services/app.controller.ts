import {
    Controller,
    Get,
    Injectable,
    Page,
    Params,
    Req,
} from "@vigilio/express-core";
import { Pipe } from "@vigilio/express-core/valibot";
import { AppService } from "./app.service";
import { objectAsync, string } from "@vigilio/valibot";
import type { Request } from "express";

@Injectable()
@Controller("/")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Page("/")
    async index() {
        const result = this.appService.index();
        return {
            props: result,
        };
    }

    @Page("/blogs")
    async blogs() {
        const result = this.appService.blogs();
        return {
            props: result,
        };
    }

    @Pipe(objectAsync({ id: string() }))
    @Page("/blogs/:id")
    async blog(@Req() req: Request) {
        // console.log({ id });

        const result = this.appService.blog(Number(req.params.id));
        return {
            props: result,
        };
    }
}
