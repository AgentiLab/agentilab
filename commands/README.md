# SQL Commands Repository

This folder contains all SQL commands for managing AgentiLab projects and blog posts.

## Project Commands

### Applications Added

1. **[add-fin-planer.sql](./add-fin-planer.sql)** - Agentilab Fin Planer
   - URL: https://fin-planer.app
   - AI Financial Planning Assistant with Claude Sonnet 4.5
   - 20 features including portfolio management, market intelligence, tax optimization

2. **[add-cpa-ai.sql](./add-cpa-ai.sql)** - CPAai
   - URL: https://cpa-ai.app
   - Intelligent Digital Accountant with AI-powered OCR
   - 20 features including receipt capture, double-entry bookkeeping, financial statements

3. **[add-agentilaw-ai.sql](./add-agentilaw-ai.sql)** - AgentiLaw.ai
   - URL: https://agentilawai.app
   - Autonomous Legal Advisor with Claude Sonnet 4.5 and Exa Search API
   - 20 features including legal research, contract generation, document analysis, case management

4. **[add-agentimed-ai.sql](./add-agentimed-ai.sql)** - AgentiMed.ai
   - URL: https://agentimedai.app
   - Autonomous Medical Assistant with Claude Sonnet 4.5 and Exa API
   - 20 features including differential diagnosis, vital signs monitoring, symptom tracking, medical research

5. **[add-web-crawler.sql](./add-web-crawler.sql)** - AgentiLab Ultra Web Crawler
   - URL: https://web-crawler.app
   - AI-Powered Intelligent Crawler with OpenAI GPT-5 and Playwright
   - 20 features including intelligent crawling, semantic analysis, real-time WebSocket updates, multi-format export

6. **[add-agentilabook.sql](./add-agentilabook.sql)** - AgentiLabook
   - URL: https://agentilabook.app
   - AI-Powered Jupyter Studio with Claude 3.5 Sonnet and Python 3.11
   - 20 features including notebook generation, code execution, AI explanations, visualization support

7. **[add-widget-hub.sql](./add-widget-hub.sql)** - AgentiLab Widget Library
   - URL: https://widget-hub.app
   - Premium Embeddable Widgets with OpenAI GPT-5 and Real-time Data
   - 20 features including population counter, weather, crypto ticker, AI quotes, world clock widgets

8. **[add-agentifiny.sql](./add-agentifiny.sql)** - AgentiFiny - The Infinite Conversational AI
   - URL: https://agentifiny.app
   - Perpetual AI Companion with Claude Sonnet 4.5 and Emotional Intelligence
   - 20 features including infinite memory, real-time emotional analytics, WebSocket streaming, mood/stress tracking

9. **[add-ai-review.sql](./add-ai-review.sql)** - AgentiLab AI Review Journal
   - URL: https://agentilab-ai-review.app
   - Sophisticated Academic Journal Platform for AI Research
   - 20 features including interactive TOC, 5 editorial categories, tag filtering, PDF downloads, Markdown rendering

10. **[add-finsight-pro.sql](./add-finsight-pro.sql)** - FinSight Pro - Real-Time Financial Intelligence Platform
   - URL: https://finsightpro.app
   - TradingView-Level Financial Analysis with AI-Powered Insights
   - 30 features including multi-chart analysis, AI report generator, portfolio tracker, technical indicators, multi-asset coverage

## How to Use

### Execute a Command

```bash
# Using execute_sql_tool in Replit Agent
cat commands/add-fin-planer.sql | psql $DATABASE_URL

# Or manually copy-paste into database console
```

### List All Commands

```bash
ls -la commands/
```

## Command Structure

Each SQL file follows this structure:
- Header comment with app name, URL, and date
- INSERT statement with complete project data:
  - slug (unique identifier)
  - title
  - description (short summary)
  - tech (array of technologies)
  - image (GitHub raw URL)
  - overview (detailed markdown description)
  - features (array of feature descriptions)
  - live_url (application URL)

## Projects Already in Database

As of October 15, 2025:

1. **AI Web Search** - ai-web-search.app
2. **AI Stock** - ai-stock.app
3. **ChatBuilder** - chat-builder.app
4. **Image Playground** - image-playground.app
5. **ProfileAI** - profile-ai.app
6. **BookGen** - book-gen.app
7. **Fin Planer** - fin-planer.app ✅
8. **CPA.ai** - cpa-ai.app ✅
9. **AgentiLaw.ai** - agentilawai.app ✅
10. **AgentiMed.ai** - agentimedai.app ✅
11. **Ultra Web Crawler** - web-crawler.app ✅
12. **AgentiLabook** - agentilabook.app ✅
13. **Widget Library** - widget-hub.app ✅
14. **AgentiFiny** - agentifiny.app ✅
15. **AI Review Journal** - agentilab-ai-review.app ✅
16. **FinSight Pro** - finsightpro.app ✅

## Blog Posts Commands

### Articles Published

1. **[add-blog-cpa-ai.sql](./add-blog-cpa-ai.sql)** - Building CPAai: Autonomous Accounting
   - How CPAai transforms receipt photos into complete accounting entries
   - Architecture deep dive: Claude Sonnet 4.5, Tesseract.js OCR, Exa API
   - The 8 autonomous tools and multi-step reasoning process
   - Read time: 15 minutes
   - Tags: AI, Accounting, Claude Sonnet, Automation, OCR, Tax Research

2. **[add-blog-agentilaw.sql](./add-blog-agentilaw.sql)** - Building AgentiLaw.ai: Autonomous Legal AI
   - Legal AI that researches case law, generates contracts, and analyzes documents
   - Architecture: Claude Sonnet 4.5, Exa Search API, Server-Sent Events streaming
   - The 3 legal tools: search_legal_web, generate_contract, analyze_document
   - Quebec law compliance and bilingual capability
   - Read time: 18 minutes
   - Tags: AI, Legal Tech, Claude Sonnet, Exa Search, Contract Generation, Quebec Law

3. **[add-blog-prompting-techniques.sql](./add-blog-prompting-techniques.sql)** - Advanced Prompting Techniques for AI Applications
   - Master AI prompting with production-tested techniques from AgentiLab
   - Zero-shot, few-shot, chain-of-thought, and structured output strategies
   - Real-world examples from 13 production AI applications
   - Best practices for security, testing, and cost optimization
   - Read time: 20 minutes
   - Tags: AI, Prompting, Claude Sonnet, GPT-5, Prompt Engineering, Chain-of-Thought, Few-Shot Learning, AI Applications, Production AI, LLM Optimization

4. **[add-blog-llm-parameters.sql](./add-blog-llm-parameters.sql)** - LLM API Parameters: Complete Guide to Temperature, Top-p, and More
   - Deep dive into temperature, top_p, frequency_penalty, presence_penalty, max_tokens
   - Production examples from CPAai, AgentiLaw.ai, BookGen, Fin Planer, and more
   - Optimal parameter combinations for different use cases (extraction, creative, code, chat)
   - Cost optimization strategies and A/B testing framework
   - Read time: 22 minutes
   - Tags: AI, LLM, API Parameters, Temperature, GPT-4, Claude, Token Optimization, Production AI, Cost Optimization, AI Configuration

## Notes

- All images use GitHub raw URLs: `https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/{slug}-image.png`
- Features are stored as PostgreSQL arrays
- Overview uses markdown formatting for rich content display
- All descriptions are in English for consistency
