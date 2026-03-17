export default function LandingPage({ onSelect }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-8 py-6 border-b border-navy-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-teal text-sm font-semibold tracking-widest uppercase">
            CEO Resonance Audit
          </span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-6">
            Your CEO is more influential than<br className="hidden md:block" />
            their narrative suggests.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            The CEO Resonance Audit diagnoses your CEO's external visibility and internal clarity.
            You'll leave with a score, a gap analysis, and three prioritized opportunities.
            It takes under 20 minutes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mb-16">
          {/* Card 1: Visibility */}
          <AuditCard
            onClick={() => onSelect('visibility')}
            label="CEO Visibility Audit"
            subtitle="How your CEO shows up in the world."
            badge={null}
            highlighted={false}
          />

          {/* Card 2: Clarity */}
          <AuditCard
            onClick={() => onSelect('clarity')}
            label="CEO Clarity Audit"
            subtitle="How your CEO's message lands inside the organization."
            badge={null}
            highlighted={false}
          />

          {/* Card 3: Both — Recommended */}
          <AuditCard
            onClick={() => onSelect('both')}
            label="Run Both"
            subtitle="The complete CEO Resonance Audit."
            badge="Recommended"
            highlighted={true}
          />
        </div>

        {/* Footer line */}
        <p className="text-slate-600 text-xs tracking-wide text-center max-w-lg">
          Built on 15 years of executive communications practice across Fortune 200,
          U.S. Senate, and higher education environments.
        </p>
      </main>
    </div>
  )
}

function AuditCard({ onClick, label, subtitle, badge, highlighted }) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative text-left p-8 rounded-lg border transition-all duration-200
        ${highlighted
          ? 'border-gold bg-navy-card hover:bg-navy-elevated'
          : 'border-navy-border bg-navy-card hover:bg-navy-elevated hover:border-slate-600'
        }
      `}
    >
      {badge && (
        <span className="absolute -top-3 left-6 bg-navy px-3 py-1 text-gold text-xs font-semibold tracking-widest uppercase border border-gold rounded-sm">
          {badge}
        </span>
      )}

      <div className="mb-4">
        <div className={`w-8 h-px mb-6 ${highlighted ? 'bg-gold' : 'bg-teal'}`} />
        <h2 className="text-white text-lg font-semibold mb-2 leading-snug">{label}</h2>
        <p className="text-slate-400 text-sm leading-relaxed">{subtitle}</p>
      </div>

      <div className={`
        flex items-center text-sm font-medium mt-6 transition-colors
        ${highlighted ? 'text-gold group-hover:text-gold' : 'text-teal group-hover:text-teal'}
      `}>
        Start audit
        <svg
          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  )
}
