import {PageContent} from "@/next-static/ui/PageContent";
import {EmojiBuilder} from "@/components/EmojiBuilder";

export default function Emoji() {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<EmojiBuilder/>
		</PageContent>
	)
}