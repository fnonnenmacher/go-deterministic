import type { ReactNode } from 'react'

const INLINE_RE = /`([^`]+)`|\*\*([^*]+)\*\*/g

export function renderInlineMarkdown(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  let lastIndex = 0
  let key = 0

  for (const match of text.matchAll(INLINE_RE)) {
    const start = match.index ?? 0
    if (start > lastIndex) parts.push(text.slice(lastIndex, start))

    const [full, code, bold] = match
    if (code !== undefined) {
      parts.push(
        <code
          key={key++}
          className="rounded bg-bg border border-border px-1.5 py-0.5 font-mono text-[13px]"
        >
          {code}
        </code>,
      )
    } else if (bold !== undefined) {
      parts.push(<strong key={key++}>{bold}</strong>)
    }

    lastIndex = start + full.length
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex))

  return parts
}
