import type { PromptSegment } from '../parsePrompt'
import { extractCorrections } from '../parsePrompt'
import { renderInlineMarkdown } from '../markdown'

export function BetterList({ segments }: { segments: PromptSegment[] }) {
  const corrections = extractCorrections(segments)

  if (corrections.length === 0) return null

  return (
    <div className="flex flex-col gap-3.5">
      <label className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
        Better: do this instead
      </label>
      <div className="flex flex-col gap-3">
        {corrections.map((c) => (
          <div key={c.index} className="rounded-xl border border-border border-l-3 border-l-red bg-card px-6 py-5">
            <div className="flex items-start gap-3.5">
              <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-red text-xs font-bold text-white">
                {c.index}
              </span>
              <div className="flex flex-col gap-2">
                <div className="text-[15px] leading-relaxed">{renderInlineMarkdown(c.comment)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
