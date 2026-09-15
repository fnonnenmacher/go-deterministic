import { useMemo, useState } from 'react'
import { Header } from './Header'
import { PromptView } from './PromptView'
import { BetterList } from './BetterList'
import { BookFooter } from './BookFooter'
import { parseDoc, toSegments, encodeDoc, decodeDoc, TEMPLATE_TEXT } from '../promptDoc'

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

function getInitialSource(): string {
  const params = new URLSearchParams(window.location.search)
  const doc = params.get('doc')
  if (!doc) return TEMPLATE_TEXT
  try {
    return decodeDoc(doc)
  } catch {
    return TEMPLATE_TEXT
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

export function EditorPage() {
  const [source, setSource] = useState(getInitialSource)

  const doc = useMemo(() => parseDoc(source), [source])
  const segments = useMemo(() => toSegments(doc), [doc])
  const agentPrompt = useMemo(() => buildAgentPrompt(doc.prompt), [doc.prompt])

  const shareUrl = useMemo(() => {
    const url = new URL(window.location.href)
    url.hash = 'editor'
    url.searchParams.set('doc', encodeDoc(source))
    return url.toString()
  }, [source])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center px-6 pt-16 pb-14">
        <div className="flex w-full max-w-[860px] flex-col gap-10">
          <Header />

          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold tracking-tight">Show someone how to improve their prompt</div>
            <div className="max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              Paste their prompt, then point out what you'd change. Share the link so they can see
              exactly what you mean.
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
              Your prompt, then the improvements
            </label>
            <div className="relative">
              <textarea
                value={source}
                onChange={(e) => setSource(e.target.value)}
                spellCheck={false}
                className="min-h-[240px] w-full rounded-2xl border border-border bg-card px-6 py-5 pr-[9.5rem] font-mono text-[13.5px] leading-relaxed text-ink outline-none focus:border-brand"
              />
              <div className="absolute top-4 right-4">
                <CopyButton text={shareUrl} label="Copy link" />
              </div>
            </div>
            <div className="text-[13px] leading-relaxed text-ink-faint">
              Just a prompt is fine on its own. To flag an improvement, add a line below{' '}
              <code className="rounded border border-border bg-bg px-1 py-0.5 text-[12px]">---</code> with the
              exact text in <code className="rounded border border-border bg-bg px-1 py-0.5 text-[12px]">[brackets]</code>{' '}
              followed by your comment.
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <PromptView segments={segments} />
            <BetterList segments={segments} />
          </div>

          <div className="flex flex-col gap-3 border-l-4 border-brand pl-5">
            <div className="text-xs font-semibold tracking-wider text-brand uppercase">
              Let a coding agent write it
            </div>
            <div className="max-w-2xl text-[14.5px] leading-relaxed text-ink-soft">
              Hand a coding agent your prompt and this instruction — it already includes what you've
              written above — and paste what comes back under the <code className="rounded border border-border bg-bg px-1 py-0.5 text-[12px]">---</code>.
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4">
              <pre className="flex-1 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-ink-soft whitespace-pre-wrap">
                {agentPrompt}
              </pre>
              <CopyButton text={agentPrompt} label="Copy" />
            </div>
          </div>
        </div>
      </div>
      <BookFooter />
    </div>
  )
}
