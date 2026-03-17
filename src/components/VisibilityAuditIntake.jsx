import { useState } from 'react'
import {
  Field, TextInput, NumberInput, Textarea, Select,
  YesNoToggle, ToggleWithDetails, ProgressBar, SectionNav
} from './FormFields'

const TOTAL_SECTIONS = 6

const TENURE_OPTIONS = [
  { value: 'Less than 1 year', label: 'Less than 1 year' },
  { value: '1 to 2 years', label: '1 to 2 years' },
  { value: '3 to 5 years', label: '3 to 5 years' },
  { value: 'More than 5 years', label: 'More than 5 years' },
]

const ENGAGEMENT_OPTIONS = [
  { value: 'Under 1%', label: 'Under 1%' },
  { value: '1 to 2%', label: '1 to 2%' },
  { value: '2 to 5%', label: '2 to 5%' },
  { value: 'Over 5%', label: 'Over 5%' },
  { value: 'Unknown', label: 'Unknown' },
]

const MEDIA_TIER_OPTIONS = [
  { value: 'Tier one national press', label: 'Tier one national press' },
  { value: 'Industry trade press', label: 'Industry trade press' },
  { value: 'Local or regional press', label: 'Local or regional press' },
  { value: 'Podcast only', label: 'Podcast only' },
  { value: 'Minimal or none', label: 'Minimal or none' },
]

const MEDIA_PRESENCE_OPTIONS = [
  { value: 'Dominant', label: 'Dominant' },
  { value: 'Strong', label: 'Strong' },
  { value: 'Moderate', label: 'Moderate' },
  { value: 'Minimal', label: 'Minimal' },
]

const TIME_OPTIONS = [
  { value: 'Less than 2 hours', label: 'Less than 2 hours' },
  { value: '2 to 4 hours', label: '2 to 4 hours' },
  { value: '4 to 8 hours', label: '4 to 8 hours' },
  { value: 'More than 8 hours', label: 'More than 8 hours' },
]

const EMPTY_PEER = { name: '', company: '', linkedinFollowers: '', mediaPresence: '', notableWin: '' }

