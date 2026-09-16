import { useRef } from 'react'

const SHARED_CLASS =
  'min-h-[200px] w-full whitespace-pre-wrap break-words rounded-2xl border px-6 py-5 font-mono text-[13.5px] leading-relaxed'

function BracketHighlight({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]*\])/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <strong key={i} className="font-bold text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function HighlightedTextarea({
  value,
  onChange,
  className = '',
}: {
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const syncScroll = () => {
    if (textareaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className={`${SHARED_CLASS} pointer-events-none overflow-hidden border-transparent bg-card text-ink`}
      >
        <BracketHighlight text={value + '\n'} />
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        spellCheck={false}
        className={`${SHARED_CLASS} absolute inset-0 resize-none border-border bg-transparent text-transparent caret-ink outline-none focus:border-brand`}
      />
    </div>
  )
}
