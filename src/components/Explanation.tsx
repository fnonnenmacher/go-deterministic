import { ProcessDiagram } from './ProcessDiagram'
import { SkillsUpgrade } from './SkillsUpgrade'

export function Explanation() {
  return (
    <div className="w-full border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-[860px] flex-col gap-8 px-6 py-14">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold tracking-tight">AI decides once. Scripts repeat forever.</div>
          <div className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            AI is genuinely good at figuring out what to do — that's exactly why it's worth using for the hard part.
            Once it has worked out the repeatable part, there's no need to ask again: turn that part into a script,
            and it runs free, instant, and identical every time. Save the prompts for the calls that still need
            judgment.
          </div>
        </div>
        <ProcessDiagram />
        <SkillsUpgrade />
      </div>
    </div>
  )
}
