import { defineConfig, splitVendorChunkPlugin } from "vite";
import preact from "@preact/preset-vite";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default defineConfig({
    plugins: [
        // liveReload([path.resolve(__dirname, "./src/views/**/*.html")]),
        // million.vite({ auto: true }),
        splitVendorChunkPlugin(),
        preact(),
    ],
    root: "src",
    resolve: {
        // RESOURCES ALIAS
        alias: {
            "@": path.resolve(__dirname, "src", "services"),
            "~": path.resolve(__dirname, "src"),
        },
    },
    base: process.env.NODE_ENV === "production" ? "/dist/" : "/",
    build: {
        outDir: path.resolve(__dirname, "public", "dist"),
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: path.resolve(__dirname, "src", "pages", "main.tsx"),
        },
    },
    server: {
        strictPort: true,
        port: Number(process.env.VITE_PORT),
        host: true,
        watch: {
            usePolling: true, // docker
        },
    },
});
