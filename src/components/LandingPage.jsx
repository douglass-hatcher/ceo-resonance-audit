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
          <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-6">
            You've been doing this work for years. Now there's a system for it.
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-5">
            I built this for every exec comms pro who's struggled to find data that proves their value or watched their CEO's narrative drift while competitors claimed the territory.
          </p>
          <p className="text-center text-sm" style={{ color: '#00A79D' }}>
            Built for exec comms professionals. Designed to make every CCO's life measurably easier.
          </p>
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

          <p>
            You've been auditing your CEO's visibility, tracking message drift, worrying about internal clarity. You've been doing it instinctively, without a framework, without a score, without anything you could give your CCO to put in front of a CFO and call evidence. The CEO Resonance Audit changes that.
          </p>

          <p>
            It scores your CEO's profile on two dimensions. External visibility: how they show up in media, on platforms, and at conferences relative to the peers competing for the same narrative territory. Internal clarity: whether their message lands with enough precision to drive the behavior the strategy actually requires. You leave with a Resonance Score, a Narrative Arbitrage analysis identifying the specific uncontested white space your CEO can claim before competitors notice the gap, and three prioritized opportunities each connected to assets your CEO already has.
          </p>

          <p style={{ borderLeft: '3px solid #00A79D', paddingLeft: '20px', fontSize: '13px', color: '#9ab0c8' }}>
            The research says this moment is real. Gartner predicts 45% of CCOs will adopt narrative intelligence tools by 2026. Korn Ferry found that nearly one in three Fortune 500 CCOs have no formal approach to AI-driven communications. The Medill CCO Monitor found that data and measurement fluency is the skill gap CCOs most need to close. And DHR Global found that only 12% of entry-level employees say their organization has communicated very clearly about AI, even when 69% of C-suite leaders believe they have. The gap between what leaders think they're saying and what employees are actually hearing is measurable. This tool measures it.
          </p>

          <p>
            Media monitoring tools like Meltwater and Cision track press coverage. Business dashboards like Tableau and Power BI track revenue and KPIs. Nothing has measured whether a CEO's narrative is actually working, where the white space is, and whether the message is landing internally. Until now.
          </p>

          <p>
            Plan for 60 to 90 minutes per audit. This is a serious diagnostic, not a survey. The communications leaders who will find it most useful are the ones who already know their CEO's narrative infrastructure deserves this level of rigor.
          </p>

          <p>
            The CEO Resonance Audit is the diagnostic front door to the Executive Communications Operating System, a broader dashboard in development built on two principles. Narrative Arbitrage: finding the specific uncontested territory your CEO can claim before competitors notice the gap. Narrative Leverage: engineering one CEO moment to generate maximum downstream value across every channel simultaneously. One hour of CEO time producing forty hours of communications impact. Coming modules include the Executive Communications Chessboard, a Message Alignment Auditor, an Executive Readiness Tracker, and a Value Score that gives the communications function a defensible answer to the CFO's question: what is this function actually worth.
          </p>

          <p>
            Everything you enter stays in your browser session. Nothing is stored in a database. Nothing is shared. When you close the tab it's gone.
          </p>

          <p>
            Currently in beta. I'm looking for two or three communications leaders willing to run a CEO profile through it and tell me honestly what's wrong with it.
          </p>

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
