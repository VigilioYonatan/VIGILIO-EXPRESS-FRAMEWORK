export interface Blog {
	id: number;
	title: string;
	content: string;
}

interface BlogsPageProps {
	blogs: Blog[];
}
function BlogsPage({ blogs }: BlogsPageProps) {
	return <div>{JSON.stringify(blogs, null, 3)}</div>;
}

export default BlogsPage;
