export function buildEmailHtml({ results, auditType }) {
  const hasVisibility = auditType === 'visibility' || auditType === 'both'
  const hasClarity = auditType === 'clarity' || auditType === 'both'
  const hasBoth = auditType === 'both'

  const resonanceScore = hasBoth
    ? Math.round(((results.visibility_score || 0) + (results.clarity_score || 0)) / 2)
    : null

  const teal = '#00A79D'
  const gold = '#C9A84C'
  const navy = '#0a1628'

  function scoreBox(label, score, color = teal) {
    return `
      <td style="background:#f8fafc;border-radius:8px;padding:24px;text-align:center;">
        <div style="font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">${label}</div>
        <div style="font-size:52px;font-weight:700;color:${color};line-height:1;">${score ?? '—'}</div>
        <div style="font-size:13px;color:#94a3b8;margin-top:4px;">/ 100</div>
      </td>`
  }

  function gapSentence(text) {
    if (!text) return ''
    return `<p style="color:#cbd5e1;font-size:14px;line-height:1.6;margin:16px 0 0 0;border-left:3px solid ${teal};padding-left:12px;">${text}</p>`
  }

  function largeScoreBlock(label, score, sentence) {
    return `
      <tr>
        <td style="background:${navy};border-radius:10px;padding:36px;text-align:center;margin-bottom:32px;">
          <div style="font-size:11px;font-weight:600;color:${teal};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">${label}</div>
          <div style="font-size:80px;font-weight:700;color:${gold};line-height:1;">${score ?? '—'}</div>
          <div style="font-size:16px;color:#94a3b8;margin-top:4px;">/ 100</div>
          ${gapSentence(sentence)}
        </td>
      </tr>
      <tr><td style="height:32px;"></td></tr>`
  }

  let scoreSection = ''

  if (hasBoth) {
    scoreSection = `
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${scoreBox('CEO Visibility Score', results.visibility_score)}
              <td style="width:16px;"></td>
              ${scoreBox('CEO Clarity Score', results.clarity_score)}
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="height:24px;"></td></tr>
      ${largeScoreBlock('CEO Resonance Score', resonanceScore, results.combined_finding_sentence)}`
  } else if (hasVisibility) {
    scoreSection = largeScoreBlock('CEO Visibility Score', results.visibility_score, results.visibility_gap_sentence)
  } else {
    const clarityExtra = results.ai_translation_gap_score != null
      ? `<div style="margin-top:20px;padding-top:20px;border-top:1px solid #1c3151;">
           <div style="font-size:11px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">AI Translation Gap Score</div>
           <div style="font-size:40px;font-weight:700;color:${teal};line-height:1;">${results.ai_translation_gap_score}</div>
           <div style="font-size:13px;color:#94a3b8;margin-top:4px;">/ 100</div>
         </div>`
      : ''
    scoreSection = `
      <tr>
        <td style="background:${navy};border-radius:10px;padding:36px;text-align:center;">
          <div style="font-size:11px;font-weight:600;color:${teal};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">CEO Clarity Score</div>
          <div style="font-size:80px;font-weight:700;color:${gold};line-height:1;">${results.clarity_score ?? '—'}</div>
          <div style="font-size:16px;color:#94a3b8;margin-top:4px;">/ 100</div>
          ${clarityExtra}
          ${gapSentence(results.clarity_gap_sentence)}
        </td>
      </tr>
      <tr><td style="height:32px;"></td></tr>`
  }

  function prose(text) {
    if (!text) return ''
    return text
      .split(/\n{2,}/)
      .map((p) => `<p style="margin:0 0 16px 0;font-size:15px;color:#334155;line-height:1.75;">${p.trim()}</p>`)
      .join('')
  }

  function opportunityCard(opp, num) {
    if (!opp) return ''
    return `
      <tr>
        <td style="background:#f8fafc;border-radius:8px;padding:24px;border-left:3px solid ${teal};">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="width:32px;vertical-align:top;padding-right:16px;">
                <div style="font-size:22px;font-weight:700;color:${teal};line-height:1;">${num}</div>
              </td>
              <td style="vertical-align:top;">
                <div style="font-size:16px;font-weight:600;color:#0f172a;margin-bottom:8px;">${opp.title || ''}</div>
                <div style="font-size:14px;color:#475569;line-height:1.65;margin-bottom:16px;">${opp.description || ''}</div>
                <div style="border-top:1px solid #e2e8f0;padding-top:12px;">
                  <div style="font-size:10px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">90-day success metric</div>
                  <div style="font-size:14px;color:#475569;line-height:1.55;">${opp.success_metric || ''}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="height:12px;"></td></tr>`
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Your CEO Resonance Audit Results</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">

          <!-- Header -->
          <tr>
            <td style="background:${navy};border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <div style="font-size:10px;font-weight:600;color:${teal};text-transform:uppercase;letter-spacing:2px;margin-bottom:8px;">CEO RESONANCE AUDIT</div>
              <div style="font-size:22px;font-weight:600;color:#ffffff;">Your full audit results</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-radius:0 0 12px 12px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- Scores -->
                ${scoreSection}

                <!-- Divider -->
                <tr><td style="height:1px;background:#e2e8f0;"></td></tr>
                <tr><td style="height:32px;"></td></tr>

                <!-- Narrative Arbitrage -->
                <tr>
                  <td style="padding-bottom:8px;">
                    <div style="font-size:10px;font-weight:600;color:${teal};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">Narrative Arbitrage</div>
                    <div style="font-size:20px;font-weight:600;color:#0f172a;margin-bottom:16px;">The specific uncontested territory this CEO can claim</div>
                    ${prose(results.narrative_arbitrage)}
                  </td>
                </tr>

                <!-- Divider -->
                <tr><td style="height:1px;background:#e2e8f0;"></td></tr>
                <tr><td style="height:32px;"></td></tr>

                <!-- Narrative Leverage -->
                <tr>
                  <td style="padding-bottom:8px;">
                    <div style="font-size:10px;font-weight:600;color:${teal};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">Narrative Leverage</div>
                    <div style="font-size:20px;font-weight:600;color:#0f172a;margin-bottom:16px;">How one action generates maximum downstream value</div>
                    ${prose(results.narrative_leverage)}
                  </td>
                </tr>

                <!-- Divider -->
                <tr><td style="height:1px;background:#e2e8f0;"></td></tr>
                <tr><td style="height:32px;"></td></tr>

                <!-- Opportunities -->
                <tr>
                  <td style="padding-bottom:8px;">
                    <div style="font-size:10px;font-weight:600;color:${teal};text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;">Three Prioritized Opportunities</div>
                    <div style="font-size:20px;font-weight:600;color:#0f172a;margin-bottom:24px;">Where to focus first</div>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${opportunityCard(results.opportunity_1, 1)}
                      ${opportunityCard(results.opportunity_2, 2)}
                      ${opportunityCard(results.opportunity_3, 3)}
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr><td style="height:1px;background:#e2e8f0;"></td></tr>
                <tr>
                  <td style="padding-top:24px;text-align:center;">
                    <div style="font-size:12px;color:#94a3b8;line-height:1.6;">
                      Built on 15 years of executive communications practice across<br>Fortune 200, U.S. Senate, and higher education environments.
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
