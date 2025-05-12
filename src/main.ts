import { Server } from "./config/server/main";

const application = new Server();
export const app = application.app;
export const server = application.listen();
