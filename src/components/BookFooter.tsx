export function BookFooter() {
  return (
    <div className="w-full bg-ink">
      <div className="mx-auto flex w-full max-w-[860px] flex-col items-center gap-6 px-6 py-12 text-center sm:flex-row sm:text-left">
        <div
          className="flex h-[88px] w-16 shrink-0 items-center justify-center rounded"
          style={{
            background: 'linear-gradient(160deg, oklch(0.5 0.16 264), oklch(0.32 0.12 264))',
            boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 19.5C4 18.1193 5.11929 17 6.5 17H20"
              stroke="#faf9f7"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 2H20V22H6.5C5.11929 22 4 20.8807 4 19.5V4.5C4 3.11929 5.11929 2 6.5 2Z"
              stroke="#faf9f7"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <div className="text-xs font-semibold tracking-wider text-[oklch(0.75_0.03_264)] uppercase">
            From the authors of an O'Reilly book
          </div>
          <div className="text-lg font-bold text-[#faf9f7]">Building AI Agent Platforms</div>
          <div className="max-w-[480px] text-sm text-[oklch(0.82_0.01_264)]">
            The engineering playbook for shipping reliable, production-grade agent systems — including when to reach
            for a prompt, and when not to.
          </div>
        </div>
        <a
          href="#"
          className="shrink-0 rounded-[9px] bg-[#faf9f7] px-[18px] py-2.5 text-[13.5px] font-semibold whitespace-nowrap text-ink"
        >
          Get the book
        </a>
      </div>
    </div>
  )
}
