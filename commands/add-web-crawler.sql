-- Add AgentiLab Ultra Web Crawler project
-- URL: https://web-crawler.app
-- Date: October 14, 2025

INSERT INTO projects (slug, title, description, tech, image, overview, features, live_url)
VALUES (
  'web-crawler',
  'AgentiLab Ultra Web Crawler - AI-Powered Intelligent Crawler',
  'Advanced AI-powered web crawler with intelligent parsing, semantic analysis using OpenAI GPT-5, and real-time progress visualization. Recursive crawling with Playwright for JavaScript-rendered content, WebSocket live updates, multi-format export, and comprehensive metadata extraction.',
  ARRAY['React 18', 'TypeScript', 'Playwright', 'OpenAI GPT-5', 'Node.js', 'Express', 'WebSocket', 'Cheerio', 'Tailwind CSS', 'shadcn/ui', 'Headless Chromium'],
  'https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/web-crawler-image.png',
  '# AgentiLab Ultra Web Crawler - AI-Powered Intelligent Crawler

## Overview

AgentiLab Ultra Web Crawler is an advanced web crawling solution that combines the power of Playwright headless browser automation with OpenAI GPT-5 semantic analysis. The application provides real-time crawling with intelligent content parsing, automatic summarization, and comprehensive metadata extraction.

## Core Capabilities

The crawler enables users to:
- **Recursive Web Crawling** with Playwright for JavaScript-rendered content
- **AI-Powered Analysis** using OpenAI GPT-5 for automatic content summarization
- **Real-Time Progress Tracking** via WebSocket live updates
- **Advanced Configuration** with depth control, page limits, rate limiting, filters
- **Multi-Format Export** in JSON, CSV, and Markdown formats
- **Metadata Extraction** including titles, descriptions, Open Graph tags, headings, links, images

## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe web applications
- **Tailwind CSS** with AgentiLab dark theme
- **shadcn/ui** components for modern UI
- **WebSocket Client** for real-time updates
- **Responsive Design** optimized for crawl monitoring

### Backend Architecture
- **Node.js** with Express for robust API
- **Playwright** for headless Chromium browser automation
- **Cheerio** for efficient HTML parsing
- **WebSocket Server** for real-time communication
- **In-memory storage** for rapid crawl session management
- **OpenAI GPT-5** for semantic content analysis

## Intelligent Web Crawling System

### Playwright-Based Crawler

Advanced browser automation for modern web:
- **JavaScript Execution** - Renders React, Vue, Angular applications
- **Dynamic Content** - Waits for AJAX and lazy-loaded content
- **Headless Chromium** - Full browser environment without UI
- **Network Interception** - Captures API calls and resources
- **Screenshot Capability** - Visual page capture (optional)

### Recursive Crawling Algorithm

Smart depth-first traversal:
1. Start from seed URL
2. Load page with Playwright
3. Extract all internal links
4. Filter by domain and keyword rules
5. Queue links for recursive crawling
6. Respect depth limits and max pages
7. Apply rate limiting between requests

### Content Extraction Pipeline

Comprehensive data extraction:
- **Page Title** - Primary heading identification
- **Meta Description** - SEO description extraction
- **Open Graph Tags** - Social media metadata (og:title, og:description, og:image)
- **Headings Hierarchy** - H1, H2, H3 structure mapping
- **Internal Links** - Site structure and navigation
- **External Links** - Outbound references
- **Images** - All image sources with alt text
- **Word Count** - Content volume metrics
- **Custom Metadata** - Extensible extraction rules

## AI-Powered Semantic Analysis

### OpenAI GPT-5 Integration

Intelligent content understanding:

**Automatic Summarization**
- Extract key points from page content
- Generate concise 2-3 sentence summaries
- Identify main topics and themes

**Page Type Detection**
- Homepage, Product, Article, Blog
- About, Contact, FAQ, Documentation
- E-commerce, News, Portfolio
- Custom category classification

**Tonality Analysis**
- Commercial vs. Informative
- Professional vs. Casual
- Technical vs. General audience
- Promotional vs. Educational

**Theme Identification**
- Extract 3-5 primary themes
- Categorize content topics
- Detect subject matter focus

**Keyword Extraction**
- Identify 5-10 relevant keywords
- SEO keyword discovery
- Topic clustering

## Real-Time WebSocket System

### Live Progress Updates

Server-to-client real-time communication:

**WebSocket Messages:**
- `crawl:start` - Initiate crawling session
- `crawl:stop` - Terminate active crawl
- `session:update` - Status and statistics update
- `page:crawled` - New page successfully crawled
- `log:entry` - Crawler log message
- `progress:update` - Crawl progress metrics

**Progress Dashboard:**
- Total pages discovered
- Pages successfully crawled
- Pages pending in queue
- Errors encountered
- Real-time percentage completion

### Log Streaming

Terminal-style log viewer:
- Color-coded log levels (info, warn, error, success)
- Timestamp for each entry
- URL being processed
- Error details and stack traces
- Performance metrics

## Advanced Configuration Options

### Crawl Parameters

**Depth Control**
- Maximum crawl depth: 1-10 levels
- Breadth-first or depth-first traversal
- Smart depth limits per domain section

**Page Limits**
- Max pages to crawl: 1-1000
- Early termination on limit
- Priority queue for important pages

**Rate Limiting**
- Delay between requests: 100-5000ms
- Respectful crawling to avoid server overload
- Adaptive rate limiting based on server response

**Domain Filtering**
- Restrict to same domain
- Include subdomains option
- Whitelist/blacklist domains

**Keyword Filtering**
- Include URLs matching keywords
- Exclude URLs with specific terms
- Regex pattern matching

**Custom Headers**
- User-Agent customization
- Authentication headers
- Custom request headers

## Export & Data Formats

### Multi-Format Export

Flexible data export options:

**JSON Export**
```json
{
  "session_id": "uuid",
  "start_url": "https://example.com",
  "pages": [
    {
      "url": "https://example.com/page",
      "title": "Page Title",
      "summary": "AI-generated summary",
      "page_type": "article",
      "tonality": "informative",
      "themes": ["tech", "AI", "automation"],
      "keywords": ["crawler", "AI", "analysis"],
      "word_count": 1250,
      "depth": 1,
      "links": [...],
      "images": [...]
    }
  ]
}
```

**CSV Export**
Spreadsheet-compatible format:
- URL, Title, Summary, Page Type
- Tonality, Themes, Keywords
- Word Count, Depth, Status
- Timestamp, Response Time

**Markdown Export**
Human-readable documentation:
```markdown
# Crawl Report: example.com

## Summary
- Total Pages: 50
- Crawl Depth: 3
- Duration: 2m 15s

## Pages

### Homepage (/)
**Summary:** Main landing page with product overview
**Type:** homepage | **Tone:** commercial
**Themes:** product, features, pricing
...
```

## Design System

### AgentiLab Dark Theme

Professional crawler interface:

**Color Palette:**
- **Primary Blue (#3B82F6):** Active states, links, buttons
- **Accent Teal (#14B8A6):** Success states, highlights
- **Near Black (#0A0A0A):** Main background
- **Elevated Cards (#141414):** Surface elevation
- **Muted Text:** Progress and secondary info

### Typography
- **UI Text:** Inter for readability
- **Code/URLs:** JetBrains Mono for technical content
- **Hierarchy:** Clear visual structure for data

### Key UI Components

**URL Input Card**
- Large input field with validation
- Collapsible advanced configuration panel
- Quick presets for common crawl types

**Progress Dashboard**
- 4 stat cards with live updates
- Animated gradient progress bar
- Visual indicators for status

**Log Viewer**
- Terminal-style scrolling logs
- Color-coded by severity
- Auto-scroll with pause option

**Results Grid**
- Card-based layout for pages
- AI summary prominently displayed
- Expandable metadata sections

**Export Controls**
- Format selector (JSON/CSV/Markdown)
- Preview before download
- Batch export all results

## Use Cases & Applications

### SEO & Content Analysis
- Audit website content quality
- Discover broken links and errors
- Analyze competitor websites
- Generate sitemap documentation

### Market Research
- Competitor content analysis
- Industry trend identification
- Product catalog scraping
- Pricing intelligence

### Data Collection
- Lead generation from directories
- News article aggregation
- Research paper discovery
- Documentation indexing

### Website Monitoring
- Content change detection
- New page discovery
- Link integrity checking
- Performance monitoring

## Performance & Scalability

### Optimization Strategies

**Concurrent Crawling**
- Multiple Playwright contexts
- Parallel page processing
- Worker thread pool (future)

**Intelligent Caching**
- Page content caching
- DNS resolution caching
- AI analysis result caching

**Resource Management**
- Memory-efficient page storage
- Browser instance pooling
- Automatic cleanup of old sessions

**Rate Limiting**
- Adaptive delays based on server response
- Respectful crawling practices
- Configurable throttling',
  ARRAY[
    'Intelligent Web Crawling - Recursive crawling with Playwright for JavaScript-rendered content',
    'AI-Powered Analysis - OpenAI GPT-5 integration for automatic content summarization and insights',
    'Real-Time Updates - WebSocket-based live progress tracking and log streaming',
    'Advanced Configuration - Depth control, page limits, rate limiting, domain/keyword filtering',
    'Multi-Format Export - JSON, CSV, and Markdown export options with full metadata',
    'Metadata Extraction - Titles, descriptions, Open Graph tags, headings, links, images',
    'Playwright Browser Automation - Headless Chromium for dynamic JavaScript content',
    'Semantic Analysis - GPT-5 powered page type detection, tonality analysis, theme identification',
    'Keyword Extraction - Automatic discovery of 5-10 relevant keywords per page',
    'Progress Dashboard - Real-time statistics with total, crawled, pending, and error counts',
    'Log Viewer - Terminal-style color-coded logs with timestamps and error details',
    'Results Grid - Card-based layout with AI summaries and expandable metadata',
    'Domain Filtering - Restrict crawling to same domain with subdomain options',
    'Rate Limiting - Configurable delays (100-5000ms) between requests for respectful crawling',
    'Depth Control - Maximum crawl depth of 1-10 levels with smart traversal',
    'Page Limits - Configurable max pages (1-1000) with priority queue',
    'Content Summarization - AI-generated 2-3 sentence summaries for each page',
    'Page Type Detection - Automatic classification (homepage, product, article, blog, etc.)',
    'Custom Headers - User-Agent customization and authentication header support',
    'WebSocket Communication - Real-time session updates, page crawled events, progress tracking'
  ],
  'https://web-crawler.app'
);
