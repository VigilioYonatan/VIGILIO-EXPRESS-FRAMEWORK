import type { Config } from "tailwindcss";
import tailwindcssAll from "tailwindcss-all";

const config: Config = {
    content: ["./src/**/*.tsx"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                background: "var(--light)",
                hover: "#066484",
            },
            fontFamily: {
                thin: ["Font-Thin", "sans"],
                light: ["Font-Light", "sans"],
                regular: ["Font-Regular", "sans"],
                medium: ["Font-Medium", "sans"],
                bold: ["Font-Bold", "sans"],
                black: ["Font-Black", "sans"],
            },
        },
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            xxl: "1400px",
        },
    },
    plugins: [tailwindcssAll],
    // corePlugins: { preflight: false },
};

export default config;
