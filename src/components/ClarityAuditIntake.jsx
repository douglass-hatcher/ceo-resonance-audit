import { useState } from 'react'
import {
  Field, TextInput, Textarea, Select,
  YesNoToggle, ToggleWithDetails, ProgressBar, SectionNav
} from './FormFields'

const TOTAL_SECTIONS = 6

const STRATEGY_DURATION_OPTIONS = [
  { value: 'Less than 6 months', label: 'Less than 6 months' },
  { value: '6 to 12 months', label: '6 to 12 months' },
  { value: '1 to 2 years', label: '1 to 2 years' },
  { value: 'More than 2 years', label: 'More than 2 years' },
]

const ALL_HANDS_OPTIONS = [
  { value: 'None', label: 'None' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3 or more', label: '3 or more' },
]

const INTERNAL_CHANNELS = [
  'Email', 'Slack or Teams', 'Video messages', 'Intranet posts', 'Manager cascades', 'None',
]

const AI_EXPLANATION_OPTIONS = [
  { value: 'Yes clearly', label: 'Yes — clearly' },
  { value: 'Partially', label: 'Partially' },
  { value: 'No', label: 'No' },
  { value: 'AI is not part of our strategy', label: 'AI is not part of our strategy' },
]

const TONE_OPTIONS = [
  { value: 'Yes always', label: 'Yes, always' },
  { value: 'Somewhat', label: 'Somewhat' },
  { value: 'No they sound different', label: 'No — they sound different' },
]

const ALIGNMENT_OPTIONS = [
  { value: 'Yes always', label: 'Yes, always aligned' },
  { value: 'Somewhat', label: 'Somewhat aligned' },
  { value: 'No there are contradictions', label: 'No — there are contradictions' },
]

const TIMING_OPTIONS = [
  { value: 'Always before', label: 'Always before it becomes public' },
  { value: 'Usually before', label: 'Usually before' },
  { value: 'Usually after', label: 'Usually after' },
  { value: 'Always after', label: 'Always after — employees hear it externally first' },
]

const TENURE_OPTIONS = [
  { value: 'Under 2 years', label: 'Under 2 years' },
  { value: '2 to 5 years', label: '2 to 5 years' },
  { value: 'Over 5 years', label: 'Over 5 years' },
  { value: 'Mixed', label: 'Mixed' },
]

const WORKFORCE_OPTIONS = [
  { value: 'Predominantly frontline', label: 'Predominantly frontline' },
  { value: 'Mixed frontline and knowledge workers', label: 'Mixed frontline and knowledge workers' },
  { value: 'Predominantly knowledge workers', label: 'Predominantly knowledge workers' },
]

export default function ClarityAuditIntake({ onComplete, onBack, prefillData = {} }) {
  const [section, setSection] = useState(1)
  const [data, setData] = useState({
    // Section 1
    ceoName: prefillData.ceoName || '',
    companyName: prefillData.companyName || '',
    topStrategicPriority: '',
    strategyDuration: '',
    ceoExplanation: '',
    // Section 2
    allHandsPerQuarter: '',
    internalChannels: [],
    scriptedVsSpontaneous: 50,
    receivesFeedback: null,
    feedbackForm: '',
    lastFeedbackChange: '',
    // Section 3
    oneThingEmployeesShouldSay: '',
    whatEmployeesActuallySay: '',
    howCeoKnowsMessageLanding: '',
    hasEmployeeResearch: null,
    researchFindings: '',
    aiStrategyExplanation: '',
    // Section 4
    sameToneInternalExternal: '',
    internalExternalAlignment: '',
    difficultNewsTiming: '',
    internalCommunicationFailure: '',
    // Section 5
    hasSignaturePhrase: null, signaturePhraseDetails: '',
    tellsInternalStories: null, internalStoriesDetails: '',
    connectsDecisionsToImpact: null, connectsDecisionsDetails: '',
    consistentCadence: null, cadenceDetails: '',
    acknowledgesUncertainty: null, uncertaintyDetails: '',
    // Section 6
    avgEmployeeTenure: '',
    workforceDemographic: '',
    legalConstraints: null,
    legalConstraintsDescription: '',
    employeeMisunderstanding: '',
  })

  const set = (key, value) => setData((prev) => ({ ...prev, [key]: value }))

  const toggleChannel = (channel) => {
    setData((prev) => {
      const channels = prev.internalChannels.includes(channel)
        ? prev.internalChannels.filter((c) => c !== channel)
        : [...prev.internalChannels, channel]
      return { ...prev, internalChannels: channels }
    })
  }

  const handleNext = () => {
    if (section < TOTAL_SECTIONS) {
      setSection((s) => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onComplete(data)
    }
  }

  const handleBack = () => {
    if (section > 1) {
      setSection((s) => s - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      onBack()
    }
  }

  return (
    <div className="min-h-screen">
      <header className="px-8 py-6 border-b border-navy-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-teal text-sm font-semibold tracking-widest uppercase">
            CEO Resonance Audit
          </span>
          <span className="text-slate-500 text-sm">CEO Clarity Audit</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <ProgressBar current={section} total={TOTAL_SECTIONS} />

        {section === 1 && <CSection1 data={data} set={set} />}
        {section === 2 && <CSection2 data={data} set={set} toggleChannel={toggleChannel} />}
        {section === 3 && <CSection3 data={data} set={set} />}
        {section === 4 && <CSection4 data={data} set={set} />}
        {section === 5 && <CSection5 data={data} set={set} />}
        {section === 6 && <CSection6 data={data} set={set} />}

        <SectionNav
          onBack={handleBack}
          onNext={handleNext}
          isFirst={section === 1}
          isLast={section === TOTAL_SECTIONS}
          nextLabel="Next section"
        />
      </div>
    </div>
  )
}

function CSection1({ data, set }) {
  return (
    <div>
      <h2 className="section-title">The CEO and the Strategy</h2>
      <p className="section-subtitle">The strategic context for the clarity audit.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <Field label="CEO name">
          <input
            type="text"
            className="input-field"
            value={data.ceoName}
            onChange={(e) => set('ceoName', e.target.value)}
            placeholder="Jane Smith"
          />
        </Field>
        <Field label="Company">
          <input
            type="text"
            className="input-field"
            value={data.companyName}
            onChange={(e) => set('companyName', e.target.value)}
            placeholder="Acme Corp"
          />
        </Field>
      </div>

      <Field label="What is the company's current top strategic priority?">
        <Textarea
          value={data.topStrategicPriority}
          onChange={(v) => set('topStrategicPriority', v)}
          placeholder="Be specific — not 'growth' but what kind of growth, in which direction, by when."
          rows={3}
        />
      </Field>

      <Field label="How long has this strategy been in place?">
        <Select
          value={data.strategyDuration}
          onChange={(v) => set('strategyDuration', v)}
          options={STRATEGY_DURATION_OPTIONS}
        />
      </Field>

      <Field label="How does the CEO currently explain this strategy to employees in their own words?">
        <Textarea
          value={data.ceoExplanation}
          onChange={(v) => set('ceoExplanation', v)}
          placeholder="Write it as the CEO would say it in a town hall, not as it appears in a strategy document."
          rows={5}
        />
      </Field>
    </div>
  )
}

function CSection2({ data, set, toggleChannel }) {
  const spontaneousLabel =
    data.scriptedVsSpontaneous <= 20
      ? 'Fully scripted'
      : data.scriptedVsSpontaneous <= 45
      ? 'Mostly scripted'
      : data.scriptedVsSpontaneous <= 55
      ? 'Mixed'
      : data.scriptedVsSpontaneous <= 80
      ? 'Mostly spontaneous'
      : 'Fully spontaneous'

  return (
    <div>
      <h2 className="section-title">Internal Communications Footprint</h2>
      <p className="section-subtitle">How often, in what channels, and with what style.</p>

      <Field label="How many all-hands or town halls per quarter?">
        <Select
          value={data.allHandsPerQuarter}
          onChange={(v) => set('allHandsPerQuarter', v)}
          options={ALL_HANDS_OPTIONS}
        />
      </Field>

      <div className="mb-6">
        <label className="label-text">What internal channels does the CEO use directly?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {INTERNAL_CHANNELS.map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => toggleChannel(ch)}
              className={`py-2.5 px-4 rounded-md border text-sm font-medium transition-colors text-left ${
                data.internalChannels.includes(ch)
                  ? 'bg-teal border-teal text-white'
                  : 'bg-navy-card border-navy-border text-slate-400 hover:border-slate-500'
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="label-text">
          How much of the CEO's internal communication is scripted versus spontaneous?
        </label>
        <div className="mt-1 mb-2 flex justify-between text-xs text-slate-500">
          <span>Fully scripted</span>
          <span>Fully spontaneous</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={data.scriptedVsSpontaneous}
          onChange={(e) => set('scriptedVsSpontaneous', Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-2 text-center text-teal text-sm font-medium">
          {spontaneousLabel}
        </div>
      </div>

      <Field label="Does the CEO receive feedback on internal communications?">
        <YesNoToggle value={data.receivesFeedback} onChange={(v) => set('receivesFeedback', v)} />
        {data.receivesFeedback === true && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="label-text text-xs">What form does that feedback take?</label>
              <input
                type="text"
                className="input-field"
                value={data.feedbackForm}
                onChange={(e) => set('feedbackForm', e.target.value)}
                placeholder="Pulse surveys, leadership team debrief, open Q&A, informal..."
              />
            </div>
            <div>
              <label className="label-text text-xs">
                When did the CEO last change something about their internal communications based on employee feedback?
              </label>
              <input
                type="text"
                className="input-field"
                value={data.lastFeedbackChange}
                onChange={(e) => set('lastFeedbackChange', e.target.value)}
                placeholder="Describe what changed and when."
              />
            </div>
          </div>
        )}
      </Field>
    </div>
  )
}

function CSection3({ data, set }) {
  return (
    <div>
      <h2 className="section-title">Message Clarity</h2>
      <p className="section-subtitle">The gap between intention and reception.</p>

      <Field label="What is the one thing every employee should be able to say about where this company is going?">
        <Textarea
          value={data.oneThingEmployeesShouldSay}
          onChange={(v) => set('oneThingEmployeesShouldSay', v)}
          placeholder="If every employee internalized exactly one idea from the CEO, what would it be?"
          rows={3}
        />
      </Field>

      <Field label="What do most employees actually say when asked?">
        <Textarea
          value={data.whatEmployeesActuallySay}
          onChange={(v) => set('whatEmployeesActuallySay', v)}
          placeholder="Be honest. This gap is what the audit is designed to close."
          rows={3}
        />
      </Field>

      <Field label="How does the CEO know whether the message is landing?">
        <Textarea
          value={data.howCeoKnowsMessageLanding}
          onChange={(v) => set('howCeoKnowsMessageLanding', v)}
          placeholder="What signals do they use? Formal research, anecdotal feedback, open rates, manager reports?"
          rows={3}
        />
      </Field>

      <Field label="Has the company done any employee research on message comprehension in the last 12 months?">
        <YesNoToggle value={data.hasEmployeeResearch} onChange={(v) => set('hasEmployeeResearch', v)} />
        {data.hasEmployeeResearch === true && (
          <div className="mt-3">
            <Textarea
              value={data.researchFindings}
              onChange={(v) => set('researchFindings', v)}
              placeholder="What did it show? What surprised you?"
              rows={3}
            />
          </div>
        )}
      </Field>

      <Field label="If AI is part of the company's strategy, can the CEO explain what it means for a frontline employee's daily work in plain language?">
        <Select
          value={data.aiStrategyExplanation}
          onChange={(v) => set('aiStrategyExplanation', v)}
          options={AI_EXPLANATION_OPTIONS}
        />
      </Field>
    </div>
  )
}

function CSection4({ data, set }) {
  return (
    <div>
      <h2 className="section-title">Voice Consistency</h2>
      <p className="section-subtitle">Whether the CEO sounds like one person across all channels.</p>

      <Field label="Does the CEO sound like the same person in a town hall as in a media interview?">
        <Select
          value={data.sameToneInternalExternal}
          onChange={(v) => set('sameToneInternalExternal', v)}
          options={TONE_OPTIONS}
        />
      </Field>

      <Field label="Does the CEO's internal message align with what they say publicly about the company's direction?">
        <Select
          value={data.internalExternalAlignment}
          onChange={(v) => set('internalExternalAlignment', v)}
          options={ALIGNMENT_OPTIONS}
        />
      </Field>

      <Field label="When the company faces difficult news, does the CEO communicate with employees before or after it becomes public?">
        <Select
          value={data.difficultNewsTiming}
          onChange={(v) => set('difficultNewsTiming', v)}
          options={TIMING_OPTIONS}
        />
      </Field>

      <Field label="Describe a moment in the last year when the CEO's internal communication fell short. What happened and why?">
        <Textarea
          value={data.internalCommunicationFailure}
          onChange={(v) => set('internalCommunicationFailure', v)}
          placeholder="Be specific. What was communicated, how was it received, what was the consequence?"
          rows={5}
        />
      </Field>
    </div>
  )
}

function CSection5({ data, set }) {
  const assets = [
    {
      key: 'hasSignaturePhrase',
      detailsKey: 'signaturePhraseDetails',
      label: 'Does the CEO have a signature phrase or framework employees already recognize and repeat?',
      placeholder: 'What is it? How widely is it used internally?',
    },
    {
      key: 'tellsInternalStories',
      detailsKey: 'internalStoriesDetails',
      label: 'Does the CEO tell stories from inside the organization that employees identify with?',
      placeholder: 'Give an example of a story they tell and its effect.',
    },
    {
      key: 'connectsDecisionsToImpact',
      detailsKey: 'connectsDecisionsDetails',
      label: 'Does the CEO connect strategic decisions to individual employee impact?',
      placeholder: 'How do they explain what a strategy change means for someone on the floor or at a desk?',
    },
    {
      key: 'consistentCadence',
      detailsKey: 'cadenceDetails',
      label: 'Does the CEO have a consistent communication cadence employees can rely on?',
      placeholder: 'What does the cadence look like? Monthly town hall, weekly video, quarterly memo?',
    },
    {
      key: 'acknowledgesUncertainty',
      detailsKey: 'uncertaintyDetails',
      label: 'Does the CEO acknowledge uncertainty or failure in a way that builds rather than erodes trust?',
      placeholder: 'Give an example of when they did this and how it was received.',
    },
  ]

  return (
    <div>
      <h2 className="section-title">Existing Internal Assets</h2>
      <p className="section-subtitle">The communication behaviors that are already working.</p>
      {assets.map((a) => (
        <ToggleWithDetails
          key={a.key}
          label={a.label}
          valueKey={a.key}
          detailsKey={a.detailsKey}
          data={data}
          onChange={set}
          detailsPlaceholder={a.placeholder}
        />
      ))}
    </div>
  )
}

function CSection6({ data, set }) {
  return (
    <div>
      <h2 className="section-title">Constraints and Context</h2>
      <p className="section-subtitle">The operating environment this CEO works within.</p>

      <Field label="Average employee tenure">
        <Select
          value={data.avgEmployeeTenure}
          onChange={(v) => set('avgEmployeeTenure', v)}
          options={TENURE_OPTIONS}
        />
      </Field>

      <Field label="Primary workforce demographic">
        <Select
          value={data.workforceDemographic}
          onChange={(v) => set('workforceDemographic', v)}
          options={WORKFORCE_OPTIONS}
        />
      </Field>

      <Field label="Regulatory or legal constraints on internal communications?">
        <YesNoToggle value={data.legalConstraints} onChange={(v) => set('legalConstraints', v)} />
        {data.legalConstraints === true && (
          <div className="mt-3">
            <Textarea
              value={data.legalConstraintsDescription}
              onChange={(v) => set('legalConstraintsDescription', v)}
              placeholder="Brief description of the constraints."
              rows={2}
            />
          </div>
        )}
      </Field>

      <Field label="What do employees most misunderstand about where the company is going and why?">
        <Textarea
          value={data.employeeMisunderstanding}
          onChange={(v) => set('employeeMisunderstanding', v)}
          placeholder="This is often the most important answer in the entire audit. Be direct."
          rows={5}
        />
      </Field>
    </div>
  )
}
