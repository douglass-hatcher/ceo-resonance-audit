export default function GeneratingResults() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Animated indicator */}
      <div className="relative mb-12">
        {/* Outer pulsing ring */}
        <div className="pulse-ring w-20 h-20 rounded-full border-2 border-gold opacity-30 absolute inset-0" />
        {/* Spinning arc */}
        <div className="spin-slow w-20 h-20 rounded-full border-2 border-transparent border-t-gold" />
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-gold opacity-80" />
        </div>
      </div>

      <p className="text-slate-400 text-lg font-light tracking-wide">
        Analyzing your CEO's resonance profile.
      </p>
    </div>
  )
}
