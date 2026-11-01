import { withBase } from "@/lib/site"

export function SideLeft() {
  return (
    <aside className="side-rail" aria-label="Mira">
      <div className="side-stick">
        <img
          src={withBase("/mira.jpg")}
          alt="Mira, smiling, red hair in a ponytail, black jacket, pointing."
          width={1008}
          height={1792}
        />
      </div>
    </aside>
  )
}
