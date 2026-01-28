import {PageContent} from "@/next-static/legacy/PageContent";
import {WebfontBuilder} from "@/components/WebFontBuilder";
import Link from "next/link";
import * as React from "react";

export default function Emoji() {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🔤WebFont Builder</h2>
			If you like this tool, and the others you can show your
			support and appreciation here:
			<center>
				<Link
					href="https://www.paypal.com/ncp/payment/BVY3E2H2E2VWA"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex h-8 items-center justify-center rounded bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
				>
					♥️Buy me a coffee!☕
				</Link>
			</center>
			<WebfontBuilder/>
		</PageContent>
	)
}