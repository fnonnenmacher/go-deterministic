import ReactMarkdown, { type Components } from 'react-markdown'
import type { PromptSegment } from '../parsePrompt'
import { extractCorrections } from '../parsePrompt'

const markdownComponents: Components = {
  p: ({ children }) => <>{children}</>,
  code: ({ children }) => (
    <code className="rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[13px]">{children}</code>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-brand underline underline-offset-2">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5">{children}</ol>,
}

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
              <div className="text-[15px] leading-relaxed">
                <ReactMarkdown components={markdownComponents}>{c.comment}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