export default function VisibilityAuditIntake({ onComplete, onBack, auditType }) {
  const [section, setSection] = useState(1)
  const [data, setData] = useState({
    // Section 1
    ceoName: '', ceoTitle: '', companyName: '', industry: '',
    tenureInRole: '', wantedNarrative: '',
    // Section 2
    linkedinFollowers: '', linkedinEngagementRate: '',
    mediaAppearances: '', mediaTier: '',
    speakingEngagements: '', featuredOnLists: null, listDetails: '',
    // Section 3
    primaryNarrative: '', peer1: '', peer2: '', peer3: '',
    // Section 4
    peers: [{ ...EMPTY_PEER }],
    // Section 5
    hasProprietaryData: null, proprietaryDataDetails: '',
    hasBoardSeat: null, boardSeatDetails: '',
    hasSignaturePhrase: null, signaturePhraseDetails: '',
    hasJournalistRelationships: null, journalistDetails: '',
    hasSpeakingPlatform: null, speakingPlatformDetails: '',
    // Section 6
    timeAvailable: '', legalRestrictions: null, legalRestrictionsDescription: '',
    previousAttempts: '',
  })

  const set = (key, value) => setData((prev) => ({ ...prev, [key]: value }))

  const setPeer = (idx, key, value) => {
    setData((prev) => {
      const peers = [...prev.peers]
      peers[idx] = { ...peers[idx], [key]: value }
      return { ...prev, peers }
    })
  }

  const addPeer = () => {
    if (data.peers.length < 5) {
      setData((prev) => ({ ...prev, peers: [...prev.peers, { ...EMPTY_PEER }] }))
    }
  }

  const removePeer = (idx) => {
    setData((prev) => ({
      ...prev,
      peers: prev.peers.filter((_, i) => i !== idx),
    }))
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
      {/* Header */}
      <header className="px-8 py-6 border-b border-navy-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-teal text-sm font-semibold tracking-widest uppercase">
            CEO Resonance Audit
          </span>
          <span className="text-slate-500 text-sm">
            CEO Visibility Audit
            {auditType === 'both' && ' · Part 1 of 2'}
          </span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <ProgressBar current={section} total={TOTAL_SECTIONS} />

        {section === 1 && (
          <Section1 data={data} set={set} />
        )}
        {section === 2 && (
          <Section2 data={data} set={set} />
        )}
        {section === 3 && (
          <Section3 data={data} set={set} />
        )}
        {section === 4 && (
          <Section4
            peers={data.peers}
            onPeerChange={setPeer}
            onAddPeer={addPeer}
            onRemovePeer={removePeer}
          />
        )}
        {section === 5 && (
          <Section5 data={data} onChange={set} />
        )}
        {section === 6 && (
          <Section6 data={data} set={set} auditType={auditType} />
        )}

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

function Section1({ data, set }) {
  return (
    <div>
      <h2 className="section-title">The CEO</h2>
      <p className="section-subtitle">Tell us who we're auditing.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <Field label="CEO full name">
          <TextInput value={data.ceoName} onChange={(v) => set('ceoName', v)} placeholder="Jane Smith" />
        </Field>
        <Field label="Title">
          <TextInput value={data.ceoTitle} onChange={(v) => set('ceoTitle', v)} placeholder="Chief Executive Officer" />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <Field label="Company name">
          <TextInput value={data.companyName} onChange={(v) => set('companyName', v)} placeholder="Acme Corp" />
        </Field>
        <Field label="Industry">
          <TextInput value={data.industry} onChange={(v) => set('industry', v)} placeholder="Healthcare technology" />
        </Field>
      </div>

      <Field label="How long has this CEO been in the role?">
        <Select
          value={data.tenureInRole}
          onChange={(v) => set('tenureInRole', v)}
          options={TENURE_OPTIONS}
        />
      </Field>

      <Field label="What does this CEO want to be known for?" hint="">
        <Textarea
          value={data.wantedNarrative}
          onChange={(v) => set('wantedNarrative', v)}
          placeholder="Describe the narrative they are trying to own, not their job description."
          rows={4}
        />
      </Field>
    </div>
  )
}

function Section2({ data, set }) {
  return (
    <div>
      <h2 className="section-title">Current External Presence</h2>
      <p className="section-subtitle">Where they stand today.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <Field label="LinkedIn follower count">
          <NumberInput
            value={data.linkedinFollowers}
            onChange={(v) => set('linkedinFollowers', v)}
            placeholder="e.g. 12000"
          />
        </Field>
        <Field label="Average LinkedIn post engagement rate">
          <Select
            value={data.linkedinEngagementRate}
            onChange={(v) => set('linkedinEngagementRate', v)}
            options={ENGAGEMENT_OPTIONS}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <Field label="Major media appearances (last 12 months)">
          <NumberInput
            value={data.mediaAppearances}
            onChange={(v) => set('mediaAppearances', v)}
            placeholder="0"
          />
        </Field>
        <Field label="Tier of those appearances">
          <Select
            value={data.mediaTier}
            onChange={(v) => set('mediaTier', v)}
            options={MEDIA_TIER_OPTIONS}
          />
        </Field>
      </div>

      <Field label="Conference keynotes / speaking engagements (last 12 months)">
        <NumberInput
          value={data.speakingEngagements}
          onChange={(v) => set('speakingEngagements', v)}
          placeholder="0"
        />
      </Field>

      <Field label="Featured on any major lists in the last two years?">
        <YesNoToggle value={data.featuredOnLists} onChange={(v) => set('featuredOnLists', v)} />
        {data.featuredOnLists === true && (
          <div className="mt-3">
            <TextInput
              value={data.listDetails}
              onChange={(v) => set('listDetails', v)}
              placeholder="Which lists? e.g. Fortune 50 Most Powerful Women, Forbes Under 40"
            />
          </div>
        )}
      </Field>
    </div>
  )
}

function Section3({ data, set }) {
  return (
    <div>
      <h2 className="section-title">The Narrative They Are Trying to Own</h2>
      <p className="section-subtitle">Who owns the space, and who's competing for it.</p>

      <Field label="What is the CEO's primary narrative — the one idea they are trying to own in their industry?">
        <Textarea
          value={data.primaryNarrative}
          onChange={(v) => set('primaryNarrative', v)}
          placeholder="Be specific. Not 'innovation leader' — but what does that actually mean in their market?"
          rows={4}
        />
      </Field>

      <div className="mb-2">
        <label className="label-text">Who is currently owning that narrative instead?</label>
        <p className="text-slate-500 text-xs mb-4">Name up to three peer CEOs who occupy adjacent or overlapping space.</p>
      </div>

      <div className="space-y-3">
        {['peer1', 'peer2', 'peer3'].map((key, i) => (
          <div key={key} className="flex items-center gap-3">
            <span className="text-slate-500 text-xs w-12 shrink-0">Peer {i + 1}</span>
            <TextInput
              value={data[key]}
              onChange={(v) => set(key, v)}
              placeholder="Name, Company"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Section4({ peers, onPeerChange, onAddPeer, onRemovePeer }) {
  return (
    <div>
      <h2 className="section-title">Peer Comparison</h2>
      <p className="section-subtitle">Map the competitive visibility landscape.</p>

      <div className="space-y-8">
        {peers.map((peer, idx) => (
          <div key={idx} className="bg-navy-card border border-navy-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="text-teal text-xs font-semibold tracking-widest uppercase">
                Peer {idx + 1}
              </span>
              {peers.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemovePeer(idx)}
                  className="text-slate-600 hover:text-slate-400 text-xs transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <Field label="Name">
                <TextInput
                  value={peer.name}
                  onChange={(v) => onPeerChange(idx, 'name', v)}
                  placeholder="Full name"
                />
              </Field>
              <Field label="Company">
                <TextInput
                  value={peer.company}
                  onChange={(v) => onPeerChange(idx, 'company', v)}
                  placeholder="Company name"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <Field label="LinkedIn follower count">
                <NumberInput
                  value={peer.linkedinFollowers}
                  onChange={(v) => onPeerChange(idx, 'linkedinFollowers', v)}
                  placeholder="e.g. 45000"
                />
              </Field>
              <Field label="Estimated media presence">
                <Select
                  value={peer.mediaPresence}
                  onChange={(v) => onPeerChange(idx, 'mediaPresence', v)}
                  options={MEDIA_PRESENCE_OPTIONS}
                />
              </Field>
            </div>

            <Field label="One notable recent visibility win">
              <TextInput
                value={peer.notableWin}
                onChange={(v) => onPeerChange(idx, 'notableWin', v)}
                placeholder="e.g. WSJ profile, TED talk, HBR cover story"
              />
            </Field>
          </div>
        ))}
      </div>

      {peers.length < 5 && (
        <button
          type="button"
          onClick={onAddPeer}
          className="mt-5 w-full py-3 border border-dashed border-navy-border rounded-lg text-slate-500 hover:text-slate-400 hover:border-slate-600 text-sm transition-colors"
        >
          + Add another peer
        </button>
      )}
    </div>
  )
}

function Section5({ data, onChange }) {
  const assets = [
    {
      key: 'hasProprietaryData',
      detailsKey: 'proprietaryDataDetails',
      label: 'Does the CEO have proprietary data or research they could publish?',
      placeholder: 'Describe the data, research, or findings they have access to.',
    },
    {
      key: 'hasBoardSeat',
      detailsKey: 'boardSeatDetails',
      label: 'Do they have a board seat or advisory role that gives them platform access?',
      placeholder: 'Which boards or advisory roles? What platform access does this create?',
    },
    {
      key: 'hasSignaturePhrase',
      detailsKey: 'signaturePhraseDetails',
      label: 'Do they have a signature phrase, framework, or idea they are already known for?',
      placeholder: 'What is it? Where does it show up in their communications?',
    },
    {
      key: 'hasJournalistRelationships',
      detailsKey: 'journalistDetails',
      label: 'Do they have relationships with tier one journalists or analysts?',
      placeholder: 'Which outlets, journalists, or analyst firms?',
    },
    {
      key: 'hasSpeakingPlatform',
      detailsKey: 'speakingPlatformDetails',
      label: 'Do they have an existing speaking platform, conference series, podcast, or newsletter?',
      placeholder: 'What is it, how large is the audience, and how active is it?',
    },
  ]

  return (
    <div>
      <h2 className="section-title">Existing Assets</h2>
      <p className="section-subtitle">What we have to work with.</p>
      {assets.map((a) => (
        <ToggleWithDetails
          key={a.key}
          label={a.label}
          valueKey={a.key}
          detailsKey={a.detailsKey}
          data={data}
          onChange={onChange}
          detailsPlaceholder={a.placeholder}
        />
      ))}
    </div>
  )
}

function Section6({ data, set, auditType }) {
  return (
    <div>
      <h2 className="section-title">Constraints</h2>
      <p className="section-subtitle">What we're working around.</p>

      <Field label="CEO time available for communications activities per month">
        <Select
          value={data.timeAvailable}
          onChange={(v) => set('timeAvailable', v)}
          options={TIME_OPTIONS}
        />
      </Field>

      <Field label="Any legal or regulatory restrictions on public statements?">
        <YesNoToggle value={data.legalRestrictions} onChange={(v) => set('legalRestrictions', v)} />
        {data.legalRestrictions === true && (
          <div className="mt-3">
            <Textarea
              value={data.legalRestrictionsDescription}
              onChange={(v) => set('legalRestrictionsDescription', v)}
              placeholder="Brief description of the restrictions."
              rows={2}
            />
          </div>
        )}
      </Field>

      <Field label="What has been tried before and hasn't worked?">
        <Textarea
          value={data.previousAttempts}
          onChange={(v) => set('previousAttempts', v)}
          placeholder="Ghost-written LinkedIn posts that never got traction, a podcast that stalled after 6 episodes, a media tour that produced minimal pickup..."
          rows={4}
        />
      </Field>

      {auditType === 'both' && (
        <div className="bg-navy-card border border-navy-border rounded-lg p-5 mt-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-teal font-medium">Next: </span>
            After this section you'll complete the CEO Clarity Audit — the internal counterpart
            to everything you've just told us.
          </p>
        </div>
      )}
    </div>
  )
}
