# AgentiLab Brand Theme Guide

> **Design System Documentation** - Official theme guide for building applications with the AgentiLab visual identity

---

## 🎨 Brand Overview

AgentiLab represents cutting-edge AI development with a **tech-forward, professional aesthetic**. The brand combines:
- **Vibrant blue primary** (#3B82F6) - Trust, innovation, intelligence
- **Energetic teal accent** (#14B8A6) - Creativity, progress, AI energy
- **Dark-first design** - Premium feel, reduced eye strain, modern tech aesthetic
- **Bold typography** - Confidence and clarity in communication
- **Generous whitespace** - Premium positioning, focus on content

---

## 🎯 Core Brand Principles

1. **Tech-Forward Aesthetic:** Modern, cutting-edge visual design that reflects AI innovation
2. **Professional Yet Approachable:** Serious expertise with friendly user experience
3. **Content-First:** Design amplifies the message, never overshadows it
4. **Consistent Visual Language:** Unified experience across all platforms

---

## 🌈 Color System

### Primary Colors

```css
/* Primary Blue - Main brand color */
--primary: 217 91% 60%;           /* #3B82F6 - Vibrant Blue */
--primary-foreground: 210 20% 98%; /* Text on primary */
--primary-border: (computed -8%)   /* Darker border for depth */

/* Accent Teal - Energy & Innovation */
--chart-2: 174 69% 35%;            /* #14B8A6 - Teal (darker) */
/* Use teal for: tech badges, active states, accent elements */
```

### Dark Mode Palette (Primary Theme)

```css
/* Backgrounds */
--background: 210 6% 10%;          /* Rich dark slate base */
--card: 222 16% 16%;               /* Elevated surfaces */
--sidebar: 210 6% 14%;             /* Navigation areas */
--popover: 215 12% 18%;            /* Floating elements */
--muted: 215 12% 20%;              /* Subtle backgrounds */

/* Foregrounds */
--foreground: 217 16% 88%;         /* Primary text */
--muted-foreground: 217 12% 55%;   /* Secondary text */
--card-foreground: 217 16% 88%;    /* Text on cards */

/* Borders */
--border: 215 14% 28%;             /* Standard borders */
--card-border: 215 14% 24%;        /* Card borders */
```

### Light Mode Palette (Secondary Theme)

```css
/* Backgrounds */
--background: 210 6% 98%;          /* Clean white-gray */
--card: 210 6% 96%;                /* Subtle elevation */
--sidebar: 210 6% 94%;             /* Navigation areas */

/* Foregrounds */
--foreground: 217 16% 12%;         /* Dark text */
--muted-foreground: 217 12% 35%;   /* Secondary text */

/* Borders */
--border: 215 14% 88%;             /* Light borders */
```

### Semantic Colors

```css
/* Success */
--chart-3: 142 76% 36%;            /* #10B981 - Green */

/* Warning */
--chart-4: 38 92% 40%;             /* #F59E0B - Amber */

/* Danger/Destructive */
--destructive: 0 84% 48%;          /* #DC2626 - Red */

/* Additional Charts/Data Viz */
--chart-1: 217 91% 35%;            /* Dark Blue */
--chart-5: 262 83% 45%;            /* Purple */
```

### Color Usage Guidelines

**Primary Blue (#3B82F6):**
- Call-to-action buttons
- Active navigation states
- Links and interactive elements
- Loading states and progress indicators
- Primary brand touchpoints

**Accent Teal (#14B8A6):**
- Tech stack badges
- Feature highlights
- Success indicators
- Secondary CTAs
- AI/tech-specific elements

**Dark Backgrounds:**
- Use `--background` for main app background
- Use `--card` for elevated content (cards, sections)
- Use `--sidebar` for navigation areas
- Maintain hierarchy through subtle background shifts

**Text Hierarchy:**
- `--foreground` for primary content (headings, body text)
- `--muted-foreground` for secondary info (captions, metadata)
- Always ensure WCAG AA contrast ratios (4.5:1 minimum)

---

## 📝 Typography System

### Font Families

```css
/* Display - Headings & Impact Text */
--font-display: 'Space Grotesk', sans-serif;
/* Bold, geometric, tech-forward. Use for: H1-H3, hero text, brand statements */

/* Sans - Body & Interface */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
/* Exceptional readability. Use for: body text, UI labels, descriptions */

/* Mono - Code & Technical */
--font-mono: 'JetBrains Mono', Menlo, monospace;
/* Developer-focused. Use for: code blocks, tech badges, API references */
```

### Type Scale (Mobile → Desktop)

```css
/* Hero Display */
text-6xl md:text-7xl lg:text-8xl    /* 60px → 72px → 96px */
font-bold font-display

/* Page Headings (H1) */
text-4xl md:text-5xl                /* 36px → 48px */
font-bold font-display

/* Section Headings (H2) */
text-3xl md:text-4xl                /* 30px → 36px */
font-bold font-display

/* Subsections (H3) */
text-2xl md:text-3xl                /* 24px → 30px */
font-semibold font-display

/* Large Body/Intro */
text-lg md:text-xl                  /* 18px → 20px */
font-sans leading-relaxed

/* Regular Body */
text-base                           /* 16px */
font-sans leading-7

/* Small/Caption */
text-sm                             /* 14px */
font-sans text-muted-foreground

/* Tech Badges */
text-sm                             /* 14px */
font-mono
```

### Typography Best Practices

1. **Hierarchy is Essential:** Use size, weight, and color to establish clear content hierarchy
2. **Line Height:** 
   - Headings: `leading-tight` (1.25)
   - Body: `leading-7` (1.75)
   - Compact UI: `leading-snug` (1.375)
3. **Font Weights:**
   - Display/Headings: `font-bold` (700)
   - Subheadings: `font-semibold` (600)
   - Body: `font-normal` (400)
4. **Max Width for Readability:** 
   - Body text: `max-w-3xl` (48rem)
   - Hero text: `max-w-5xl` (64rem)

---

## 📐 Layout & Spacing

### Container System

```css
/* Page Containers */
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8    /* Standard page width */
max-w-5xl mx-auto px-4 sm:px-6 lg:px-8    /* Narrow content (blog) */

/* Section Padding */
py-16 md:py-24 lg:py-32                    /* Vertical section spacing */
```

### Spacing Scale (Tailwind)

```
4  → 1rem (16px)    - Tight element spacing
6  → 1.5rem (24px)  - Standard component padding
8  → 2rem (32px)    - Comfortable content spacing
12 → 3rem (48px)    - Section separation
16 → 4rem (64px)    - Major section spacing
20 → 5rem (80px)    - Large section gaps
24 → 6rem (96px)    - Hero section padding
32 → 8rem (128px)   - Maximum section spacing
```

### Grid Patterns

```css
/* Project Cards Grid */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

/* Two-Column Sections */
grid md:grid-cols-2 gap-12

/* Feature Lists */
grid sm:grid-cols-2 lg:grid-cols-3 gap-8
```

### Border Radius

```css
--radius: 0.75rem;                  /* 12px - Standard corner radius */

/* Component-Specific */
rounded-lg        /* 8px - Buttons, small cards */
rounded-xl        /* 12px - Project cards, modals */
rounded-2xl       /* 16px - Hero sections, large cards */
rounded-full      /* 9999px - Pills, badges, avatars */
```

---

## 🧩 Component Patterns

### Buttons

```jsx
/* Primary CTA */
<Button 
  variant="default" 
  className="bg-primary hover-elevate active-elevate-2"
>
  Get Started
</Button>

/* Secondary/Ghost */
<Button 
  variant="ghost" 
  className="hover-elevate"
>
  Learn More
</Button>

/* Outline */
<Button 
  variant="outline"
  className="hover-elevate"
>
  View Projects
</Button>
```

**Button Sizing:**
- Default: `min-h-9` - Standard buttons
- Small: `min-h-8` - Compact interfaces
- Large: `min-h-10` - Hero CTAs
- Icon: `h-9 w-9` - Icon-only buttons

### Cards

```jsx
/* Project Card */
<Card className="overflow-hidden hover-elevate">
  <img src={image} className="aspect-video object-cover" />
  <CardHeader>
    <CardTitle className="font-display">{title}</CardTitle>
    <CardDescription className="line-clamp-2">
      {description}
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex flex-wrap gap-2">
      {tech.map(item => (
        <Badge variant="secondary" className="font-mono text-xs">
          {item}
        </Badge>
      ))}
    </div>
  </CardContent>
</Card>
```

### Navigation

```jsx
/* Desktop Header */
<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
  <nav className="container flex h-16 items-center justify-between">
    <Link href="/" className="font-display text-xl font-bold">
      AgentiLab.ai
    </Link>
    <div className="flex gap-6">
      <Link className="text-muted-foreground hover:text-foreground transition">
        Projects
      </Link>
      {/* ... */}
    </div>
  </nav>
</header>
```

### Tech Badges

```jsx
/* Standard Tech Badge */
<Badge 
  variant="secondary" 
  className="font-mono text-xs bg-muted text-chart-2"
>
  React 18
</Badge>

/* With Icon */
<Badge variant="secondary" className="flex items-center gap-1">
  <SiReact className="h-3 w-3" />
  React 18
</Badge>
```

### Hero Sections

```jsx
/* Homepage Hero */
<section className="relative min-h-[85vh] flex items-center">
  <img 
    src="/hero-bg.jpg" 
    className="absolute inset-0 object-cover opacity-40" 
  />
  <div className="relative container z-10">
    <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
      AI Development<br />Excellence
    </h1>
    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
      Building intelligent applications that transform businesses
    </p>
    <div className="flex gap-4">
      <Button size="lg">View Projects</Button>
      <Button size="lg" variant="outline">Contact Us</Button>
    </div>
  </div>
</section>
```

---

## 🎭 Visual Effects

### Elevation System

```css
/* Hover Elevation (built-in utility) */
.hover-elevate {
  /* Automatically brightens background on hover */
  /* Works with any background color */
}

/* Active Press State (built-in utility) */
.active-elevate-2 {
  /* Stronger elevation on press */
  /* Provides tactile feedback */
}

/* Usage Example */
<Card className="hover-elevate active-elevate-2">
  {/* Content */}
</Card>
```

### Shadows (Subtle Use Only)

```css
/* Component Shadows */
--shadow-sm: /* Subtle cards */
--shadow-md: /* Elevated modals */
--shadow-lg: /* Floating elements */

/* Only use shadows for:
   - Floating elements (modals, dropdowns)
   - Elements with same background as parent
   - Creating depth hierarchy */
```

### Gradients

```jsx
/* Hero Background Gradient */
<div className="bg-gradient-to-br from-background via-background to-primary/10" />

/* Border Gradient Accent */
<div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

/* Text Gradient (sparingly) */
<h1 className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
  AI Powered
</h1>
```

### Animations (Minimal & Purposeful)

```jsx
/* Framer Motion - Page Entry */
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>

/* Hover Transitions */
transition-all duration-300 hover:scale-105

/* Loading States */
<div className="animate-pulse bg-muted h-24 rounded-xl" />
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large screens */
```

### Mobile-First Patterns

```jsx
/* Stack on mobile, side-by-side on desktop */
<div className="flex flex-col md:flex-row gap-8">

/* Single column mobile, grid on desktop */
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

/* Hide on mobile, show on desktop */
<div className="hidden md:block">

/* Mobile menu toggle */
<Sheet>
  <SheetTrigger className="md:hidden">
    <Menu />
  </SheetTrigger>
</Sheet>
```

---

## 🖼️ Image Guidelines

### Image Treatment

```jsx
/* Project Thumbnails */
<img 
  src={project.image} 
  alt={project.title}
  className="aspect-video object-cover rounded-xl"
/>

/* Hero Images with Gradient Overlay */
<div className="relative">
  <img src="/hero.jpg" className="absolute inset-0 object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
  <div className="relative z-10">{/* Content */}</div>
</div>

/* Team/Avatar Images */
<Avatar className="h-24 w-24">
  <AvatarImage src={member.photo} />
  <AvatarFallback className="font-display text-2xl">
    {initials}
  </AvatarFallback>
</Avatar>
```

### Image Specifications

- **Project Thumbnails:** 1200x675px (16:9), WebP format
- **Hero Backgrounds:** 1920x1080px, optimized JPEG/WebP
- **Team Photos:** 512x512px, circular crop
- **Logos/Icons:** SVG preferred, fallback PNG @2x
- **File Size:** < 200KB for thumbnails, < 500KB for heroes

---

## 📋 Content Patterns

### Project Showcase

```markdown
Title: [Project Name]
Tagline: [One-line description]
Tech Stack: React, TypeScript, AI Model, etc.
Overview: [2-3 paragraphs about the project]
Key Features: [Bullet list of 5-8 features]
Live URL: https://project.app
```

### Blog Posts

```markdown
Title: Compelling, SEO-friendly title
Excerpt: 2-3 sentences summarizing the post
Author: AgentiLab Team
Tags: AI Development, Tech, Tutorial
Read Time: Calculated from word count
Content: Markdown with proper hierarchy (H2, H3)
```

---

## ✅ Design Checklist

When building a new AgentiLab application:

**Visual Foundation**
- [ ] Import AgentiLab color variables from this guide
- [ ] Include Space Grotesk, Inter, JetBrains Mono fonts
- [ ] Set dark mode as default theme
- [ ] Configure light mode with proper contrast

**Components**
- [ ] Use shadcn/ui components for consistency
- [ ] Apply `hover-elevate` and `active-elevate-2` utilities
- [ ] Implement responsive navigation (mobile sheet menu)
- [ ] Add proper loading/skeleton states

**Content**
- [ ] Establish clear typographic hierarchy
- [ ] Use primary blue for CTAs, teal for accents
- [ ] Apply proper spacing scale (4, 6, 8, 12, 16, 24)
- [ ] Ensure WCAG AA contrast ratios

**Polish**
- [ ] Add subtle Framer Motion page transitions
- [ ] Implement hover states on interactive elements
- [ ] Include proper focus states for accessibility
- [ ] Optimize images (WebP, proper sizing)
- [ ] Test responsiveness on mobile, tablet, desktop

---

## 🚀 Quick Start Code

### index.css Setup

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 210 6% 98%;
    --foreground: 217 16% 12%;
    --primary: 217 91% 60%;
    --chart-2: 174 69% 35%; /* Teal accent */
    /* ... copy all variables from theme.md */
  }
  
  .dark {
    --background: 210 6% 10%;
    --foreground: 217 16% 88%;
    /* ... dark mode variables */
  }
}
```

### Tailwind Config

```js
export default {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... map all variables
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
    },
  },
}
```

### Sample Hero Component

```jsx
export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <img 
        src="/assets/hero-ai-network.jpg" 
        alt="AI Network"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      
      <div className="relative z-10 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            AI Development
            <br />
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
            Building intelligent applications that transform businesses
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="hover-elevate active-elevate-2">
              View Projects
            </Button>
            <Button size="lg" variant="outline" className="hover-elevate">
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 📚 Resources

**Design References:**
- Linear.app - Clean, bold typography
- Vercel.com - Minimalist, tech-forward
- Stripe.com - Professional, accessible

**Tools:**
- Figma - Design mockups
- Coolors.co - Color palette visualization
- Type Scale - Typography calculator
- shadcn/ui - Component library

**Fonts:**
- Google Fonts: Space Grotesk, Inter
- JetBrains: JetBrains Mono

---

*Last Updated: October 2025*
*Version: 1.0.0*
*Maintained by: AgentiLab Team*
