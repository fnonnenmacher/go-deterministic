export function Header() {
  return (
    <a href="." className="flex items-center gap-3.5 text-ink no-underline">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-ink">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6L9 12L4 18"
            stroke="#faf9f7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M13 18H20" stroke="#faf9f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="text-xl leading-tight font-bold tracking-tight">
          Go<span className="text-brand">Deterministic</span>.com
        </div>
        <div className="mt-0.5 text-sm text-ink-soft">Know when a script beats a prompt.</div>
      </div>
    </a>
  )
}
