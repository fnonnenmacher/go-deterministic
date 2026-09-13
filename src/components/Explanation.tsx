import { ProcessDiagram } from './ProcessDiagram'

export function Explanation() {
  return (
    <div className="w-full border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-[860px] flex-col gap-6 px-6 py-14">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold tracking-tight">Why this exists</div>
          <div className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            AI is brilliant at figuring out what to do — and a slow, expensive way to do it again. Turn the
            repeatable part into a script once, and it runs free, instant, and identical every time. Save your
            prompts for the calls a script can't make.
          </div>
        </div>
        <ProcessDiagram />
      </div>
    </div>
  )
}
