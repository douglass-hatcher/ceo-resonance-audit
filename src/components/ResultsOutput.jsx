import { useState } from 'react'

export default function ResultsOutput({ results, auditType, error, onRestart }) {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    await fetch('https://formspree.io/f/meerpvvz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setEmailSent(true)
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="w-12 h-12 rounded-full bg-red-900/30 border border-red-700/50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-semibold mb-3">Something went wrong</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">{error}</p>
          <button onClick={onRestart} className="btn-primary">
            Start over
          </button>
        </div>
      </div>
    )
  }

  if (!results) return null

  const hasVisibility = auditType === 'visibility' || auditType === 'both'
  const hasClarity = auditType === 'clarity' || auditType === 'both'
  const hasBoth = auditType === 'both'

  const resonanceScore = hasBoth
    ? Math.round(((results.visibility_score || 0) + (results.clarity_score || 0)) / 2)
    : null

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="px-8 py-6 border-b border-navy-border sticky top-0 bg-navy z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-teal text-sm font-semibold tracking-widest uppercase">
            CEO Resonance Audit
          </span>
          <button
            onClick={onRestart}
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
          >
            Run another audit
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-0">

        {/* ─── Section A: The Score ─── */}
        <section className="fade-in">
          <div className="mb-4">
            <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-6">
              Your Results
            </p>

            {hasBoth ? (
              /* Both audits: two scores side by side + combined */
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <ScoreCard
                    label="CEO Visibility Score"
                    score={results.visibility_score}
                    small
                  />
                  <ScoreCard
                    label="CEO Clarity Score"
                    score={results.clarity_score}
                    small
                  />
                </div>
                <ScoreCard
                  label="CEO Resonance Score"
                  score={resonanceScore}
                  large
                />
                {results.combined_finding_sentence && (
                  <p className="text-slate-300 text-base leading-relaxed border-l-2 border-teal pl-5">
                    {results.combined_finding_sentence}
                  </p>
                )}
              </div>
            ) : hasVisibility && !hasClarity ? (
              /* Visibility only */
              <div className="space-y-6">
                <ScoreCard label="CEO Visibility Score" score={results.visibility_score} large />
                {results.visibility_gap_sentence && (
                  <p className="text-slate-300 text-base leading-relaxed border-l-2 border-teal pl-5">
                    {results.visibility_gap_sentence}
                  </p>
                )}
              </div>
            ) : (
              /* Clarity only */
              <div className="space-y-6">
                <ScoreCard label="CEO Clarity Score" score={results.clarity_score} large />
                {results.ai_translation_gap_score != null && (
                  <div className="mt-4">
                    <ScoreCard
                      label="AI Translation Gap Score"
                      score={results.ai_translation_gap_score}
                      small
                      dim
                    />
                  </div>
                )}
                {results.clarity_gap_sentence && (
                  <p className="text-slate-300 text-base leading-relaxed border-l-2 border-teal pl-5">
                    {results.clarity_gap_sentence}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="divider" />

        {/* ─── Section B: The Analysis ─── */}
        <section className="fade-in fade-in-delay-1 space-y-12">
          <p className="text-teal text-xs font-semibold tracking-widest uppercase">
            The Analysis
          </p>

          {/* Narrative Arbitrage */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-1">Narrative Arbitrage</h2>
            <p className="text-slate-500 text-xs mb-6 uppercase tracking-wide">
              The specific uncontested territory this CEO can claim
            </p>
            <div className="space-y-4 text-slate-300 text-[15px] leading-[1.75]">
              {splitParagraphs(results.narrative_arbitrage).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Narrative Leverage */}
          <div>
            <h2 className="text-white text-xl font-semibold mb-1">Narrative Leverage</h2>
            <p className="text-slate-500 text-xs mb-6 uppercase tracking-wide">
              How one action generates maximum downstream value
            </p>
            <div className="space-y-4 text-slate-300 text-[15px] leading-[1.75]">
              {splitParagraphs(results.narrative_leverage).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* ─── Section C: Three Prioritized Opportunities ─── */}
        <section className="fade-in fade-in-delay-2">
          <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-8">
            Three Prioritized Opportunities
          </p>

          <div className="space-y-5">
            {[results.opportunity_1, results.opportunity_2, results.opportunity_3]
              .filter(Boolean)
              .map((opp, i) => (
                <OpportunityCard key={i} index={i + 1} opportunity={opp} />
              ))}
          </div>
        </section>
      </div>

      {/* ─── Email Capture Bar ─── */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy-card border-t border-navy-border px-6 py-4 z-20">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {!emailSent ? (
            <>
              <p className="text-slate-300 text-sm shrink-0">
                Save your full CEO Resonance Audit report.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex gap-3 w-full sm:w-auto sm:flex-1 sm:max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input-field flex-1 py-2.5"
                />
                <button type="submit" className="btn-primary whitespace-nowrap py-2.5">
                  Send My Report
                </button>
              </form>
            </>
          ) : (
            <p className="text-teal text-sm font-medium">
              Report saved. We'll send it to {email}.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function ScoreCard({ label, score, large = false, small = false, dim = false }) {
  return (
    <div className={`bg-navy-card border border-navy-border rounded-lg p-6 ${large ? 'text-center' : ''}`}>
      <p className={`text-slate-400 text-xs font-medium tracking-wide uppercase mb-3 ${large ? 'text-center' : ''}`}>
        {label}
      </p>
      <div className={`font-semibold tabular-nums ${dim ? 'text-teal' : 'text-gold'} ${large ? 'text-7xl' : 'text-5xl'}`}>
        {score ?? '—'}
      </div>
      <div className={`text-slate-500 ${large ? 'text-base' : 'text-sm'} mt-1`}>
        / 100
      </div>
    </div>
  )
}

function OpportunityCard({ index, opportunity }) {
  return (
    <div className="bg-navy-card border border-navy-border rounded-lg p-7">
      <div className="flex items-start gap-5">
        <span className="text-teal text-2xl font-semibold tabular-nums leading-none mt-0.5 shrink-0">
          {index}
        </span>
        <div className="flex-1">
          <h3 className="text-white text-base font-semibold mb-3 leading-snug">
            {opportunity.title}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            {opportunity.description}
          </p>
          <div className="border-t border-navy-border pt-4">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1.5">
              90-day success metric
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              {opportunity.success_metric}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function splitParagraphs(text) {
  if (!text) return []
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
}
