import Link from "next/link"

export default function NotFound() {
  return (
    <div className="space-y-4">
      <p className="kicker">404</p>
      <h1 className="text-4xl font-semibold tracking-tight text-white">That page is not here.</h1>
      <p className="max-w-prose text-muted">The lab moved. Try home, or the menu.</p>
      <p>
        <Link href="/" className="text-accent hover:text-accent-2">
          Back to Mira&apos;s World →
        </Link>
      </p>
    </div>
  )
}
