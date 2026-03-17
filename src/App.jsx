import { useState } from 'react'
import LandingPage from './components/LandingPage'
import VisibilityAuditIntake from './components/VisibilityAuditIntake'
import ClarityAuditIntake from './components/ClarityAuditIntake'
import GeneratingResults from './components/GeneratingResults'
import ResultsOutput from './components/ResultsOutput'

const SCREENS = {
  LANDING: 'landing',
  VISIBILITY_INTAKE: 'visibilityIntake',
  CLARITY_INTAKE: 'clarityIntake',
  GENERATING: 'generating',
  RESULTS: 'results',
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.LANDING)
  const [auditType, setAuditType] = useState(null)
  const [visibilityData, setVisibilityData] = useState({})
  const [clarityData, setClarityData] = useState({})
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleAuditSelect = (type) => {
    setAuditType(type)
    setResults(null)
    setError(null)
    if (type === 'clarity') {
      setScreen(SCREENS.CLARITY_INTAKE)
    } else {
      setScreen(SCREENS.VISIBILITY_INTAKE)
    }
  }

  const handleVisibilityComplete = (data) => {
    setVisibilityData(data)
    if (auditType === 'both') {
      setScreen(SCREENS.CLARITY_INTAKE)
    } else {
      setScreen(SCREENS.GENERATING)
      runAnalysis(auditType, data, {})
    }
  }

  const handleClarityComplete = (data) => {
    setClarityData(data)
    setScreen(SCREENS.GENERATING)
    if (auditType === 'both') {
      runAnalysis('both', visibilityData, data)
    } else {
      runAnalysis('clarity', {}, data)
    }
  }

  const runAnalysis = async (type, vData, cData) => {
    setError(null)
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditType: type,
          visibilityData: vData,
          clarityData: cData,
        }),
      })

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}))
        throw new Error(errBody.error || `Request failed with status ${response.status}`)
      }

      const data = await response.json()
      setResults(data)
      setScreen(SCREENS.RESULTS)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setScreen(SCREENS.RESULTS)
    }
  }

  const handleRestart = () => {
    setScreen(SCREENS.LANDING)
    setAuditType(null)
    setVisibilityData({})
    setClarityData({})
    setResults(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-navy font-sans">
      {screen === SCREENS.LANDING && (
        <LandingPage onSelect={handleAuditSelect} />
      )}
      {screen === SCREENS.VISIBILITY_INTAKE && (
        <VisibilityAuditIntake
          onComplete={handleVisibilityComplete}
          onBack={() => setScreen(SCREENS.LANDING)}
          auditType={auditType}
        />
      )}
      {screen === SCREENS.CLARITY_INTAKE && (
        <ClarityAuditIntake
          onComplete={handleClarityComplete}
          onBack={() => {
            if (auditType === 'both') {
              setScreen(SCREENS.VISIBILITY_INTAKE)
            } else {
              setScreen(SCREENS.LANDING)
            }
          }}
          prefillData={{
            ceoName: visibilityData.ceoName || '',
            companyName: visibilityData.companyName || '',
          }}
        />
      )}
      {screen === SCREENS.GENERATING && (
        <GeneratingResults />
      )}
      {screen === SCREENS.RESULTS && (
        <ResultsOutput
          results={results}
          auditType={auditType}
          error={error}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
