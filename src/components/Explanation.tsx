import { ProcessDiagram } from './ProcessDiagram'

export function Explanation() {
  return (
    <div className="flex flex-col gap-6 border-t border-border pt-6">
      <div className="flex flex-col gap-2">
        <div className="text-[15px] font-semibold">Why this exists</div>
        <div className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
          We're not anti-AI — we use it constantly. But a prompt is a request to a probabilistic system, and some
          jobs don't need one: a find-and-replace, a rename, a sort. Those are a deterministic script away — faster,
          free, and exactly right every time, especially once you're running it at scale. It takes both: prompt to
          get the script, run the script for the repeatable part, and keep prompting for whatever genuinely can't be
          scripted.
        </div>
      </div>
      <ProcessDiagram />
    </div>
  )
}
