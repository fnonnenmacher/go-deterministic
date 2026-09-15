function SkillScriptIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M5.5 4H14L18.5 8.5V19.5C18.5 20.0523 18.0523 20.5 17.5 20.5H5.5C4.94772 20.5 4.5 20.0523 4.5 19.5V5C4.5 4.44772 4.94772 4 5.5 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 4V8.5H18.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 13L9.6 14.5L8 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 16H14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function SensorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6.5 8.5C4.5 10.5 4.5 13.5 6.5 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17.5 8.5C19.5 10.5 19.5 13.5 17.5 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 19.5L12 15.5L15 19.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.7 11.3L11.3 12.9L14.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function UpgradeCard({
  icon,
  from,
  to,
  caption,
}: {
  icon: React.ReactNode
  from: string
  to: string
  caption: string
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-xl border border-border bg-card px-5 py-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">{icon}</div>
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span className="text-ink-faint line-through">{from}</span>
        <span className="text-ink-faint">→</span>
        <span className="text-ink">{to}</span>
      </div>
      <div className="text-[13px] leading-snug text-ink-soft">{caption}</div>
    </div>
  )
}

export function SkillsUpgrade() {
  return (
    <div className="flex flex-col gap-5 border-l-4 border-brand pl-5">
      <div className="flex flex-col gap-2">
        <div className="text-xs font-semibold tracking-wider text-brand uppercase">Agentic engineering</div>
        <div className="text-xl font-bold tracking-tight text-ink">
          The same idea applies to agentic engineering
        </div>
        <div className="max-w-2xl text-[14.5px] leading-relaxed text-ink-soft">
          Use this simple approach to build your coding agent harness, instead of relying only on probabilistic
          prose. A Claude skill is a prompt that only loads when it's needed — great for judgment, but it's still a
          prompt. Two small changes make skills hold up the same way scripts do.
        </div>
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row">
        <UpgradeCard
          icon={<SkillScriptIcon />}
          from="Skill alone"
          to="Skill + script"
          caption="Let the skill decide when to act, but hand the repeatable steps to a script it calls. The reasoning stays reusable; the execution stops costing tokens."
        />
        <UpgradeCard
          icon={<SensorIcon />}
          from="Skill as a guide"
          to="Feedback sensor"
          caption="A guide only shapes behavior going in, and can be missed. A sensor checks the result coming out, so the outcome is verified instead of just requested."
        />
      </div>
    </div>
  )
}
