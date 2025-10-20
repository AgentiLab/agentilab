-- Commande SQL pour ajouter le projet BookGen à la base de données de production

INSERT INTO projects (
  slug,
  title,
  description,
  tech,
  image,
  overview,
  features,
  live_url
) VALUES (
  'book-gen',
  'BookGen - AI Book Generator',
  'AI-powered book generation with Claude Sonnet 4.5. Create complete professional books with table of contents, detailed chapters, and PDF export in real-time streaming.',
  ARRAY[
    'React',
    'TypeScript',
    'Express',
    'Vite',
    'Tailwind CSS',
    'Shadcn UI',
    'Framer Motion',
    'Claude Sonnet 4.5',
    'PDFKit',
    'Server-Sent Events'
  ],
  '/assets/book-generic.jpg',
  'BookGen is an AI-powered book generation application that leverages Claude Sonnet 4.5 to create complete, professional-quality books in real-time. Users can specify a topic, select their preferred language (English, French, Spanish, German, Italian, or Portuguese), and choose the number of chapters (3-12). The application intelligently analyzes the topic and generates a coherent book structure with a title page, table of contents, and detailed chapters with subsections. All content is streamed live, providing an engaging visualization of the AI creation process. The final book can be exported as a professionally formatted PDF with automatic page numbering in the table of contents.',
  ARRAY[
    'Real-time streaming book generation with live content visualization',
    'AI-powered topic analysis and intelligent book structure creation',
    'Multi-language support (English, French, Spanish, German, Italian, Portuguese)',
    'Customizable chapter count (3-12 chapters) with automatic generation',
    'Professional PDF export with automatic table of contents page numbering',
    'Auto-collapse completed sections to focus on current generation',
    'Dark/light mode with AgentiLab premium design system',
    'Responsive design optimized for mobile, tablet, and desktop',
    'Smooth animations and elegant transitions with Framer Motion',
    'Server-Sent Events (SSE) for robust real-time streaming'
  ],
  'https://book-gen.app'
);
