import { Hero } from "@/components/hero";
import { MCUList } from "@/components/mcu-list";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { SiteHeader } from "@/components/site-header";
import { mcuItems } from "@/data/mcu";
import { ESSENTIAL_COUNT } from "@/lib/mcu";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <ProgressDashboard />
        <MCUList />
      </main>
      <footer className="border-t border-gutter">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 sm:px-6">
          <p className="credit-type text-[0.6rem] text-paper-dim">
            {mcuItems.length} titles catalogued · {ESSENTIAL_COUNT} marked
            essential for Doomsday
          </p>
          <p className="max-w-[68ch] text-xs leading-relaxed text-paper-dim">
            An unofficial fan-made checklist. Not affiliated with or endorsed by
            Marvel Studios or The Walt Disney Company. Progress is stored only in
            this browser — no account, no sync, no tracking. Release dates for
            unreleased titles are studio announcements and can change.
          </p>
        </div>
      </footer>
    </>
  );
}
