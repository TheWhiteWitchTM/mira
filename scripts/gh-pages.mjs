import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const outDir = join(root, "out")

if (!existsSync(outDir)) {
  console.error("out/ is missing. next build did not write the export.")
  process.exit(1)
}

writeFileSync(join(outDir, ".nojekyll"), "")

function collectNames(dir, names = new Set()) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (entry.startsWith("_") || entry.startsWith(".")) names.add(entry)
    if (statSync(full).isDirectory()) collectNames(full, names)
  }
  return names
}

const landing = join(root, "..", "TheWhiteWitchTM.github.io")
if (existsSync(landing)) {
  const dest = join(landing, "mira")
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true })
  mkdirSync(dest, { recursive: true })
  cpSync(outDir, dest, { recursive: true })

  const configPath = join(landing, "_config.yml")
  if (existsSync(configPath)) {
    const names = [...collectNames(outDir)]
    const must = ["_next", "_not-found", ".nojekyll"]
    const incoming = [...new Set([...must, ...names])]
    let config = readFileSync(configPath, "utf8")
    const match = config.match(/^include:\n(?:  - .+\n)*/m)
    const existing = match ? [...match[0].matchAll(/^  - (.+)\n/gm)].map((item) => item[1]) : []
    const include = [...new Set([...existing, ...incoming])].sort()
    const block = `include:\n${include.map((name) => `  - ${name}`).join("\n")}\n`
    config = match ? config.replace(match[0], block) : `${config.trimEnd()}\n\n${block}`
    writeFileSync(configPath, config)
    console.log(`copied out/ → ${dest}`)
    console.log(`merged ${configPath} include (${include.length} names)`)
  }
} else {
  console.log("landing repo not next to this one; skipped copy")
}

console.log("gh-pages: .nojekyll written")
