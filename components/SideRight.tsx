import { person, withBase } from "@/lib/site"

export function SideRight() {
  return (
    <aside className="side-rail" aria-label="Andreas">
      <div className="side-stick">
        <a href={person.andreas} target="_blank" rel="noopener noreferrer">
          <img
            src={withBase("/andreas.jpg")}
            alt="Andreas, short brown hair, glasses, black jacket, against a black background."
            width={832}
            height={1248}
          />
        </a>
      </div>
    </aside>
  )
}
