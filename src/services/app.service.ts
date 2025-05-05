import { Injectable } from "@vigilio/express-core";
import { faker } from "@faker-js/faker";
export interface Blog {
    id: number;
    title: string;
    content: string;
}

const blogs: Blog[] = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    title: faker.lorem.words(),
    content: faker.lorem.sentences(),
}));

@Injectable()
export class AppService {
    index() {
        const user = { id: 0, fullName: "Will Smith", edad: 54 };
        return { user, title: "home" };
    }

    blogs() {
        return { blogs };
    }

    blog(id: number) {
        return { blog: blogs.find((blog) => blog.id === id) };
    }
}
