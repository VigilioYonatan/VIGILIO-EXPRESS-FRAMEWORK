import {
	boolean,
	maxLength,
	minLength,
	number,
	objectAsync,
	string,
	type Input,
} from "@vigilio/valibot";

export const blogSchema = objectAsync({
	id: number(),
	title: string([minLength(3), maxLength(200)]),
	content: string([minLength(3)]),
	enabled: boolean(),
});

export type BlogSchema = Input<typeof blogSchema>;
