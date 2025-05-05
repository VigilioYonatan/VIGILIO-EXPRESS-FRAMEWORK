export interface Blog {
    id: number;
    title: string;
    content: string;
}

interface BlogsPageProps {
    blogs: Blog[];
}
function BlogsPage({ blogs }: BlogsPageProps) {
    console.log({ blogs });

    return (
        <div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                {blogs.map((blog) => (
                    <a href={`/blogs/${blog.id}`} key={blog.id}>
                        <span>{blog.title}</span>
                        <span>{blog.content}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default BlogsPage;
