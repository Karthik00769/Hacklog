import TopNav from "@/components/top-nav"
import Hero from "@/components/hero"
import HowItWorks from "@/components/how-it-works"

export default function Page() {
  return (
    <main>
      <TopNav />
      <Hero />
      <HowItWorks />
      <section className="border-t bg-white py-12 dark:bg-neutral-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hacklog. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              className="text-muted-foreground hover:text-foreground"
              href="mailto:contact@hacklog.dev"
              aria-label="Email"
            >
              Contact
            </a>
            <a
              className="text-muted-foreground hover:text-foreground"
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            <a
              className="text-muted-foreground hover:text-foreground"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
