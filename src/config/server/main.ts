import express from "express";
import path from "node:path";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import enviroments from "~/config/server/enviroments.config";
import {
	ERROR_MIDDLEWARE,
	attachControllers,
	Container,
} from "@vigilio/express-core";
import { ServerErrorMiddleware } from "@vigilio/express-core/handler";
import { logger } from "@vigilio/express-core/helpers";
import { client } from "@vigilio/express-core/client";
import { apiRouters } from "~/routers/api.router";
import { webRouters } from "~/routers/web.router";
import { authRouters } from "~/routers/auth.router";
import { middlewareRoute } from "~/libs/server/middleware-route";

export class Server {
	public readonly app: express.Application = express();

	constructor() {
		this.middlewares();
		// Llama a la función para inicializar las instancias
	}
	middlewares() {
		// comprimir paginas webs para mejor rendimiento - NO TOCAR si no es necesario
		this.app.use(
			compression({
				threshold: 10000,
				filter: (req, res) => {
					if (req.headers["x-no-compression"]) {
						return false;
					}
					return compression.filter(req, res);
				},
			}),
		);

		// habilitar cookies
		this.app.use(cookieParser());
		// habilitar para consumir json
		this.app.use(express.json({ limit: "50mb" }));
		// habilitar carpeta public
		this.app.use(
			express.static(path.resolve(import.meta.dir, "..", "..", "public")),
		);

		// vite js configuración
		this.app.use(client({ file: "pages/main.tsx" }));
		// metodos globales
		this.routes();

		// connectDB();
	}

	routes() {
		this.app.use(morgan("dev"));
		const apiRouter = express.Router();
		const webRouter = express.Router();
		const authRouter = express.Router();
		attachControllers(apiRouter, apiRouters);
		attachControllers(webRouter, webRouters);
		attachControllers(authRouter, authRouters);
		Container.provide([
			{ provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware },
		]);
		this.app.use("/", webRouter);
		// this.app.use("/auth", authRouter);
		this.app.use("/api", apiRouter);
		this.app.use(middlewareRoute);
	}

	listen() {
		if (enviroments.NODE_ENV !== "test") {
			const server = this.app.listen(enviroments.PORT, () => {
				logger.primary(
					`Run server ${enviroments.NODE_ENV} in port ${enviroments.PORT}`,
				);
			});
			return server;
		}
	}
}
