interface Enviroments {
	VITE_ENV: "production" | "development";
	VITE_URL: string;
}

const enviroments: Enviroments = {
	VITE_ENV: import.meta.env.VITE_ENV! as "development" | "production",
	VITE_URL: import.meta.env.VITE_URL!,
};

export default enviroments;
