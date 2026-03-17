export const SYSTEM_PROMPT = `You are an expert executive communications strategist with 15 years of experience advising Fortune 200 CEOs, U.S. senators, and university presidents. You think in narrative systems, not tactics. You are rigorous, specific, and direct. You never use generic language. Every insight you generate should feel like it could only apply to this specific CEO, not any CEO. You understand the difference between Narrative Arbitrage, which is finding and owning uncontested narrative white space, and Narrative Leverage, which is engineering one CEO moment to generate maximum downstream communications value.`;

export function buildVisibilitySection(v) {
  if (!v) return '';
  return `
--- CEO VISIBILITY AUDIT DATA ---

CEO: ${v.ceoName || 'Not provided'}, ${v.ceoTitle || 'Not provided'}
Company: ${v.companyName || 'Not provided'} | Industry: ${v.industry || 'Not provided'}
Tenure in Role: ${v.tenureInRole || 'Not provided'}
Narrative They Want to Own: ${v.wantedNarrative || 'Not provided'}

CURRENT EXTERNAL PRESENCE:
LinkedIn Followers: ${v.linkedinFollowers || 'Unknown'}
LinkedIn Engagement Rate: ${v.linkedinEngagementRate || 'Unknown'}
Major Media Appearances (last 12 months): ${v.mediaAppearances || '0'}
Media Tier: ${v.mediaTier || 'Not provided'}
Conference/Speaking Engagements (last 12 months): ${v.speakingEngagements || '0'}
Featured on Major Lists (last 2 years): ${v.featuredOnLists ? 'Yes' : 'No'}${v.featuredOnLists && v.listDetails ? ` — ${v.listDetails}` : ''}

NARRATIVE POSITIONING:
Primary Narrative They Are Trying to Own: ${v.primaryNarrative || 'Not provided'}
Peers Currently Owning Adjacent Space:
  - ${v.peer1 || 'None listed'}
  - ${v.peer2 || 'None listed'}
  - ${v.peer3 || 'None listed'}

PEER COMPARISON:
${(v.peers || []).map((p, i) => `Peer ${i + 1}: ${p.name || 'N/A'} (${p.company || 'N/A'})
  LinkedIn Followers: ${p.linkedinFollowers || 'Unknown'}
  Media Presence: ${p.mediaPresence || 'Unknown'}
  Notable Recent Win: ${p.notableWin || 'None'}`).join('\n') || 'No peers entered'}

EXISTING ASSETS:
Proprietary Data/Research They Could Publish: ${v.hasProprietaryData ? 'Yes' : 'No'}${v.hasProprietaryData && v.proprietaryDataDetails ? ` — ${v.proprietaryDataDetails}` : ''}
Board Seat/Advisory Role with Platform Access: ${v.hasBoardSeat ? 'Yes' : 'No'}${v.hasBoardSeat && v.boardSeatDetails ? ` — ${v.boardSeatDetails}` : ''}
Signature Phrase/Framework/Idea Already Known For: ${v.hasSignaturePhrase ? 'Yes' : 'No'}${v.hasSignaturePhrase && v.signaturePhraseDetails ? ` — ${v.signaturePhraseDetails}` : ''}
Relationships with Tier 1 Journalists/Analysts: ${v.hasJournalistRelationships ? 'Yes' : 'No'}${v.hasJournalistRelationships && v.journalistDetails ? ` — ${v.journalistDetails}` : ''}
Existing Speaking Platform/Conference/Podcast/Newsletter: ${v.hasSpeakingPlatform ? 'Yes' : 'No'}${v.hasSpeakingPlatform && v.speakingPlatformDetails ? ` — ${v.speakingPlatformDetails}` : ''}

CONSTRAINTS:
Time Available for Communications (per month): ${v.timeAvailable || 'Not provided'}
Legal/Regulatory Restrictions on Public Statements: ${v.legalRestrictions ? 'Yes' : 'No'}${v.legalRestrictions && v.legalRestrictionsDescription ? ` — ${v.legalRestrictionsDescription}` : ''}
What Has Been Tried Before and Hasn't Worked: ${v.previousAttempts || 'Nothing listed'}
`;
}

