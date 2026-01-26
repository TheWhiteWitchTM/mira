import {PageContent} from "@/next-static/ui/PageContent";
import {FlagBuilder} from "@/components/FlagBuilder";

export default function () {
	return (
	<PageContent className={"prose dark:prose-invert"}>
		<FlagBuilder/>
	</PageContent>
	)
}