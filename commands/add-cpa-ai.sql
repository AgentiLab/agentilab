-- Add CPAai - Intelligent Digital Accountant project
-- URL: https://cpa-ai.app
-- Date: October 14, 2025

INSERT INTO projects (slug, title, description, tech, image, overview, features, live_url)
VALUES (
  'cpa-ai',
  'CPAai - Intelligent Digital Accountant',
  'Autonomous accounting application powered by Claude Sonnet 4.5 and Exa API. Capture receipts with mobile camera, let AI analyze, classify, and automatically record transactions with double-entry bookkeeping, generate financial statements, and search tax rules online.',
  ARRAY['React 18', 'TypeScript', 'Vite', 'Express', 'Claude Sonnet 4.5', 'Tesseract.js OCR', 'Exa API', 'Tailwind CSS', 'shadcn/ui', 'Double-Entry Bookkeeping'],
  'https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/cpa-ai-image.png',
  '# CPAai - Intelligent Digital Accountant

## Overview

CPAai by AgentiLab is an intelligent mobile-first accounting application that revolutionizes bookkeeping through AI automation. Powered by Claude Sonnet 4.5 and Exa API, the application transforms receipt photos into complete accounting entries with zero manual data entry.

## Core Capabilities

The application enables users to:
- **Capture receipts** with mobile camera using native interface
- **AI-powered analysis** for automatic classification and categorization
- **Automated accounting** with double-entry bookkeeping
- **Complete general ledger** with balanced transactions
- **Automatic financial statements** generation
- **Online tax rules search** using Exa API for real-time compliance

## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast builds and HMR
- **Tailwind CSS** with custom accounting-focused design
- **shadcn/ui** components optimized for mobile-first experience
- **Bottom navigation bar** for seamless mobile UX

### Backend Architecture
- **Node.js** with Express for robust API
- **In-memory storage** for rapid prototyping (PostgreSQL-ready schema)
- **Claude Sonnet 4.5** as the autonomous AI agent
- **Tesseract.js** for OCR text extraction
- **Exa API** for intelligent tax rules search and crawling

## AI Agent System

The autonomous Claude Sonnet 4.5 agent orchestrates 8 specialized tools:

**1. OCRReader** - Extracts text from images and PDFs using Tesseract.js

**2. AccountingParser** - Intelligently classifies and parses accounting data (vendor, date, amount, items, category)

**3. LedgerUpdater** - Updates general ledger with verification and double-entry validation

**4. FinancialSynthesizer** - Generates automatic financial statements (Balance Sheet, Income Statement, Cash Flow)

**5. ExaSearchTool** - Real-time search for tax rules from CRA, Revenu Québec, IFRS, CPA Canada

**6. ValidationAgent** - Verifies balance accuracy and tax compliance

**7. AccountUpdater** - Modifies existing accounts with complete audit trail

**8. ReportGenerator** - Creates customized financial and tax reports

## Receipt Processing Workflow

1. User captures photo with mobile camera
2. OCR extracts text from receipt
3. Claude analyzes and structures data
4. Automatic account classification
5. Double-entry journal entry creation
6. Balance updates across all accounts
7. Audit log created for compliance

## Advanced Agent Capabilities

### Intelligent Tax Search
- Automatic detection of tax research needs
- Optimized queries for CRA, Revenu Québec, IFRS sources
- Results synthesis and local caching

### Account Management
- Balance modifications with equilibrium verification
- Account name updates
- Complete audit trail for all modifications

### Multi-Step Reasoning
The agent employs sophisticated reasoning:
- **Thinking**: Analytical reasoning process
- **Search**: Tax rules research when needed
- **Decision**: Accounting classification decisions
- **Verification**: Balance and compliance checks
- **Action**: Automated transaction recording

## Data Schema

### Core Tables
- **accounts**: Chart of accounts (assets, liabilities, equity, revenue, expenses)
- **transactions**: Double-entry transactions
- **ledger_entries**: Automatic journal entries
- **reports**: Generated financial statements
- **tax_rules**: Cached Exa search results
- **audit_logs**: Agent action journal

## Financial Statements

The application automatically generates:

**Balance Sheet** - Assets, liabilities, and equity with real-time balancing

**Income Statement** - Revenue and expenses with period comparison

**Cash Flow Statement** - Operating, investing, and financing activities

All statements are generated automatically per period with drill-down capabilities.

## Design System

### Color Palette
- **Primary Blue**: #3B82F6 for main actions
- **Teal Success**: #14B8A6 for confirmations
- **Dark Background**: #1C2128 for modern UI
- **Card Surface**: #242C37 for elevated content

### Typography
- **UI Text**: Inter sans-serif for readability
- **Amounts**: JetBrains Mono monospace for precision
- **Hierarchy**: 12px - 36px with clear visual structure

### Mobile-First Components
- Fixed bottom navigation (5 tabs)
- Cards with hover-elevate effects
- Skeleton loaders for smooth transitions
- Toast notifications for instant feedback',
  ARRAY[
    'Mobile Receipt Capture - Native camera interface for instant receipt photography and processing',
    'AI-Powered OCR - Tesseract.js text extraction from images and PDF documents',
    'Intelligent Classification - Claude Sonnet 4.5 automatically categorizes transactions and assigns accounts',
    'Double-Entry Bookkeeping - Automatic journal entries with debit/credit balance verification',
    'General Ledger - Complete ledger with real-time balance updates and transaction history',
    'Balance Sheet - Automatic generation showing assets, liabilities, and equity',
    'Income Statement - Revenue and expense analysis with period comparisons',
    'Cash Flow Statement - Operating, investing, and financing activities tracking',
    'Tax Rules Search - Real-time search via Exa API for CRA, Revenu Québec, IFRS, CPA Canada regulations',
    'AI Agent Console - Live logs of all agent actions, tool usage, and performance metrics',
    'Audit Trail - Complete history of all transactions and modifications for compliance',
    'Autonomous Agent - Claude Sonnet 4.5 with 8 specialized tools for end-to-end automation',
    'Multi-Step Reasoning - Advanced thinking, search, decision, verification, and action capabilities',
    'Account Management - Create, update, and modify accounts with automatic balance adjustments',
    'Cached Search Results - Local storage of tax rules for faster repeated queries',
    'Mobile-First Design - Optimized interface with bottom navigation for smartphone use',
    'Real-time Validation - Continuous verification of accounting equation (Assets = Liabilities + Equity)',
    'Report Generation - Customized financial and tax reports on demand',
    'Receipt Parser - Extracts vendor, date, amount, line items, and tax information automatically',
    'Dark Mode Interface - Professional dark theme optimized for extended use'
  ],
  'https://cpa-ai.app'
);
