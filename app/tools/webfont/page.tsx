import {PageContent} from "@/next-static/ui/PageContent";
import {WebfontBuilder} from "@/components/WebFontBuilder";

export default function Emoji() {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<WebfontBuilder/>
		</PageContent>
	)
}