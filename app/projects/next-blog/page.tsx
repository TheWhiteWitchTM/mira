import {PageContent} from "@/next-static/ui/PageContent";
import Intro from "@/app/blog/next-blog/introduction/page.mdx"
export default function () {
	return(
		<PageContent className={"prose dark:prose-invert"}>
			<h2>📃NEXT-blog</h2>
			<Intro/>
	</PageContent>
	)
}