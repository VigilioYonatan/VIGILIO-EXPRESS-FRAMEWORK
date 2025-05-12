import {
	parseAsync,
	type ArraySchemaAsync,
	type ObjectSchemaAsync,
	type ValiError,
} from "@vigilio/valibot";

/* get ip */
export async function getIp() {
	const ipResponse = await fetch("https://api.ipify.org");
	const ipResult = await ipResponse.text();
	return ipResult;
}

/* delay */
export async function delay(seg = 10) {
	return new Promise((res) => setTimeout(() => res(true), seg * 1000));
}

/*** random number between*/
export function randomNumber(start: number, end: number) {
	return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function removeTextHTML(value: string) {
	return value.replace(/(<([^>]+)>)/gi, "");
}

export async function validatorTest(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	schema: ObjectSchemaAsync<any> | ArraySchemaAsync<any>,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	body: any,
) {
	try {
		const data = await parseAsync(schema, body);
		return {
			success: true,
			data,
		};
	} catch (error) {
		const errors = {
			success: false,
			message: (error as ValiError).issues[0].message,
			body: (error as ValiError).issues[0].path
				? // biome-ignore lint/suspicious/noExplicitAny: <explanation>
					(error as any).issues[0].path[0].key
				: (error as ValiError).issues[0].validation,
		};
		throw new Error(JSON.stringify(errors, null, 3));
	}
}
