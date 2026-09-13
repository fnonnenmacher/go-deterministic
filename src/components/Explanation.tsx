export function Explanation() {
  return (
    <div className="flex flex-col gap-3 border-t border-border pt-3">
      <div className="text-[15px] font-semibold">Why this exists</div>
      <div className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
        We're not anti-AI — we use it constantly. But a prompt is a request to a probabilistic system, and some jobs
        don't need one: a find-and-replace, a rename, a sort. Those are a deterministic script away — faster, free,
        and exactly right every time. GoDeterministic marks those moments, right inside the prompt, so the next
        person can see it too.
      </div>
    </div>
  )
}
