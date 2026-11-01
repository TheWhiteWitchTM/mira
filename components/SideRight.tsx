import { buildRailCards } from "@/lib/build-rails"
import { TopicRail } from "./TopicRail"

export function SideRight() {
  return <TopicRail cards={buildRailCards()} />
}
