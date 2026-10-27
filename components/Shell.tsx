import { Footer } from "./Footer"
import { Header } from "./Header"
import { Notice } from "./Notice"
import { SideLeft } from "./SideLeft"
import { SideRight } from "./SideRight"

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-36 sm:pb-32">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Header />
      <Notice />
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 items-start justify-center gap-6 px-3 py-6 sm:px-5">
        <SideLeft />
        <main id="main" className="min-w-0 w-full max-w-[68rem] flex-1">
          {children}
        </main>
        <SideRight />
      </div>
      <Footer />
    </div>
  )
}
