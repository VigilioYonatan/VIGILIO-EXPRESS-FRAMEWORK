interface Enviroments {
	NODE_ENV: "production" | "test" | "development";
	PORT: number;
	DB_HOST: string;
	DB_PORT: number;
	DB_NAME: string;
	DB_USER: string;
	DB_PASS: string;
	VITE_PORT: number;
	VITE_URL: string;
}
const enviroments: Enviroments = {
	NODE_ENV: process.env.NODE_ENV! as "development" | "production",
	PORT: Number(process.env.PORT!),
	DB_HOST: process.env.DB_HOST!,
	DB_PORT: Number(process.env.DB_PORT!),
	DB_NAME: process.env.DB_NAME!,
	DB_USER: process.env.DB_USER!,
	DB_PASS: process.env.DB_PASS!,
	VITE_URL: process.env.VITE_URL!,
	VITE_PORT: Number(process.env.VITE_PORT!),
};

export default enviroments;
