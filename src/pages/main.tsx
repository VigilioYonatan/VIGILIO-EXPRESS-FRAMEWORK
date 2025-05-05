import "vite/modulepreload-polyfill"; //https://vitejs.dev/guide/backend-integration
import "../assets/index.css";
import { render } from "~/libs/client/preact";
import { lazy } from "preact/compat";

console.log("aca");

for (const [path] of Object.entries(
    import.meta.glob("./**/*.tsx", { eager: false })
)) {
    console.log({ path });

    render(
        path,
        lazy(() => import(/* @vite-ignore */ path))
    );
}
// render(
//     "index",
//     lazy(() => import(/* @vite-ignore */ "./index"))
// );
// render(
//     "blogs-index",
//     lazy(() => import(/* @vite-ignore */ "./blogs/index"))
// );
