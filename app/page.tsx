import Image from "next/image"
import {PageContent} from "@/next-static/ui/PageContent";

export default function Home()  {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h1>🛖Welcome Mira's Home☕</h1>
			<Image
				src={"/banner.jog"}
				alt="Home Image"
				width="150"
				height="75"
				priority
			/>
			THis is pretty much still a construction area!
			But it will get better...
			I hope!
		</PageContent>
	)
}