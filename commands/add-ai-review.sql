-- Add AgentiLab AI Review Journal
-- URL: https://agentilab-ai-review.app
-- Date: October 15, 2025

INSERT INTO projects (slug, title, description, tech, image, overview, features, live_url)
VALUES (
  'agentilab-ai-review',
  'AgentiLab AI Review Journal',
  'Sophisticated academic journal platform showcasing cutting-edge AI research, cognitive architectures, prompting science, and autonomous agent design. Reading-first experience with interactive TOC, category filtering, and dark-first design.',
  ARRAY['React', 'TypeScript', 'Wouter', 'TailwindCSS', 'Shadcn UI', 'Framer Motion', 'TanStack Query', 'Express.js', 'Zod', 'In-Memory Storage', 'Markdown', 'Inter', 'Poppins', 'JetBrains Mono'],
  'https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/agentilab-ai-review-image.png',
  '# AgentiLab AI Review Journal

## Overview

The **AgentiLab AI Review Journal** is a sophisticated academic publishing platform that bridges creativity and rigor in artificial intelligence research. Designed for researchers, engineers, and AI practitioners, it showcases cutting-edge studies in autonomous agents, cognitive architectures, prompt engineering, and AI ethics.

With a dark-first design combining academic authority and modern tech aesthetics, the journal provides an exceptional reading experience optimized for long-form technical content.

## Key Capabilities

### 📚 Academic Publishing Platform
- **5 Editorial Categories**: Editorial Letters, Research Articles, Applied Studies, AI Perspectives, Community Highlights
- **7 Seed Articles**: Comprehensive coverage of agent frameworks, prompting methodologies, implementation studies
- **Author Profiles**: Researcher bios with avatars and credentials
- **PDF Downloads**: Full article exports for offline reading
- **Citation Support**: Academic-grade article metadata

### 📖 Exceptional Reading Experience
- **Interactive Table of Contents**: Smooth scroll navigation with active section highlighting
- **Mobile-Optimized Typography**: Perfect readability on all devices
- **Markdown Rendering**: Rich content formatting with code blocks, headers, lists
- **Read Time Estimates**: Helps readers plan their study sessions
- **Responsive Layout**: 1-column mobile, 2-column tablet, 3-column desktop

### 🎨 Dark-First Design System
- **Deep Charcoal Background (#0F172A)**: Easy on eyes for long reading sessions
- **Vibrant Blue Accents (#3B82F6)**: Clear CTAs and navigation elements
- **Energetic Teal (#14B8A6)**: Category badges and highlights
- **Premium Typography**: Poppins (headings), Inter (body), JetBrains Mono (code)
- **Glass-Morphism Navigation**: Modern, elevated UI elements

### 🔍 Advanced Filtering & Discovery
- **Category Filtering**: 5 color-coded research categories
- **Tag-Based Search**: Multi-tag filtering for precise article discovery
- **Browse Archive**: Complete article catalog with grid layout
- **Latest Articles**: Homepage highlights 6 most recent publications
- **Smart Navigation**: Breadcrumbs, back buttons, related content

## Why AgentiLab AI Review?

Traditional academic journals are slow, paywalled, and poorly designed. AgentiLab AI Review is different:

✅ **Open Access**: Free for all readers, no paywalls  
✅ **Modern Design**: Beautiful, readable interface for digital age  
✅ **Fast Publishing**: Rapid peer review and publication cycles  
✅ **Interactive Content**: Embedded code, animations, dynamic examples  
✅ **Community-Driven**: Open to contributions from practitioners and researchers  
✅ **Practical Focus**: Balance of theory and real-world applications  

**The future of AI research publishing is open, beautiful, and accessible to all.**',
  ARRAY[
    'Sophisticated academic journal platform for AI research',
    'Dark-first design with vibrant blue and teal accents',
    'Interactive table of contents with smooth scroll navigation',
    '5 editorial categories with color-coded organization',
    'Tag-based filtering system for article discovery',
    'Author profiles with avatars and biographical information',
    'PDF download functionality for offline reading',
    'Read time estimates for planning study sessions',
    'Responsive grid layout (1/2/3 columns by device)',
    'Framer Motion staggered card animations',
    'Smooth page transitions and hover elevations',
    'Active section highlighting in TOC during scroll',
    'Mobile-optimized typography for all devices',
    'Premium fonts: Poppins, Inter, JetBrains Mono',
    'Glass-morphism navigation with modern aesthetics',
    'Markdown rendering with code blocks and rich formatting',
    '7 seed articles covering agents, prompting, ethics',
    'Category filtering (Editorial, Research, Applied, Perspectives, Community)',
    'RESTful API with Express.js backend',
    'Type-safe validation with Zod schemas'
  ],
  'https://agentilab-ai-review.app'
);
