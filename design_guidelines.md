# AgentiLab.ai Design Guidelines

## Design Approach
**Reference-Based:** Drawing inspiration from leading tech portfolio sites (Linear, Vercel, Stripe) with emphasis on showcasing innovation through bold typography, generous whitespace, and strategic color usage. This approach emphasizes visual impact while maintaining clarity for technical content.

## Core Design Principles
- **Tech-Forward Aesthetic:** Blend cutting-edge visual design with technical precision
- **Project-Centric:** Every design decision amplifies the showcase of AI projects
- **Bold yet Accessible:** Strong visual statements balanced with intuitive navigation

---

## Color Palette

### Dark Mode (Primary)
- **Background Base:** 15 8% 11% (rich dark slate)
- **Background Elevated:** 222 16% 16% (slightly lighter cards/sections)
- **Primary Brand:** 217 91% 60% (vibrant blue #3B82F6)
- **Accent Tech:** 174 69% 53% (energetic teal #14B8A6)
- **Text Primary:** 210 20% 96% (crisp white-gray)
- **Text Secondary:** 215 16% 70% (muted gray for descriptions)

### Semantic Colors
- **Success/Active:** 142 76% 36% (green for live projects)
- **Warning/Beta:** 38 92% 50% (amber for experimental features)
- **Borders:** 215 28% 25% (subtle dividers)

---

## Typography

### Font Families
- **Primary (Headings):** 'Space Grotesk', sans-serif - Bold, geometric, tech-forward
- **Secondary (Body):** 'Inter', sans-serif - Exceptional readability, professional
- **Mono (Code/Tech):** 'JetBrains Mono', monospace - For tech stack badges

### Type Scale
- **Hero Display:** text-6xl md:text-7xl lg:text-8xl font-bold (60-96px)
- **Section Headings:** text-4xl md:text-5xl font-bold (36-48px)
- **Subsection:** text-2xl md:text-3xl font-semibold (24-30px)
- **Body Large:** text-lg md:text-xl (18-20px) for intros
- **Body Regular:** text-base (16px) for main content
- **Caption/Meta:** text-sm (14px) for tech badges, timestamps

---

## Layout System

### Spacing Units (Tailwind)
**Primary Scale:** 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6, p-8
- Section spacing: py-16 md:py-24 lg:py-32
- Element gaps: gap-4, gap-6, gap-8
- Container max-width: max-w-7xl for main content

### Grid Strategy
- **Project Cards:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- **Feature Sections:** Two-column splits on desktop (md:grid-cols-2)
- **Mobile:** Always single column with generous spacing

---

## Component Library

### Navigation
- **Desktop:** Horizontal navbar, backdrop-blur-xl, sticky top-0
- **Mobile:** Hamburger menu (shadcn Sheet component), slide-in from right
- **Links:** Subtle underline on hover, active state with primary color

### Hero Section (Home)
- **Large background image:** Abstract AI/tech visualization with gradient overlay (from-slate-900/90 to-slate-800/80)
- **Typography Hierarchy:** Massive heading + concise tagline
- **CTA Pattern:** Primary button (bg-blue-600) + ghost button with blur backdrop
- **Height:** min-h-[85vh] for impact, not forced 100vh

### Project Cards
- **Structure:** Image thumbnail + title + 2-line description + tech badges + arrow link
- **Styling:** Rounded-xl, border border-slate-800, hover:border-blue-600 transition
- **Image:** aspect-video object-cover with subtle overlay
- **Tech Badges:** Pill-shaped (px-3 py-1 rounded-full bg-slate-800 text-teal-400 text-sm font-mono)

### Project Detail Page
- **Hero:** Full-width project screenshot with gradient overlay + title + metadata
- **Content Sections:** Overview (prose-lg), Tech Stack (icon grid), Screenshots (3-column gallery)
- **CTA:** "Visit Live Project" button prominent at top and bottom

### About Page
- **Mission Block:** Large centered text (text-2xl max-w-3xl) with gradient underline on key phrases
- **Team Cards:** Image + name + role, circular avatars, 3-column grid
- **Tech Stack:** Icon grid showcasing React, TypeScript, AI tools with labels

### Contact Form
- **Layout:** Two-column on desktop (form left, info/map right), stacked mobile
- **Form Fields:** Shadcn Input/Textarea with focus:ring-2 focus:ring-blue-600
- **Submit Button:** Full-width mobile, auto-width desktop, loading state with spinner
- **Info Section:** Email, response time, office hours with icons

### Footer
- **Structure:** Three columns (About/Links/Contact) on desktop, stacked mobile
- **Content:** Newsletter signup, social links (GitHub, LinkedIn, Twitter), quick nav, copyright
- **Styling:** border-t border-slate-800, pt-12 pb-8, text-slate-400

---

## Visual Enhancements

### Gradients
- **Primary Hero:** linear-gradient(135deg, slate-900 0%, slate-800 50%, blue-950 100%)
- **Card Hovers:** Subtle blue glow (shadow-lg shadow-blue-600/10)
- **Section Dividers:** Gradient lines (h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent)

### Animations (Minimal)
- **Page Transitions:** Fade-in only, duration-300
- **Card Hover:** Scale-105 + border color shift
- **Button Hover:** Brightness increase, no complex transforms
- **Scroll Reveals:** Fade-up on project cards only (once)

---

## Images

### Hero Image (Home)
- **Description:** Abstract digital neural network visualization with blue/teal glowing nodes, dark background, high-tech aesthetic
- **Placement:** Full-width background image with gradient overlay, z-index below content
- **Treatment:** Blur-sm on mobile for performance, sharp on desktop

### Project Thumbnails
- **SecureChat:** Encrypted messaging interface with chat bubbles, dark UI
- **VibeLab:** Creative dashboard with colorful component previews, code snippets
- **PassVault:** Password manager interface showing vault items, security indicators
- **Aspect Ratio:** 16:9 for consistency across all cards

### About Page
- **Team Photos:** Professional headshots, circular crop, 256x256px
- **Background Element:** Subtle geometric pattern or grid, very low opacity

### Project Detail Pages
- **Hero Screenshot:** Full application interface, desktop view, high resolution
- **Gallery Images:** 2-3 additional screenshots showing key features, square or 4:3 ratio

---

## Responsive Breakpoints
- **Mobile:** Default (< 768px) - Single column, full-width CTAs, hamburger nav
- **Tablet:** md: (768px+) - Two columns where appropriate, expanded nav
- **Desktop:** lg: (1024px+) - Three columns for cards, max content width
- **Wide:** xl: (1280px+) - Enhanced spacing, larger typography scale