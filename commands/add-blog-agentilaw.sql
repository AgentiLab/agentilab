-- Add blog post about Building AgentiLaw.ai
-- Author: Simon-Pierre Boucher
-- Date: October 14, 2025

INSERT INTO blog_posts (slug, title, excerpt, content, author, published_at, cover_image, tags, read_time_minutes)
VALUES (
  'building-agentilaw-ai-legal-advisor',
  'Building AgentiLaw.ai: Autonomous Legal AI with Claude Sonnet 4.5',
  'Explore the architecture behind AgentiLaw.ai, an AI-powered legal advisor that autonomously researches case law, generates Quebec-compliant contracts, and analyzes documents with risk assessment using Claude Sonnet 4.5, Exa Search API, and multi-round streaming.',
  '# Building AgentiLaw.ai: Autonomous Legal AI with Claude Sonnet 4.5

## Introduction

The legal industry has long been characterized by manual research, document review, and contract drafting—tasks that consume countless billable hours. **AgentiLaw.ai** transforms this landscape by creating an AI legal advisor that doesn''t just assist lawyers—it autonomously performs legal research, generates contracts, and analyzes documents with professional-grade accuracy.

In this deep dive, we''ll explore how we built a legal AI system using Claude Sonnet 4.5, Exa Search API, and advanced streaming architecture.

## The Legal AI Challenge

Building AI for legal work presents unique challenges:

**1. Authoritative Sources**
Legal advice must cite authoritative sources: CanLII, Supreme Court decisions, Quebec legislation. No Wikipedia, no general web content.

**2. Jurisdictional Accuracy**
Quebec law differs from federal Canadian law. The AI must understand jurisdiction and apply the correct legal framework.

**3. Risk Assessment**
Document analysis requires identifying risks with precise severity levels and providing actionable recommendations.

**4. Compliance**
Contract generation must adhere to Quebec Civil Code, labor laws, and regulatory requirements.

**5. Bilingual Capability**
Quebec legal practice requires fluency in both French and English with proper legal terminology.

## Technical Architecture

### Stack Overview

**Frontend:**
- React 18 + TypeScript for type-safe legal applications
- Tailwind CSS with professional law firm aesthetic
- shadcn/ui components optimized for legal workflows
- Framer Motion for smooth, professional animations
- Mobile-first with bottom navigation

**Backend:**
- Express.js with Node.js
- In-memory storage (PostgreSQL-ready schema)
- RESTful API architecture
- Server-Sent Events for real-time streaming

**AI & Research:**
- **Claude Sonnet 4.5** - Autonomous legal agent
- **Exa Search API** - Legal research across authoritative sources
- **ReactMarkdown + remark-gfm** - Rich text rendering

### Why Claude Sonnet 4.5 for Legal Work?

Claude Sonnet 4.5 excels in legal applications for specific reasons:

**1. Legal Reasoning**
Claude understands legal principles, precedent, and statutory interpretation without fine-tuning. It can analyze contracts clause-by-clause and identify legal issues.

**2. Autonomous Tool Use**
Claude independently decides when to:
- Search legal databases for precedent
- Generate contracts based on requirements
- Analyze documents for compliance risks

**3. Bilingual Legal Expertise**
Fluent in both French and English legal terminology, essential for Quebec practice.

**4. Structured Output**
Returns well-formatted legal analysis with risk scores, recommendations, and ICD-10-style classification.

**5. Streaming Responses**
Multi-round conversations with tool execution allow complex legal research workflows.

## The 3 Autonomous Legal Tools

AgentiLaw.ai''s agent orchestrates 3 specialized tools:

### Tool 1: search_legal_web

Intelligent legal research via Exa Search API.

**Capabilities:**
- Searches authoritative legal databases only
- Filters by jurisdiction (federal, provincial, municipal)
- Categories: legislation, jurisprudence, doctrine, general

**Authoritative Sources:**
- **CanLII** - Canadian Legal Information Institute
- **justice.gouv.qc.ca** - Quebec Ministry of Justice
- **legisquebec.gouv.qc.ca** - Quebec Legislation
- **Supreme Court of Canada** - scc-csc.ca

**Example:**
```typescript
await search_legal_web({
  query: "Quebec non-compete clause enforceability",
  category: "jurisprudence",
  jurisdiction: "provincial"
});
```

**Returns:**
- Relevant case law with citations
- Links to official sources
- Summary of legal principles
- Precedent strength indicators

### Tool 2: generate_contract

Professional contract generation with Quebec law compliance.

**Template Types:**
- Partnership Agreements
- Non-Disclosure Agreements (NDA)
- Service Agreements
- Employment Contracts

**Process:**
1. User provides requirements
2. AI selects appropriate template
3. Customizes clauses based on needs
4. Ensures Quebec Civil Code compliance
5. Includes protective provisions
6. Returns professionally formatted contract

**Example:**
```typescript
await generate_contract({
  type: "employment",
  requirements: {
    position: "Software Developer",
    salary: 85000,
    location: "Montreal",
    startDate: "2025-11-01",
    nonCompete: true
  }
});
```

**Output:**
- Complete contract with all clauses
- Quebec labor law compliance
- Non-compete clause (if enforceable)
- Termination provisions
- Intellectual property assignment

### Tool 3: analyze_document

Comprehensive legal document analysis.

**Analysis Includes:**
- Executive summary
- Risk identification by clause
- Overall risk score (0-100)
- Compliance checking
- Improvement recommendations

**Risk Severity Levels:**
- **Low:** Minor issues, easily corrected
- **Medium:** Moderate concerns, should address
- **High:** Critical risks, immediate attention required

**Example Analysis:**
```json
{
  "summary": "Partnership agreement with unbalanced profit distribution",
  "risks": [
    {
      "clause": "Profit Distribution",
      "severity": "high",
      "issue": "One partner receives 70% with equal contribution",
      "recommendation": "Revise to reflect actual contribution or add justification clause"
    }
  ],
  "overallScore": 65,
  "compliance": "Quebec Civil Code compliant with reservations"
}
```

## Multi-Round Streaming Architecture

AgentiLaw.ai uses Server-Sent Events (SSE) for real-time AI conversations:

### The Streaming Flow

**1. User Sends Message**
```typescript
GET /api/messages/stream?content=research%20employment%20termination%20Quebec
```

**2. Claude Analyzes Request**
- Recognizes need for legal research
- Identifies jurisdiction (Quebec)
- Determines tool needed (search_legal_web)

**3. Backend Executes Tool**
```typescript
const results = await exaSearch.search({
  query: "Quebec employment termination notice requirements",
  sources: ["legisquebec.gouv.qc.ca", "canlii.org"],
  category: "legislation"
});
```

**4. Claude Generates Response**
- Synthesizes search results
- Cites specific articles and cases
- Provides practical guidance
- Streams response to frontend

**5. Frontend Renders Markdown**
```typescript
<ReactMarkdown remarkPlugins={[remarkGfm]}>
  {message.content}
</ReactMarkdown>
```

### Optimistic UI Pattern

User messages appear instantly while AI processes:

```typescript
// Add user message immediately
setMessages(prev => [...prev, {
  role: "user",
  content: userInput
}]);

// Stream AI response
const eventSource = new EventSource(`/api/messages/stream?content=${encodeURIComponent(userInput)}`);
```

Result: Smooth, responsive chat experience even with complex legal research.

## Legal Research Integration

### Exa Search API Configuration

Exa provides neural search specifically optimized for legal research:

**Search Configuration:**
```typescript
const exaConfig = {
  apiKey: process.env.EXA_API_KEY,
  baseUrl: "https://api.exa.ai",
  searchOptions: {
    type: "neural", // Semantic understanding
    numResults: 10,
    useAutoprompt: true,
    includeDomains: [
      "canlii.org",
      "justice.gouv.qc.ca",
      "legisquebec.gouv.qc.ca",
      "scc-csc.ca"
    ]
  }
};
```

**Why These Sources?**
- **CanLII:** Comprehensive Canadian case law
- **justice.gouv.qc.ca:** Official Quebec legal resources
- **legisquebec.gouv.qc.ca:** Current Quebec legislation
- **scc-csc.ca:** Supreme Court precedents

### Example: Employment Law Research

**Query:** "What is the minimum notice period for terminating an employee in Quebec?"

**Exa Search Process:**
1. Neural search across authorized domains
2. Finds Quebec Civil Code Article 2091
3. Locates relevant jurisprudence from CanLII
4. Extracts content from official sources

**Results:**
```markdown
## Notice Period Requirements (Quebec)

**Legal Framework:**
- Quebec Civil Code, Article 2091
- Reasonable notice based on employment duration, position, age

**Minimum Standards:**
- < 1 year: 1 week
- 1-5 years: 2 weeks
- 5-10 years: 4 weeks
- 10+ years: 8 weeks

**Jurisprudence:**
- *Machtinger v. HOJ Industries* - Common law reasonable notice
- *Wallace v. United Grain Growers* - Bad faith damages

**Source:** [legisquebec.gouv.qc.ca/fr/document/lc/CCQ-1991](link)
```

### Research History Caching

Legal research is cached locally to avoid redundant API calls:

```typescript
interface CachedResearch {
  query: string;
  results: ExaSearchResult[];
  timestamp: Date;
  jurisdiction: string;
}
```

**Benefits:**
- Faster subsequent queries
- Reduced API costs
- Offline access to previous research

## Case Management System

### Data Model

**Cases Table:**
```typescript
interface Case {
  id: string;
  caseNumber: string;
  client: string;
  caseType: "contract" | "litigation" | "advisory" | "compliance";
  status: "active" | "archived" | "closed";
  description: string;
  createdAt: Date;
}
```

**Documents Table:**
```typescript
interface Document {
  id: string;
  caseId: string;
  title: string;
  type: "contract" | "letter" | "agreement" | "memo";
  content: string;
  riskScore?: number;
  analysis?: DocumentAnalysis;
}
```

### Case Workflow

**1. Create Case**
```typescript
POST /api/cases
{
  "client": "Tech Startup Inc.",
  "caseType": "contract",
  "description": "Partnership agreement review"
}
```

**2. Upload Documents**
```typescript
POST /api/documents
{
  "caseId": "case-123",
  "title": "Partnership Agreement Draft",
  "type": "agreement",
  "content": "..." // Full contract text
}
```

**3. Analyze Document**
```typescript
POST /api/documents/:id/analyze
// AI performs risk assessment
```

**4. Track Progress**
- Documents associated with case
- Analysis results stored
- Status updates logged

## Contract Generation Deep Dive

### Template System

Each contract type has a base template:

**Partnership Agreement Template:**
```markdown
# PARTNERSHIP AGREEMENT

Between:
- [Partner 1 Name], residing at [Address]
- [Partner 2 Name], residing at [Address]

## 1. Formation
The parties agree to form a partnership under Quebec Civil Code.

## 2. Purpose
[Business purpose]

## 3. Contributions
- Partner 1: [Contribution details]
- Partner 2: [Contribution details]

## 4. Profit Distribution
[Distribution formula based on contributions]

## 5. Management
[Decision-making process]

## 6. Dissolution
[Termination conditions]
```

### AI Customization Process

**User Requirements:**
```json
{
  "type": "partnership",
  "partners": [
    {"name": "Alice Developer", "contribution": 60000},
    {"name": "Bob Designer", "contribution": 40000}
  ],
  "purpose": "Software development consultancy",
  "profitSplit": "proportional"
}
```

**Claude''s Analysis:**
1. Selects partnership template
2. Calculates profit distribution (60/40 based on contributions)
3. Adds Quebec-specific clauses
4. Includes protective provisions
5. Ensures Civil Code compliance

**Generated Contract:**
```markdown
## 4. PROFIT DISTRIBUTION

Net profits shall be distributed proportionally to capital contributions:
- Alice Developer: 60% (contribution: $60,000)
- Bob Designer: 40% (contribution: $40,000)

This distribution reflects Article 2202 of the Quebec Civil Code, 
allowing partners to agree on profit sharing different from 
contribution ratios when explicitly stated.
```

## Document Analysis System

### Risk Assessment Algorithm

**Step 1: Clause Extraction**
Claude identifies all contractual clauses:
- Payment terms
- Confidentiality provisions
- Termination conditions
- Liability limitations
- Dispute resolution

**Step 2: Risk Identification**
For each clause, AI assesses:
- Legal enforceability
- Compliance with Quebec law
- Fairness and balance
- Missing protections

**Step 3: Severity Classification**
```typescript
type RiskSeverity = "low" | "medium" | "high";

interface Risk {
  clause: string;
  severity: RiskSeverity;
  issue: string;
  legalBasis: string;
  recommendation: string;
}
```

**Step 4: Overall Score Calculation**
```typescript
const calculateRiskScore = (risks: Risk[]): number => {
  const weights = { low: 5, medium: 15, high: 30 };
  const totalRisk = risks.reduce((sum, risk) => 
    sum + weights[risk.severity], 0
  );
  return Math.max(0, 100 - totalRisk);
};
```

**Step 5: Recommendations**
AI provides actionable improvements:
- Specific clause revisions
- Additional protective language
- Compliance requirements
- Negotiation strategies

### Example: NDA Analysis

**Document:** Standard NDA with one-sided obligations

**AI Analysis:**
```json
{
  "summary": "Non-disclosure agreement with imbalanced obligations",
  "risks": [
    {
      "clause": "Confidentiality Obligations",
      "severity": "high",
      "issue": "Only one party has confidentiality obligations",
      "legalBasis": "Quebec Civil Code - mutual obligation principle",
      "recommendation": "Add reciprocal confidentiality clause for both parties"
    },
    {
      "clause": "Duration",
      "severity": "medium",
      "issue": "Perpetual confidentiality may be unenforceable",
      "legalBasis": "Reasonableness requirement - Civil Code Article 1434",
      "recommendation": "Limit to 5 years for trade secrets, 2 years for other information"
    }
  ],
  "overallScore": 55,
  "compliance": "Requires modifications for Quebec enforceability"
}
```

## Design System: Professional Law Firm Aesthetic

### Color Palette

**Royal Blue (#2563EB):**
- Primary actions
- Trust and authority
- Call-to-action buttons

**Teal (#14B8A6):**
- AI indicators
- Innovation signals
- Success states

**Deep Charcoal (#0d0d0f):**
- Professional dark background
- Reduces eye strain for document review

**Silver Text (#E5E7EB):**
- High readability
- Opacity variants for hierarchy

### Typography Hierarchy

**Display Font: DM Sans (600, 700)**
```css
.case-title {
  font-family: "DM Sans", sans-serif;
  font-weight: 600;
  font-size: 24px;
}
```

**Body Font: Inter (400, 500, 600, 700)**
```css
.document-content {
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: 1.6;
}
```

**Monospace: JetBrains Mono**
```css
.case-number {
  font-family: "JetBrains Mono", monospace;
  font-weight: 500;
}
```

### Mobile-First Interface

**Bottom Navigation:**
- 📁 Cases - Case management
- 📄 Documents - Document studio
- ⚖️ Library - Legal legislation
- 🤖 Agent - AI advisor
- 🔍 Research - Legal research

**Touch Optimization:**
- Minimum 44x44px touch targets
- Swipeable card interfaces
- Large tap areas for actions
- No hover-dependent interactions

**Glass-Morphism Effects:**
```css
.card-elevated {
  background: rgba(31, 31, 31, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## Performance Optimizations

### 1. Streaming Response Chunking

Instead of waiting for complete AI response:
```typescript
eventSource.onmessage = (event) => {
  if (event.data === "[DONE]") {
    eventSource.close();
    return;
  }
  
  const chunk = event.data;
  setResponse(prev => prev + chunk);
};
```

**Benefits:**
- Progressive content display
- Perceived speed improvement
- Better UX during long research queries

### 2. Research Query Deduplication

```typescript
const researchCache = new Map<string, CachedResult>();

const search = async (query: string) => {
  const cached = researchCache.get(query);
  if (cached && !isExpired(cached)) {
    return cached.results;
  }
  
  const results = await exaSearch(query);
  researchCache.set(query, { results, timestamp: Date.now() });
  return results;
};
```

### 3. Optimistic UI Updates

```typescript
// Immediate user feedback
const handleSendMessage = async (content: string) => {
  // Add user message instantly
  addMessage({ role: "user", content });
  
  // Stream AI response
  streamAIResponse(content);
};
```

## Security & Compliance

### Attorney-Client Privilege

**Data Handling:**
- All communications encrypted in transit (HTTPS)
- Case data stored securely
- No third-party data sharing
- User data deletion on request

**Future: PIPEDA Compliance**
- Personal Information Protection
- Consent management
- Data retention policies
- Breach notification protocols

### Audit Trail

Every action logged for professional responsibility:

```typescript
interface AuditLog {
  timestamp: Date;
  userId: string;
  action: string;
  caseId?: string;
  documentId?: string;
  details: Record<string, any>;
}
```

**Logged Actions:**
- Case creation/modification
- Document uploads
- AI analysis requests
- Contract generation
- Legal research queries

## Challenges & Solutions

### Challenge 1: Legal Citation Accuracy

**Problem:** AI must cite exact legal sources, not paraphrase.

**Solution:**
- Exa API returns actual source URLs
- Claude includes verbatim quotes
- Source attribution mandatory
- Links to official legal texts

### Challenge 2: Jurisdiction Confusion

**Problem:** Mixing Quebec provincial law with federal law.

**Solution:**
- Explicit jurisdiction tagging in searches
- Claude trained to recognize jurisdiction markers
- User can specify jurisdiction in queries
- System defaults to Quebec for provincial matters

### Challenge 3: Contract Enforceability

**Problem:** Generated contracts must be legally sound.

**Solution:**
- Templates reviewed by legal professionals
- Quebec Civil Code compliance checks
- Automatic inclusion of required clauses
- Disclaimer: "Review by licensed attorney recommended"

### Challenge 4: SSE Connection Stability

**Problem:** Mobile networks can drop SSE connections.

**Solution:**
- Automatic reconnection logic
- Message recovery from last received chunk
- Fallback to polling if SSE unavailable
- User-friendly error messages

## Future Roadmap

### Phase 2: Advanced Research
- Case law similarity search
- Precedent strength analysis
- Automatic citation checking
- Legal research memos

### Phase 3: E-Filing Integration
- Court document preparation
- Electronic filing capabilities
- Deadline tracking
- Automatic service of documents

### Phase 4: Multi-Jurisdiction
- Support for all Canadian provinces
- US state law coverage
- International treaty research
- Conflict of laws analysis

### Phase 5: Practice Management
- Time tracking integration
- Billing automation
- Client portal
- Task management

## Key Takeaways

**1. Authoritative Sources Are Essential**
Legal AI must cite reliable sources. Exa API''s ability to search specific legal databases (CanLII, Quebec legislation) is fundamental.

**2. Tool Autonomy Enables Complex Workflows**
Claude independently decides when to research, generate contracts, or analyze documents. This autonomy creates a true AI advisor, not just an assistant.

**3. Streaming Improves UX Dramatically**
Server-Sent Events allow progressive response display. Users see results immediately instead of waiting for complete AI processing.

**4. Bilingual Capability Is Non-Negotiable**
Quebec legal practice requires French and English fluency. Claude''s bilingual training makes this seamless.

**5. Risk Assessment Requires Precision**
Legal document analysis must provide severity levels, specific issues, and actionable recommendations—not vague warnings.

**6. Mobile-First Design Matters**
Lawyers work on the go. Mobile optimization isn''t optional for modern legal tools.

## Conclusion

AgentiLaw.ai demonstrates that AI can perform sophisticated legal work autonomously when properly architected. By combining Claude Sonnet 4.5''s reasoning capabilities, Exa Search API''s authoritative legal research, and a carefully designed streaming architecture, we''ve created a legal AI that lawyers can actually use in practice.

The result: faster legal research, accurate contract generation, and comprehensive document analysis—all with Quebec law compliance.

**Try AgentiLaw.ai:** [https://agentilawai.app](https://agentilawai.app)

---

*Building AI-powered legal tools? Follow AgentiLab for more technical deep dives into autonomous AI systems.*',
  'Simon-Pierre Boucher',
  '2025-10-14 11:00:00',
  'https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/agentilaw-blog-cover.png',
  ARRAY['AI', 'Legal Tech', 'Claude Sonnet', 'Exa Search', 'Contract Generation', 'Document Analysis', 'Quebec Law', 'Case Management'],
  18
);
