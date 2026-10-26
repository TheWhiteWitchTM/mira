"use client"

import { useState } from "react"
import { toast } from "sonner"
import dataRaw from "@emoji-mart/data"
import { Button, Input } from "@/components/ui"

const data = dataRaw as { emojis: Record<string, { name?: string; keywords?: string[] }> }

const countryCodes = [
  "ad","ae","af","ag","ai","al","am","ao","aq","ar","as","at","au","aw","ax","az","ba","bb","bd","be","bf","bg","bh","bi","bj","bl","bm","bn","bo","bq","br","bs","bt","bw","by","bz","ca","cc","cd","cf","cg","ch","ci","ck","cl","cm","cn","co","cp","cr","cu","cv","cw","cx","cy","cz","de","dg","dj","dk","dm","do","dz","ea","ec","ee","eg","eh","er","es","et","eu","fi","fj","fk","fm","fo","fr","ga","gb","gd","ge","gf","gg","gh","gi","gl","gm","gn","gp","gq","gr","gs","gt","gu","gw","gy","hk","hm","hn","hr","ht","hu","ic","id","ie","il","im","in","io","iq","ir","is","it","je","jm","jo","jp","ke","kg","kh","ki","km","kn","kp","kr","kw","ky","kz","la","lb","lc","li","lk","lr","ls","lt","lu","lv","ly","ma","mc","md","me","mf","mg","mh","mk","ml","mm","mn","mo","mp","mq","mr","ms","mt","mu","mv","mw","mx","my","mz","na","nc","ne","nf","ng","ni","nl","no","np","nr","nu","nz","om","pa","pe","pf","pg","ph","pk","pl","pm","pn","pr","ps","pt","pw","py","qa","re","ro","rs","ru","rw","sa","sb","sc","sd","se","sg","sh","si","sj","sk","sl","sm","sn","so","sr","ss","st","sv","sx","sy","sz","ta","tc","td","tf","tg","th","tj","tk","tl","tm","tn","to","tr","tt","tv","tw","tz","ua","ug","um","un","us","uy","uz","va","vc","ve","vg","vi","vn","vu","wf","ws","xk","ye","yt","za","zm","zw",
]

function codeToFlag(code: string): string {
  if (code.length !== 2) return "?"
  const offset = 0x1f1e6
  return String.fromCodePoint(offset + code[0].toUpperCase().charCodeAt(0) - 65, offset + code[1].toUpperCase().charCodeAt(0) - 65)
}

function findFlag(term: string): string {
  const clean = term.trim().toLowerCase()
  if (!clean) return ""
  if (clean.length === 2 && countryCodes.includes(clean)) return codeToFlag(clean)
  for (const code of countryCodes) {
    const entry = data.emojis?.[`flag_${code}`]
    const searchable = [(entry?.name || "").toLowerCase(), ...(entry?.keywords || []).map((k) => k.toLowerCase()), code]
    if (searchable.some((s) => s.includes(clean))) return codeToFlag(code)
  }
  return "?"
}

export function FlagBuilder() {
  const [search, setSearch] = useState("")
  const terms = search.replace(/,/g, " ").split(/\s+/).map((t) => t.trim()).filter(Boolean)
  const built = terms.map(findFlag).join("")

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast("Copied", { description: label }))
  }

  return (
    <div className="mt-6 space-y-4">
      <Input placeholder="eu de germany france japan" value={search} onChange={(event) => setSearch(event.target.value)} />
      {search.trim() ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-4xl">{built}</span>
          <Button type="button" variant="line" onClick={() => copy(built, "Flag sequence")}>
            Copy
          </Button>
        </div>
      ) : null}
      <div className="frame max-h-[540px] overflow-y-auto p-4">
        <h2 className="mb-3 text-lg font-semibold text-white">Country and region flags ({countryCodes.length})</h2>
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-10 md:grid-cols-12">
          {countryCodes.map((code) => {
            const char = codeToFlag(code)
            return (
              <button key={code} type="button" title={code.toUpperCase()} className="rounded-md p-2 text-2xl hover:bg-accent/10" onClick={() => copy(char, code.toUpperCase())}>
                {char}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
