import type { PromptSegment } from './parsePrompt'

export interface Improvement {
  marked: string
  comment: string
}

export interface PromptDoc {
  prompt: string
  improvements: Improvement[]
}

export const TEMPLATE_TEXT = `Open the project config.json and replace all double quotes with single quotes, then count how many lines across every file in ./logs mention ERROR, and finally rename every file in ./exports that starts with tmp_ to start with final_ instead.
---
[replace all double quotes with single quotes]
This is a simple find-and-replace — a one-line sed command is faster and 100% reliable, no need to ask an LLM: \`sed -i '' "s/\\"/'/g" config.json\`
[count how many lines across every file in ./logs mention ERROR]
Grepping is deterministic and instant — no need to have an LLM read every log line: \`grep -rho ERROR ./logs | wc -l\`
[rename every file in ./exports that starts with tmp_ to start with final_ instead]
This is a fixed rule, not a judgment call — one rename command handles it the same way every time: \`rename 's/^tmp_/final_/' ./exports/tmp_*\``

const SEPARATOR_RE = /\n-{3,}\n/
const MARKER_RE = /^\s*\[(.+)\]\s*$/

export function parseImprovements(text: string): Improvement[] {
  const improvements: Improvement[] = []
  let current: { marked: string; lines: string[] } | null = null

  for (const line of text.split('\n')) {
    const markerMatch = line.match(MARKER_RE)
    if (markerMatch) {
      if (current) {
        improvements.push({ marked: current.marked, comment: current.lines.join('\n').trim() })
      }
      current = { marked: markerMatch[1].trim(), lines: [] }
    } else if (current) {
      current.lines.push(line)
    }
  }
  if (current) {
    improvements.push({ marked: current.marked, comment: current.lines.join('\n').trim() })
  }

  return improvements.filter((i) => i.marked && i.comment)
}

export function parseDoc(text: string): PromptDoc {
  const match = text.match(SEPARATOR_RE)

  if (!match) {
    return { prompt: text.trim(), improvements: [] }
  }

  const prompt = text.slice(0, match.index).trim()
  const rest = text.slice((match.index ?? 0) + match[0].length)

  return { prompt, improvements: parseImprovements(rest) }
}

export function toSegments(doc: PromptDoc): PromptSegment[] {
  const segments: PromptSegment[] = []
  let cursor = 0
  let count = 0

  for (const { marked, comment } of doc.improvements) {
    const start = doc.prompt.indexOf(marked, cursor)
    if (start === -1) continue

    if (start > cursor) {
      segments.push({ type: 'text', value: doc.prompt.slice(cursor, start) })
    }
    count += 1
    segments.push({ type: 'annotated', marked, comment, index: count })
    cursor = start + marked.length
  }

  if (cursor < doc.prompt.length) {
    segments.push({ type: 'text', value: doc.prompt.slice(cursor) })
  }

  return segments
}

export function segmentsToDoc(segments: PromptSegment[]): PromptDoc {
  let prompt = ''
  const improvements: Improvement[] = []

  for (const segment of segments) {
    if (segment.type === 'text') {
      prompt += segment.value
    } else {
      prompt += segment.marked
      improvements.push({ marked: segment.marked, comment: segment.comment })
    }
  }

  return { prompt, improvements }
}

// Reconstructs the "[marked]{comment}" inline format that the homepage's `?p=`
// param and parsePrompt() understand, so a doc built in the editor can be
// shared as a homepage link instead of an editor link.
export function toInlineFormat(doc: PromptDoc): string {
  let result = ''
  let cursor = 0

  for (const { marked, comment } of doc.improvements) {
    const start = doc.prompt.indexOf(marked, cursor)
    if (start === -1) continue

    result += doc.prompt.slice(cursor, start)
    result += `[${marked}]{${comment}}`
    cursor = start + marked.length
  }

  result += doc.prompt.slice(cursor)
  return result
}

export function stringifyImprovements(improvements: Improvement[]): string {
  return improvements.map((i) => `[${i.marked}]\n${i.comment}`).join('\n')
}

export function stringifyDoc(doc: PromptDoc): string {
  if (doc.improvements.length === 0) return doc.prompt
  return `${doc.prompt}\n---\n${stringifyImprovements(doc.improvements)}`
}

// Produces a raw base64 string (no percent-encoding). Callers that splice this
// directly into a URL string (rather than through URLSearchParams, which does
// its own percent-encoding) must wrap the result in encodeURIComponent themselves.
export function encodeDoc(text: string): string {
  return btoa(unescape(encodeURIComponent(text)))
}

export function decodeDoc(encoded: string): string {
  return decodeURIComponent(escape(atob(encoded)))
}
