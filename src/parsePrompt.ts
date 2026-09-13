export type PromptSegment =
  | { type: 'text'; value: string }
  | { type: 'annotated'; marked: string; comment: string; index: number }

const ANNOTATION_RE = /\[([^\]]+)\]\s*\{([^}]+)\}/g

export function parsePrompt(prompt: string): PromptSegment[] {
  const segments: PromptSegment[] = []
  let lastIndex = 0
  let count = 0

  for (const match of prompt.matchAll(ANNOTATION_RE)) {
    const [full, marked, comment] = match
    const start = match.index ?? 0

    if (start > lastIndex) {
      segments.push({ type: 'text', value: prompt.slice(lastIndex, start) })
    }

    count += 1
    segments.push({ type: 'annotated', marked, comment: comment.trim(), index: count })

    lastIndex = start + full.length
  }

  if (lastIndex < prompt.length) {
    segments.push({ type: 'text', value: prompt.slice(lastIndex) })
  }

  return segments
}

export function extractCorrections(segments: PromptSegment[]) {
  return segments.filter((s): s is Extract<PromptSegment, { type: 'annotated' }> => s.type === 'annotated')
}
