-- SQL command to insert AI Web Search project into the database
-- Note: Replace 'YOUR_IMAGE_URL_HERE' with an actual image URL
-- You can generate an image using the Image Playground feature with a prompt like:
-- "Modern AI search engine interface with holographic search bar, neural network visualization, futuristic blue and teal design, digital art"

INSERT INTO projects (
  slug,
  title,
  description,
  tech,
  image,
  gallery,
  overview,
  features,
  live_url
) VALUES (
  'ai-web-search',
  'AI Web Search - AI Research Engine',
  'An intelligent AI-powered search engine powered by Claude Sonnet 4, featuring web search, crawling, vector embeddings, and semantic search capabilities.',
  ARRAY[
    'React 18',
    'TypeScript',
    'Claude Sonnet 4',
    'PostgreSQL',
    'pgvector',
    'Node.js',
    'Express',
    'Tailwind CSS',
    'Vite',
    'Tavily AI',
    'OpenAI Embeddings',
    'SerpAPI'
  ],
  'YOUR_IMAGE_URL_HERE',
  ARRAY[
    'https://example.com/screenshot1.png',
    'https://example.com/screenshot2.png'
  ],
  'AI Web Search is an intelligent research engine powered by Claude Sonnet 4, combining the power of advanced AI with cutting-edge tools for web search, content crawling, vector embeddings, and semantic search.

The application features a modern interface inspired by Perplexity AI with a clean design, real-time streaming responses with typewriter effect, and an elegant display of search results with verified citations and sources.

Built with AgentiLab''s design system, the application uses a professional color palette, modern typography (Space Grotesk + Inter), and a dark-first approach for a premium user experience.

**Technical Architecture:**
The system uses direct HTTP calls to Claude Sonnet 4 API with Server-Sent Events (SSE) streaming for real-time responses. The intelligent workflow generates 5 optimized search queries for each user question, executes parallel searches via Tavily AI Search, and synthesizes comprehensive markdown-formatted answers.

**AI Agent Tools:**
Claude autonomously uses various tools including web search (Tavily), web crawling (Cheerio), vector semantic search (PostgreSQL pgvector), and SerpAPI integrations for images, maps, shopping, finance data, job search, flights, hotels, videos, Google Trends, Google Scholar, and App Store search.

**Vector Embeddings:**
The system uses OpenAI''s text-embedding-3-large model (3072 dimensions) stored in PostgreSQL with pgvector extension, enabling powerful semantic search with cosine similarity. Crawled content is automatically truncated to respect the 8192 token limit.',
  ARRAY[
    'Real-time AI-powered search with Claude Sonnet 4',
    'Intelligent query generation (5 optimized searches per question)',
    'Web search integration with Tavily AI',
    'Advanced web crawling and content extraction',
    'Vector embeddings with OpenAI (3072 dimensions)',
    'Semantic search using PostgreSQL pgvector',
    'Real-time streaming responses with SSE',
    'Markdown rendering with syntax highlighting',
    'SerpAPI integration for images, maps, shopping, and more',
    'Modern glass-morphism UI with animations',
    'Dark/light mode with smooth transitions',
    'Mobile-responsive design',
    'Source citations and verified references',
    'Collapsible search process display',
    'Progress indicator with query counter',
    'Google Maps directions and routing',
    'Google Shopping product search',
    'Financial data and stock quotes',
    'Job search via Google Jobs',
    'Flight and hotel search',
    'Video search across platforms',
    'Google Trends data visualization',
    'Academic search via Google Scholar',
    'App Store application discovery'
  ],
  NULL
);

-- To get the image URL:
-- 1. Go to your Dashboard > Image Playground
-- 2. Generate an image with prompt: "Modern AI search engine interface with holographic search bar, neural network visualization, futuristic blue and teal design, digital art"
-- 3. Go to History tab and download the image
-- 4. Upload to your preferred hosting (GitHub, CDN, etc.)
-- 5. Update the 'image' field with: UPDATE projects SET image = 'YOUR_ACTUAL_URL' WHERE slug = 'ai-web-search';
