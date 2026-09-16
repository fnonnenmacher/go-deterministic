import { useMemo, useState } from 'react'
import { Header } from './Header'
import { PromptView } from './PromptView'
import { BetterList } from './BetterList'
import { BookFooter } from './BookFooter'
import { HighlightedTextarea } from './HighlightedTextarea'
import { LocalGenerator } from './LocalGenerator'
import {
  parseDoc,
  parseImprovements,
  stringifyImprovements,
  toSegments,
  toInlineFormat,
  decodeDoc,
  TEMPLATE_TEXT,
} from '../promptDoc'

function buildAgentPrompt(promptText: string): string {
  return `Read the prompt below and suggest specific improvements to it — places where a
deterministic script, a clearer instruction, or a different tool would beat asking an LLM to
figure it out fresh each time.

Prompt:
${promptText || '<paste your prompt here>'}

Reply with one line per improvement: the exact substring from the prompt in square brackets,
then your comment on the line(s) after it. For example:

[<exact substring from the prompt this comment is about>]
<what to do instead, and why>
[<next substring>]
<comment>`
}

function getInitialDoc() {
  const params = new URLSearchParams(window.location.search)
  const doc = params.get('doc')
  if (!doc) return parseDoc(TEMPLATE_TEXT)
  try {
    return parseDoc(decodeDoc(doc))
  } catch {
    return parseDoc(TEMPLATE_TEXT)
  }
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="shrink-0 rounded-[9px] border border-border bg-card px-4 py-2 text-[13px] font-semibold text-ink hover:bg-brand-soft"
    >
      {copied ? 'Copied!' : label}
    </button>
  )
}

function ShareButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="self-start rounded-[9px] bg-brand px-5 py-3 text-[14px] font-semibold text-white hover:opacity-90"
    >
      {copied ? 'Link copied!' : 'Copy shareable link →'}
    </button>
  )
}

export function EditorPage() {
  const initialDoc = useMemo(getInitialDoc, [])
  const [promptText, setPromptText] = useState(initialDoc.prompt)
  const [improvementsText, setImprovementsText] = useState(() => stringifyImprovements(initialDoc.improvements))

  const doc = useMemo(
    () => ({ prompt: promptText.trim(), improvements: parseImprovements(improvementsText) }),
    [promptText, improvementsText],
  )
  const segments = useMemo(() => toSegments(doc), [doc])
  const agentPrompt = useMemo(() => buildAgentPrompt(doc.prompt), [doc.prompt])

  const shareUrl = useMemo(() => {
    const url = new URL(import.meta.env.BASE_URL, window.location.origin)
    url.searchParams.set('p', toInlineFormat(doc))
    return url.toString()
  }, [doc])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center px-6 pt-16 pb-14">
        <div className="flex w-full max-w-[860px] flex-col gap-10">
          <Header />

          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold tracking-tight">Show someone how to improve their prompt</div>
            <div className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              Paste their prompt, then point out what you'd change. The link opens the demo with
              your notes already on it — this editor is just how you get there.
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold tracking-wide text-ink-soft uppercase">Their prompt</label>
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              spellCheck={false}
              className="min-h-[140px] w-full rounded-2xl border border-border bg-card px-6 py-5 font-mono text-[13.5px] leading-relaxed text-ink outline-none focus:border-brand"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <label className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
                Your improvements
              </label>
              <a href="#agent-section" className="text-xs font-semibold text-brand hover:underline">
                Generate improvements with an LLM ↓
              </a>
            </div>
            <HighlightedTextarea value={improvementsText} onChange={setImprovementsText} />
            <div className="text-[13px] leading-relaxed text-ink-faint">
              Put the exact text from the prompt in <code className="rounded border border-border bg-bg px-1 py-0.5 text-[12px]">[brackets]</code>{' '}
              on its own line, followed by your comment. Leave this empty if the prompt is fine as is.
            </div>
            <ShareButton text={shareUrl} />
          </div>

          <div className="flex flex-col gap-10">
            <PromptView segments={segments} />
            <BetterList segments={segments} />
          </div>

          <div id="agent-section" className="flex flex-col gap-3 border-l-4 border-brand pl-5 scroll-mt-10">
            <div className="text-xs font-semibold tracking-wider text-brand uppercase">
              Let a coding agent write it
            </div>
            <div className="max-w-2xl text-[14.5px] leading-relaxed text-ink-soft">
              Hand a coding agent your prompt and this instruction — it already includes what you've
              written above — and paste what comes back into the improvements box.
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4">
              <pre className="flex-1 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-ink-soft whitespace-pre-wrap">
                {agentPrompt}
              </pre>
              <CopyButton text={agentPrompt} label="Copy" />
            </div>
            <LocalGenerator agentInstruction={agentPrompt} onResult={setImprovementsText} />
          </div>
        </div>
      </div>
      <BookFooter />
    </div>
  )
}
