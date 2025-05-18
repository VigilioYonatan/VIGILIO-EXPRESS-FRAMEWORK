import type { Request, Response } from "express";
import { BASE_URL } from "~/config/server";

interface HeaderProps {
	title: string;
	description?: string;
}
export function Header({
	title,
	description = "Centro de Arbitraje e Investigaciones Jurídicas. Especialistas en arbitraje con contrataciones públicas, arbitrajes de emergencias y Junta de Resolución de disputas.",
}: HeaderProps) {
	const logo = `${BASE_URL()}/images/favicon.png`;

	const seo = {
		title,
		description,
		keywords:
			"arbitraje, arbitraje en contrataciones públicas, arbitraje con el estado, arbitraje de emergencia, normativa contratación pública Perú, disputas contractuales, resolución de controversias, junta de resolución de disputas, dispute boards",
	};

	return `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${seo.title}</title>
        <meta name="description" content="${seo.description}">
        <meta name="keywords" content="${seo.keywords}">
        <meta itemprop="name" content="cearlatinoamericano">
        <meta itemprop="description" content="${seo.description}">
        <meta itemprop="image" content="${logo}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="${BASE_URL()}">
        <meta name="twitter:title" content="${seo.title}">
        <meta name="twitter:description" content="${seo.description}">
        <meta name="twitter:creator" content="cearlatinoamericano">
        <meta name="twitter:image" content="${logo}">
        <meta property="og:title" content="${seo.title}">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${logo}">
        <meta property="og:image" content="${logo}">
        <meta property="og:width" content="800">
        <meta property="og:height" content="800">
        <meta property="og:description" content="${seo.description}">
        <meta property="og:site_name" content="cearlatinoamericano">
        <meta name="fb:app_id" content="100064161184422">
        <link rel="apple-touch-icon" href="${logo}">
        <link rel="icon" href="${logo}" type="image/png">
        `;
}

export function escapeQuotes(str: string): string {
	return str.replace(/"/g, '\\"');
}

/**
 *  html json strifidy
 */
export function escapeForHtmlAttribute(json: string) {
	return json
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

/**
 *  parser props
 */
export function propsToString(props: Record<string, unknown>): string {
	return Object.entries(props)
		.map(([key, value]) => {
			if (typeof value === "string") {
				return `${key}="${escapeQuotes(value)}"`; // ecape
			}
			return `:${key}="${escapeForHtmlAttribute(JSON.stringify(value))}"`;
		})
		.join(" ");
}

export function render(props: {
	lang?: string;
	head?: string;
	scripts?: string;
	props?: Record<string, unknown>;
}) {
	return async (req: Request, res: Response) => {
		function formatPath(routePath: string) {
			let formatted = routePath.startsWith("/")
				? routePath.slice(1)
				: routePath;
			formatted = !Number.isNaN(Number(formatted[0]))
				? `page-${formatted}`
				: formatted;

			if (formatted === "") return "index";
			const segments = formatted.split("/");
			const processedSegments = segments.map((segment) => {
				if (segment.startsWith(":")) {
					return `[${segment.slice(1)}]`;
				}
				return segment;
			});
			formatted = processedSegments.join("-");
			if (!formatted.endsWith("]")) {
				formatted += "-index";
			}
			return formatted;
		}
		let pathJs = formatPath(req.route.path.toLowerCase());
		pathJs = pathJs === "admin*-index" ? "app-index" : pathJs;
		// pathJs = `pages-${pathJs}`;
		return res.send(`
            <!DOCTYPE html>
            <html lang="${props.lang || "es"}">
                        <head>
                            ${props.head || ""}
                            ${res.locals.vite}
                        </head>
                        <body>
                            <${pathJs} ${propsToString({
															...(props.props || {}),
														})}></${pathJs}>
                            ${props.scripts || ""}
                        </body>
                    </html>`);
	};
}
