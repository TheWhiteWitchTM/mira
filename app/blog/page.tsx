import {Blog} from "@/next-blog/ui/Blog";
import {PageContent} from "@/next-static/ui/PageContent";

export default function BlogHome() {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h1>📃Bloog Feeds</h1>
			<Blog/>
		</PageContent>
	)
}