import * as React from "react";
import {Suspense, use} from "react";
import Header from "./header"
import Content from "./Content"
import {PageContent} from "@/next-static/legacy/PageContent";
import {Waiting} from "@/next-static/ui/Waiting";

interface PageProps {
	params: Promise<any>
}

export default function Page({params}:PageProps) {
	return (
		<PageContent>
		<Suspense fallback={<Waiting/>}>
				<Header paramsPromise={params}/>
				<Content paramsPromise={params}/>
		</Suspense>
		</PageContent>
	)
}