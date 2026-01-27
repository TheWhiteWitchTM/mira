import * as React from "react";
import {Suspense, use} from "react";
import Header from "./header"
import Content from "./Content"
import {PageContent} from "@/next-static/ui/PageContent";

interface PageProps {
	params: Promise<any>
}

export default function Page({params}:PageProps) {
	return (
		<PageContent>
		<Suspense fallback={<div>Loading feed...</div>}>
			<span className={"prose dark:prose-invert"}>
			<Header paramsPromise={params}/>
			</span>
			<Content paramsPromise={params}/>
		</Suspense>
		</PageContent>
	)
}