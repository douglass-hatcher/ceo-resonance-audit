// Shared form primitives used by both intake components

export function Field({ label, hint, children }) {
  return (
    <div className="mb-6">
      <label className="label-text">
        {label}
        {hint && <span className="ml-2 text-slate-500 font-normal text-xs">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

export function TextInput({ value, onChange, placeholder, ...props }) {
  return (
    <input
      type="text"
      className="input-field"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      {...props}
    />
  )
}

export function NumberInput({ value, onChange, placeholder, ...props }) {
  return (
    <input
      type="number"
      className="input-field"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      min={0}
      {...props}
    />
  )
}

export function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      className="textarea-field"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  )
}

export function Select({ value, onChange, options }) {
  return (
    <select
      className="select-field"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="" disabled>Select one</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export function YesNoToggle({ value, onChange }) {
  return (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`px-6 py-2.5 rounded-md border text-sm font-medium transition-colors ${
          value === true
            ? 'bg-teal border-teal text-white'
            : 'bg-navy-card border-navy-border text-slate-400 hover:border-slate-500'
        }`}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`px-6 py-2.5 rounded-md border text-sm font-medium transition-colors ${
          value === false
            ? 'bg-navy-elevated border-slate-500 text-white'
            : 'bg-navy-card border-navy-border text-slate-400 hover:border-slate-500'
        }`}
      >
        No
      </button>
    </div>
  )
}

export function ToggleWithDetails({ label, valueKey, detailsKey, data, onChange, detailsPlaceholder }) {
  return (
    <div className="mb-6">
      <label className="label-text">{label}</label>
      <YesNoToggle
        value={data[valueKey]}
        onChange={(v) => onChange(valueKey, v)}
      />
      {data[valueKey] === true && (
        <div className="mt-3">
          <Textarea
            value={data[detailsKey]}
            onChange={(v) => onChange(detailsKey, v)}
            placeholder={detailsPlaceholder || 'Describe...'}
            rows={2}
          />
        </div>
      )}
    </div>
  )
}

export function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-slate-500 text-xs tracking-wide uppercase">
          Section {current} of {total}
        </span>
        <span className="text-slate-500 text-xs">{pct}%</span>
      </div>
      <div className="h-0.5 bg-navy-border rounded-full overflow-hidden">
        <div
          className="h-full bg-teal transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function SectionNav({ onBack, onNext, isFirst, isLast, nextLabel = 'Next section' }) {
  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-navy-border">
      <button
        type="button"
        onClick={onBack}
        className="btn-secondary"
      >
        {isFirst ? '← Back to home' : '← Previous'}
      </button>
      <button
        type="button"
        onClick={onNext}
        className="btn-primary"
      >
        {isLast ? 'Generate my audit →' : `${nextLabel} →`}
      </button>
    </div>
  )
}
