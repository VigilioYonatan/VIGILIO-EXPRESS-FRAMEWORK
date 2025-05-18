import "vite/modulepreload-polyfill"; //https://vitejs.dev/guide/backend-integration
import "../assets/index.css";
import { render } from "~/libs/client/preact";
import { lazy } from "preact/compat";
import enviroments from "~/config/client/environments";

for (const [path, importFn] of Object.entries(
	import.meta.glob("./**/*.tsx", { eager: false }),
)) {
	render(
		path.slice(1),
		lazy(() =>
			enviroments.VITE_ENV === "production"
				? importFn().then((module) => ({
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						default: (module as any).default,
					}))
				: import(/*@vite-ignore*/ path),
		),
	);
}
