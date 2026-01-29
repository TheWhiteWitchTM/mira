import {Button} from "@/emoji-ui/ui/Button"
import {
	Globe,
	Youtube,
	Twitter,
	Github,
	Mail,
} from "lucide-react"
import {BlueSky} from "@/components/BlueSky";
export default function () {
	return(
		<div className="flex flex-col gap-0.5">
			<Button
				variant={"link"}
			>
				<Globe/>
			</Button>
			<Button
				variant={"link"}
			>
				<Youtube/>
			</Button>
			<Button
				variant={"link"}
			>
				<BlueSky/>
			</Button>
			<Button
				variant={"link"}
			>
				<Twitter/>
			</Button>
			<Button
				variant={"link"}
			>
				<Github/>
			</Button>
			<Button
				variant={"link"}
			>
				<Mail/>
			</Button>
		</div>
	)
}