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
    const names = [...collectNames(outDir)].sort()
    const must = ["_next", "_not-found", ".nojekyll"]
    const include = [...new Set([...must, ...names])].sort()
    let config = readFileSync(configPath, "utf8")
    const block = `include:\n${include.map((name) => `  - ${name}`).join("\n")}\n`
    if (/^include:\n(?:  - .+\n)+/m.test(config)) {
      config = config.replace(/^include:\n(?:  - .+\n)+/m, block)
    } else {
      config += `\n${block}`
    }
    writeFileSync(configPath, config)
    console.log(`copied out/ → ${dest}`)
    console.log(`updated ${configPath} include (${include.length} names)`)
  }
} else {
  console.log("landing repo not next to this one; skipped copy")
}

console.log("gh-pages: .nojekyll written")
