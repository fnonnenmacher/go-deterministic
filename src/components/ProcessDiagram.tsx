import type { ReactNode } from 'react'

function PromptIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 5.5C4 4.67157 4.67157 4 5.5 4H18.5C19.3284 4 20 4.67157 20 5.5V14.5C20 15.3284 19.3284 16 18.5 16H9L5 19.5V16H5.5C4.67157 16 4 15.3284 4 14.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 8.5H16M8 11.5H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ScriptIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M8.5 8L4.5 12L8.5 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 8L19.5 12L15.5 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13.5 5.5L10.5 18.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function RunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 8.5L15.5 12L10 15.5V8.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}

function JudgmentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5L13.8 9.2L19.5 11L13.8 12.8L12 18.5L10.2 12.8L4.5 11L10.2 9.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowConnector() {
  return (
    <svg
      className="hidden shrink-0 self-center text-ink-faint sm:block"
      width="28"
      height="16"
      viewBox="0 0 28 16"
      fill="none"
    >
      <path d="M1 8H25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19 3L25 8L19 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Step({ icon, title, caption }: { icon: ReactNode; title: string; caption: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-5 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">{icon}</div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-[13px] leading-snug text-ink-soft">{caption}</div>
    </div>
  )
}

export function ProcessDiagram() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:gap-2">
        <Step icon={<PromptIcon />} title="Prompt" caption="Ask AI to write the script" />
        <ArrowConnector />
        <Step icon={<ScriptIcon />} title="Script" caption="Deterministic, reviewable code" />
        <ArrowConnector />
        <Step icon={<RunIcon />} title="Run" caption="Fast, free, exactly repeatable" />
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-brand-soft bg-brand-soft px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card text-brand">
          <JudgmentIcon />
        </div>
        <div className="text-[14px] leading-snug text-ink-soft">
          <span className="font-semibold text-ink">Still prompt for the rest: </span>
          judgment calls, one-off requests, and anything too ambiguous to reduce to a rule. That's where AI earns its
          keep — scripting the repeatable part just frees it up for that.
        </div>
      </div>
    </div>
  )
}
