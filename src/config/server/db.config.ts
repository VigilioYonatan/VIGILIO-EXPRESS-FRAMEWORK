import { Sequelize } from "sequelize-typescript";
import enviroments from "./enviroments";
import { logger } from "@vigilio/express-core/helpers";

const sequelize = new Sequelize({
	dialect: "postgres",
	host: enviroments.DB_HOST,
	username: enviroments.DB_USER,
	password: enviroments.DB_PASS,
	database:
		enviroments.NODE_ENV === "test"
			? `${enviroments.DB_NAME}_test`
			: enviroments.DB_NAME,
	port: enviroments.DB_PORT,
	pool: {
		max: 30,
		min: 10,
		acquire: 60000,
		idle: 20000,
	},
});

sequelize.addModels([]);

export async function connectDB() {
	try {
		await sequelize.authenticate();
		logger.success("conectado a base de datos correctamente");
		if (enviroments.NODE_ENV === "production") return;
		await sequelize.sync({ force: true });
	} catch (error) {
		logger.error(`Error al conectar base de datos: ${error}`);
	}
}
export { sequelize };
