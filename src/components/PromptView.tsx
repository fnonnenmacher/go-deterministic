import type { PromptSegment } from '../parsePrompt'

const MARK_CLASS =
  'rounded-[3px] bg-red-soft px-[3px] py-px underline decoration-red decoration-wavy decoration-[1.5px] underline-offset-4 [box-decoration-break:clone]'

function AnnotatedSegment({ segment }: { segment: Extract<PromptSegment, { type: 'annotated' }> }) {
  const words = segment.marked.split(' ')
  const lastWord = words.pop() ?? ''
  const prefix = words.length > 0 ? `${words.join(' ')} ` : ''

  return (
    <span>
      {prefix && <span className={MARK_CLASS}>{prefix}</span>}
      <span className="whitespace-nowrap">
        <span className={MARK_CLASS}>{lastWord}</span>
        <sup className="ml-0.5 inline-flex h-4 w-4 -translate-y-1.5 items-center justify-center rounded-full bg-red font-sans text-[11px] font-bold text-white">
          {segment.index}
        </sup>
      </span>
    </span>
  )
}

export function PromptView({ segments }: { segments: PromptSegment[] }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-semibold tracking-wide text-ink-soft uppercase">Your prompt</label>
      <div className="rounded-2xl border border-border bg-card px-8 py-7 shadow-sm">
        <div className="font-mono text-base leading-[2.1] whitespace-pre-wrap">
          {segments.map((segment, i) =>
            segment.type === 'text' ? (
              <span key={i}>{segment.value}</span>
            ) : (
              <AnnotatedSegment key={i} segment={segment} />
            ),
          )}
        </div>
      </div>
    </div>
  )
}
