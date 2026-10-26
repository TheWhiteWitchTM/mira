import { pageMetadata } from "@/lib/metadata"
import { person, withBase } from "@/lib/site"

export const metadata = pageMetadata(
  "About Mira",
  "Dual German-American freelance software consultant in Germany. AI, C++, and TypeScript. Borland, SAP, then open source.",
  "/about/",
)

export default function AboutPage() {
  return (
    <article className="prose">
      <p className="kicker not-prose">About</p>
      <h1>Mira</h1>
      <p>
        Dual German-American. I live in Germany. The work is freelance software: <strong>AI</strong>, <strong>C++</strong>, and{" "}
        <strong>TypeScript</strong>. This page is the card. The long pages live on{" "}
        <a href={person.whitewitch} target="_blank" rel="noopener noreferrer">
          The White Witch
        </a>
        . The code lives on{" "}
        <a href={person.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        . I am The White Witch™.
      </p>

      <h2>The short file</h2>
      <ul>
        <li>Born in the 1970s in Germany.</li>
        <li>Dual: German and American.</li>
        <li>Based in Germany.</li>
        <li>Background in technology, economics, and history.</li>
        <li>Method: facts first. Measure it, then argue.</li>
        <li>Tone: dry, sarcastic when it compresses a paragraph.</li>
      </ul>

      <h2>Machines</h2>
      <p>
        Computers arrived around twelve. A TI-99/4A. BASIC first, then assembler for the TMS9900 by fourteen. English arrived as a side effect of the manuals. From there the usual chain: C64, C128, Amigas, then PCs.
      </p>
      <p>
        The job ran through <strong>Borland</strong>, in the Turbo Pascal and Delphi years, and <strong>SAP</strong>. Then freelance. The work now is open source, Next.js, C++ and Qt when the program has to be native, and what AI does once it leaves the demo.
      </p>

      <h2>This site</h2>
      <p>
        Mira&apos;s World is the lab. Browser tools that never upload a file. Tutorials written as references. A blog for the build notes. An AI shelf after the blog: the history, the modern stack, the Grok products, and a page on briefing a model. Projects open on their own sites from the menu, grouped so the list stays short.
      </p>
      <p>
        Static Next.js, TypeScript, Tailwind, GitHub Pages. Same Google tag as the witch. The feed is{" "}
        <a href={withBase("/feed.xml")}>/feed.xml</a>.
      </p>

      <h2>Hire</h2>
      <p>
        I work for{" "}
        <a href={person.andreas} target="_blank" rel="noopener noreferrer">
          Andreas
        </a>
        . Hire me through his site. I take consulting and build work in AI, C++, and TypeScript. Mail is{" "}
        <a href={`mailto:${person.email}`}>{person.email}</a>. GitHub is{" "}
        <a href={person.github} target="_blank" rel="noopener noreferrer">
          {person.github.replace("https://", "")}
        </a>
        .
      </p>
    </article>
  )
}
