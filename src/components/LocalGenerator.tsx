import { useRef, useState } from 'react'
import type { TextGenerationPipeline } from '@huggingface/transformers'

const MODEL_ID = 'onnx-community/Qwen2.5-1.5B-Instruct'
const MODEL_LABEL = 'Qwen2.5 1.5B'
const MODEL_SIZE = '~1 GB'

type Status = 'idle' | 'confirm' | 'loading' | 'ready' | 'generating' | 'error'

export function LocalGenerator({
  agentInstruction,
  onResult,
}: {
  agentInstruction: string
  onResult: (text: string) => void
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const generatorRef = useRef<TextGenerationPipeline | null>(null)

  const download = async () => {
    setStatus('loading')
    setError(null)
    setProgress(0)
    try {
      const { pipeline } = await import('@huggingface/transformers')
      const device = 'gpu' in navigator ? 'webgpu' : 'wasm'
      const generator = await pipeline('text-generation', MODEL_ID, {
        device,
        dtype: 'q4',
        progress_callback: (event: { status: string; progress?: number }) => {
          if (event.status === 'progress_total' && typeof event.progress === 'number') {
            setProgress(Math.round(event.progress))
          }
        },
      })
      generatorRef.current = generator as TextGenerationPipeline
      setStatus('ready')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the model.')
      setStatus('error')
    }
  }

  const generate = async () => {
    if (!generatorRef.current) return
    setStatus('generating')
    setError(null)
    try {
      const output = await generatorRef.current(
        [{ role: 'user', content: agentInstruction }] as unknown as string,
        { max_new_tokens: 512, do_sample: false },
      )
      const first = Array.isArray(output) ? output[0] : output
      const reply = (first as { generated_text: unknown }).generated_text
      const text = Array.isArray(reply)
        ? String((reply[reply.length - 1] as { content?: string })?.content ?? '')
        : String(reply ?? '')
      onResult(text.trim())
      setStatus('ready')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed.')
      setStatus('ready')
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card px-5 py-4">
      <div className="text-sm font-semibold text-ink">Or generate it right here, in your browser</div>

      {status === 'idle' && (
        <>
          <div className="text-[13px] leading-relaxed text-ink-soft">
            Runs {MODEL_LABEL} locally with{' '}
            <a
              href="https://huggingface.co/docs/transformers.js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline underline-offset-2"
            >
              transformers.js
            </a>{' '}
            — your prompt never leaves this tab. First use downloads the model ({MODEL_SIZE}) and caches it
            for next time.
          </div>
          <button
            type="button"
            onClick={() => setStatus('confirm')}
            className="self-start rounded-[9px] border border-border bg-bg px-4 py-2 text-[13px] font-semibold text-ink hover:bg-brand-soft"
          >
            Set up local generation
          </button>
        </>
      )}

      {status === 'confirm' && (
        <>
          <div className="text-[13px] leading-relaxed text-ink-soft">
            This downloads {MODEL_LABEL} ({MODEL_SIZE}) from Hugging Face and keeps it cached in this
            browser. It only happens once — proceed?
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={download}
              className="rounded-[9px] bg-brand px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90"
            >
              Download model
            </button>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="rounded-[9px] border border-border bg-bg px-4 py-2 text-[13px] font-semibold text-ink hover:bg-brand-soft"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {status === 'loading' && (
        <div className="flex flex-col gap-2">
          <div className="text-[13px] text-ink-soft">Downloading {MODEL_LABEL}… {progress}%</div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-bg">
            <div
              className="h-full rounded-full bg-brand transition-[width]"
              style={{ width: `${Math.max(progress, 3)}%` }}
            />
          </div>
        </div>
      )}

      {(status === 'ready' || status === 'generating') && (
        <button
          type="button"
          onClick={generate}
          disabled={status === 'generating'}
          className="self-start rounded-[9px] bg-brand px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {status === 'generating' ? 'Generating…' : 'Generate improvements'}
        </button>
      )}

      {status === 'error' && (
        <>
          <div className="text-[13px] text-red">{error}</div>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="self-start rounded-[9px] border border-border bg-bg px-4 py-2 text-[13px] font-semibold text-ink hover:bg-brand-soft"
          >
            Try again
          </button>
        </>
      )}
    </div>
  )
}
