import type { Blog } from ".";

interface BlogsPageProps {
	blog: Blog;
}
function BlogsPage({ blog }: BlogsPageProps) {
	console.log(blog);

	return (
		<div>
			<div class="flex justify-between items-center mb-3">
				<div />
				<div>
					<a href="/blogs">Blogs</a>
				</div>
			</div>
			<div>
				<pre> {JSON.stringify(blog, null, 3)}</pre>
			</div>
		</div>
	);
}

export default BlogsPage;