export function buildClaritySection(c) {
  if (!c) return '';
  return `
--- CEO CLARITY AUDIT DATA ---

CEO: ${c.ceoName || 'Not provided'} at ${c.companyName || 'Not provided'}
Top Strategic Priority: ${c.topStrategicPriority || 'Not provided'}
How Long This Strategy Has Been in Place: ${c.strategyDuration || 'Not provided'}
How the CEO Explains the Strategy in Their Own Words: "${c.ceoExplanation || 'Not provided'}"

INTERNAL COMMUNICATIONS FOOTPRINT:
All-Hands/Town Halls per Quarter: ${c.allHandsPerQuarter || 'Not provided'}
Internal Channels CEO Uses Directly: ${(c.internalChannels || []).join(', ') || 'None listed'}
Scripted vs. Spontaneous Communication: ${c.scriptedVsSpontaneous != null ? `${c.scriptedVsSpontaneous}/100 (0=Fully Scripted, 100=Fully Spontaneous)` : 'Not provided'}
Receives Feedback on Internal Communications: ${c.receivesFeedback ? 'Yes' : 'No'}${c.receivesFeedback && c.feedbackForm ? `\nFeedback Form: ${c.feedbackForm}` : ''}${c.receivesFeedback && c.lastFeedbackChange ? `\nLast Changed Something Based on Feedback: ${c.lastFeedbackChange}` : ''}

MESSAGE CLARITY:
What Every Employee Should Be Able to Say About Where the Company Is Going: "${c.oneThingEmployeesShouldSay || 'Not provided'}"
What Most Employees Actually Say When Asked: "${c.whatEmployeesActuallySay || 'Not provided'}"
How the CEO Knows Whether the Message Is Landing: ${c.howCeoKnowsMessageLanding || 'Not provided'}
Employee Research on Message Comprehension (last 12 months): ${c.hasEmployeeResearch ? 'Yes' : 'No'}${c.hasEmployeeResearch && c.researchFindings ? `\nFindings: ${c.researchFindings}` : ''}
Can the CEO Explain AI Strategy for a Frontline Employee's Daily Work: ${c.aiStrategyExplanation || 'Not applicable'}

VOICE CONSISTENCY:
CEO Sounds Like the Same Person Internally and in Media: ${c.sameToneInternalExternal || 'Not provided'}
Internal Message Aligns with Public Direction: ${c.internalExternalAlignment || 'Not provided'}
When Facing Difficult News, Communicates with Employees: ${c.difficultNewsTiming || 'Not provided'}
Moment When Internal Communication Recently Fell Short: ${c.internalCommunicationFailure || 'Not provided'}

INTERNAL ASSETS:
Signature Phrase/Framework Employees Recognize and Repeat: ${c.hasSignaturePhrase ? 'Yes' : 'No'}${c.hasSignaturePhrase && c.signaturePhraseDetails ? ` — ${c.signaturePhraseDetails}` : ''}
Tells Stories from Inside the Organization Employees Identify With: ${c.tellsInternalStories ? 'Yes' : 'No'}${c.tellsInternalStories && c.internalStoriesDetails ? ` — ${c.internalStoriesDetails}` : ''}
Connects Strategic Decisions to Individual Employee Impact: ${c.connectsDecisionsToImpact ? 'Yes' : 'No'}${c.connectsDecisionsToImpact && c.connectsDecisionsDetails ? ` — ${c.connectsDecisionsDetails}` : ''}
Consistent Communication Cadence Employees Can Rely On: ${c.consistentCadence ? 'Yes' : 'No'}${c.consistentCadence && c.cadenceDetails ? ` — ${c.cadenceDetails}` : ''}
Acknowledges Uncertainty/Failure in a Way That Builds Trust: ${c.acknowledgesUncertainty ? 'Yes' : 'No'}${c.acknowledgesUncertainty && c.uncertaintyDetails ? ` — ${c.uncertaintyDetails}` : ''}

CONTEXT:
Average Employee Tenure: ${c.avgEmployeeTenure || 'Not provided'}
Primary Workforce Demographic: ${c.workforceDemographic || 'Not provided'}
Legal/Regulatory Constraints on Internal Communications: ${c.legalConstraints ? 'Yes' : 'No'}${c.legalConstraints && c.legalConstraintsDescription ? ` — ${c.legalConstraintsDescription}` : ''}
What Employees Most Misunderstand About Where the Company Is Going: ${c.employeeMisunderstanding || 'Not provided'}
`;
}

export function buildUserPrompt(auditType, visibilityData, clarityData) {
  let dataSection = '';

  if (auditType === 'visibility' || auditType === 'both') {
    dataSection += buildVisibilitySection(visibilityData);
  }
  if (auditType === 'clarity' || auditType === 'both') {
    dataSection += buildClaritySection(clarityData);
  }

  return `${dataSection}

Based on everything above, generate the following in valid JSON format. All text fields must be specific to this CEO — never generic. Every sentence should feel like it could only apply to this person's exact situation.

{
  "visibility_score": <number 0–100, only if visibility data was provided, otherwise omit>,
  "clarity_score": <number 0–100, only if clarity data was provided, otherwise omit>,
  "ai_translation_gap_score": <number 0–100, only if AI field was answered, otherwise omit>,
  "visibility_gap_sentence": "<one sentence naming the specific external narrative gap, only if visibility data was provided>",
  "clarity_gap_sentence": "<one sentence naming the specific internal clarity failure, only if clarity data was provided>",
  "combined_finding_sentence": "<one sentence naming the most important finding across both dimensions, only if both audits were run>",
  "narrative_arbitrage": "<2–3 paragraphs identifying the specific uncontested territory this CEO can claim. Name the white space precisely, explain why it is uncontested, and connect it to the CEO's existing assets. No generic language.>",
  "narrative_leverage": "<1–2 paragraphs identifying the single highest-leverage starting point given this CEO's assets, constraints, and the white space above.>",
  "opportunity_1": {
    "title": "<one-phrase opportunity title>",
    "description": "<2–3 sentences: the opportunity, white space it fills, existing asset it builds on>",
    "success_metric": "<what does progress look like at 90 days>"
  },
  "opportunity_2": {
    "title": "<one-phrase opportunity title>",
    "description": "<2–3 sentences>",
    "success_metric": "<90-day progress indicator>"
  },
  "opportunity_3": {
    "title": "<one-phrase opportunity title>",
    "description": "<2–3 sentences>",
    "success_metric": "<90-day progress indicator>"
  }
}

Return only valid JSON. No markdown, no code fences, no explanation outside the JSON object.`;
}

export function parseAnalysisResponse(rawText) {
  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Response did not contain a JSON object');
    return JSON.parse(match[0]);
  }
}
