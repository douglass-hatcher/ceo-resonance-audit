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
      <main className="flex-1 flex flex-col items-center px-6 py-20">
        <div className="max-w-2xl w-full text-center mb-6">
          <h1 className="font-semibold text-white leading-tight tracking-tight mb-6" style={{ fontSize: '18px' }}>
            <span className="block">How visible is your CEO compared to the peers competing for the same conversations?</span>
            <span className="block">Is your CEO's message actually changing how employees work?</span>
            <span className="block" style={{ marginTop: '24px' }}>The CEO Resonance Audit measures both and shows you exactly where to move first.</span>
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mb-20">
          <AuditCard
            onClick={() => onSelect('visibility')}
            label="CEO Visibility Audit"
            subtitle="How your CEO shows up in the world."
            badge={null}
            highlighted={false}
          />
          <AuditCard
            onClick={() => onSelect('clarity')}
            label="CEO Clarity Audit"
            subtitle="How your CEO's message lands inside the organization."
            badge={null}
            highlighted={false}
          />
          <AuditCard
            onClick={() => onSelect('both')}
            label="Run Both"
            subtitle="The complete CEO Resonance Audit."
            badge="Recommended"
            highlighted={true}
          />
        </div>

        {/* Prose sections */}
        <div className="max-w-2xl w-full space-y-10 text-slate-400 text-base leading-relaxed">

          <div>
            <h3 className="text-white font-bold text-base mb-2">What makes the CEO Resonance Audit different?</h3>
            <p>Media monitoring tools like Meltwater and Cision track press coverage. Business dashboards like Tableau and Power BI track revenue and KPIs. Nothing has measured whether a CEO's narrative is actually working, where the gaps are, and whether the message is landing internally. Until now.</p>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-2">How long will this take?</h3>
            <p>Plan for 60 to 90 minutes per audit. This is a serious diagnostic, not a survey. The communications leaders who will find it most useful are the ones who already know their CEO's narrative infrastructure deserves this level of rigor.</p>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-2">What about privacy?</h3>
            <p>Everything you enter stays in your browser session. Nothing is stored in a database. Nothing is shared. When you close the tab it's gone. If you want a copy of your report, enter your email in the field provided and we'll send it to you. We won't keep your email.</p>
          </div>

          <div>
            <h3 className="text-white font-bold text-base mb-2">Need beta testers like you</h3>
            <p>Currently in beta. I'm looking for two or three communications leaders willing to run a CEO profile through it and tell me honestly what's wrong with it.</p>
          </div>

          <p className="text-slate-600 text-sm pt-4 border-t border-navy-border">
            Developed by Douglass Hatcher. Built on 15 years of executive communications practice across Fortune 200, U.S. Senate, and higher education environments.
          </p>

        </div>
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
