-- Add AgentiLaw.ai - Autonomous Legal Advisor project
-- URL: https://agentilawai.app
-- Date: October 14, 2025

INSERT INTO projects (slug, title, description, tech, image, overview, features, live_url)
VALUES (
  'agentilaw-ai',
  'AgentiLaw.ai - Autonomous Legal Advisor',
  'Professional legal AI advisor powered by Claude Sonnet 4.5 and Exa Search API. Autonomous legal document analysis, contract generation with Quebec law compliance, legal research across authoritative sources, and comprehensive case management with AI-powered risk assessment.',
  ARRAY['React 18', 'TypeScript', 'Express', 'Claude Sonnet 4.5', 'Exa Search API', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'Server-Sent Events', 'Markdown Rendering'],
  'https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/agentilaw-ai-image.png',
  '# AgentiLaw.ai - Autonomous Legal Advisor

## Overview

AgentiLaw.ai is a professional legal AI advisor application that revolutionizes legal services through autonomous AI automation. Powered by Claude Sonnet 4.5 and Exa Search API, the application provides comprehensive legal document analysis, intelligent contract generation, authoritative legal research, and complete case management capabilities.

## Core Capabilities

The application empowers legal professionals and clients to:
- **Case Management** with tracking, status monitoring, and client organization
- **AI Document Analysis** with risk assessment and compliance checking
- **Contract Generation** using Quebec law-compliant templates
- **Legal Research** across authoritative Canadian sources
- **Legal Library** with browseable Quebec and Canadian legislation
- **AI Agent Console** with autonomous tool execution and streaming responses

## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe legal applications
- **Tailwind CSS** with professional law firm aesthetic
- **shadcn/ui** components optimized for legal workflows
- **Framer Motion** for smooth, professional animations
- **Dark mode first** with royal blue and teal accents
- **Mobile-first design** with bottom navigation

### Backend Architecture
- **Node.js** with Express for robust API
- **In-memory storage** for rapid prototyping (PostgreSQL-ready)
- **Claude Sonnet 4.5** as autonomous legal AI agent
- **Exa Search API** for legal research across authoritative sources
- **Server-Sent Events** for real-time streaming responses

## AI Agent with Autonomous Tools

The Claude Sonnet 4.5 agent autonomously executes 3 specialized legal tools:

### Tool 1: search_legal_web
Intelligent legal research via Exa Search API:
- **Authoritative Sources**: CanLII, justice.gouv.qc.ca, legisquebec.gouv.qc.ca, Supreme Court of Canada
- **Categories**: Legislation, jurisprudence, doctrine, general legal information
- **Results**: Formatted with sources, citations, and direct links
- **Caching**: Local storage for offline access

### Tool 2: generate_contract
Professional contract generation:
- **Templates**: Employment agreements, partnership contracts, NDAs, service agreements
- **Quebec Law Compliance**: Automatic adherence to Quebec legal requirements
- **Custom Requirements**: Integration of user-specific needs
- **Professional Formatting**: Legal industry standards

### Tool 3: analyze_document
Comprehensive document analysis:
- **Risk Identification**: Clause-by-clause analysis with severity levels (low/medium/high)
- **Risk Score**: Overall assessment from 0-100
- **Compliance Checking**: Quebec and Canadian law verification
- **Recommendations**: Actionable improvement suggestions
- **Document Types**: Contracts, letters, agreements, memos

## Multi-Round Streaming Architecture

Advanced conversational flow:
1. User sends message via Server-Sent Events
2. Claude analyzes request and autonomously selects appropriate tools
3. Backend executes tools and returns structured results
4. Claude generates final response with tool context
5. Full response streamed to frontend with Markdown formatting
6. Optimistic UI provides instant user feedback

## Case Management System

Comprehensive case tracking:
- **Case Creation**: Organized by type (contract, litigation, advisory, compliance)
- **Status Tracking**: Active, archived, or closed cases
- **Client Management**: Track clients and case numbers
- **Document Association**: Link documents to specific cases
- **History**: Complete audit trail of all case activities

## Document Analysis (Standalone)

Direct document analysis capabilities:
- Executive summary generation
- Risk identification with severity classification
- Overall risk score calculation (0-100 scale)
- Compliance issue detection
- Improvement recommendations
- Support for contracts, letters, agreements, memos

## Legal Research System

Exa Search API integration provides:
- **Authoritative Sources**: Access to CanLII, Quebec government legal sites, Supreme Court
- **Jurisdiction Filtering**: Federal, provincial, municipal levels
- **Category Selection**: Legislation, case law, legal doctrine
- **Research History**: Cached results with offline access
- **Source Attribution**: Direct links to official legal documents

## Contract Generation Templates

Pre-built professional templates:
- **Partnership Agreements**: Business collaboration contracts
- **Non-Disclosure Agreements (NDA)**: Confidentiality protection
- **Service Agreements**: Professional services contracts
- **Employment Contracts**: Quebec labor law compliant

All templates feature:
- AI-powered customization based on requirements
- Quebec Civil Code compliance
- Professional legal formatting
- Clause recommendations

## Legal Library

Comprehensive legislation database:
- Browse Quebec and Canadian legislation
- Article-level navigation
- Searchable legal database
- Direct links to official sources
- Categories: Civil Code, Labor Law, Commercial Law, Criminal Law

## Design System

### Color Palette
- **Royal Blue**: #2563EB for trust, authority, and CTAs
- **Teal**: #14B8A6 for innovation and AI indicators
- **Deep Charcoal**: #0d0d0f professional dark background
- **Subtle Cards**: #1f1f1f elevated surfaces
- **Silver Text**: #E5E7EB with opacity variants

### Typography
- **Primary**: Inter (400, 500, 600, 700) for body text
- **Display**: DM Sans (600, 700) for headers
- **Monospace**: JetBrains Mono for case numbers and legal codes

### Mobile-First Interface
- Bottom navigation with 5 key sections
- Swipeable card interfaces
- Touch-optimized interactions
- Responsive breakpoints for all devices
- Glass-morphism effects for modern aesthetic

## Advanced Features

### Markdown Rendering
Rich text formatting in AI responses:
- ReactMarkdown with remark-gfm plugin
- Code blocks for legal clauses
- Lists for risk factors and recommendations
- Tables for comparative analysis

### Optimistic UI
Instant feedback system:
- User messages appear immediately
- Loading states during AI processing
- Smooth transitions and animations
- Error handling with graceful degradation

### Bilingual Support
French and English capabilities:
- Agent responds in user''s language
- Quebec legal context in French
- Bilingual legal terminology
- Cultural and jurisdictional awareness',
  ARRAY[
    'Autonomous AI Agent - Claude Sonnet 4.5 with 3 specialized legal tools (search, generate, analyze)',
    'Legal Document Analysis - AI-powered risk assessment with 0-100 scoring and clause-by-clause review',
    'Contract Generation - Quebec law-compliant templates for partnerships, NDAs, service agreements, employment',
    'Legal Research - Exa Search API access to CanLII, Quebec government sources, Supreme Court of Canada',
    'Case Management - Track litigation, contracts, advisory, and compliance cases with status monitoring',
    'Legal Library - Browse Quebec and Canadian legislation with article-level navigation',
    'Risk Assessment - Identify risks with severity levels (low/medium/high) and compliance checking',
    'Multi-Round Streaming - Server-Sent Events for real-time AI responses with tool execution',
    'Markdown Rendering - Rich text formatting in chat responses with code blocks and tables',
    'Optimistic UI - Instant user message display with smooth loading states',
    'Research History - Cached legal research results with offline access',
    'Document Studio - Upload, analyze, and manage legal documents by case',
    'Client Tracking - Organize cases by client with case number generation',
    'Compliance Checking - Automatic verification against Quebec and Canadian law',
    'Professional Templates - Pre-built contracts with AI customization capabilities',
    'Bilingual Support - French and English responses with Quebec legal context',
    'Mobile-First Design - Bottom navigation, swipeable cards, touch-optimized interface',
    'Dark Mode Interface - Professional law firm aesthetic with royal blue and teal accents',
    'Source Attribution - Direct links to official legal documents and authoritative sources',
    'Audit Trail - Complete history of case activities and document modifications'
  ],
  'https://agentilawai.app'
);
