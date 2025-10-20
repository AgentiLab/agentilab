-- Add AgentiLabook - AI-Powered Jupyter Studio project
-- URL: https://agentilabook.app
-- Date: October 15, 2025

INSERT INTO projects (slug, title, description, tech, image, overview, features, live_url)
VALUES (
  'agentilabook',
  'AgentiLabook - AI-Powered Jupyter Studio',
  'Cloud-native platform for creating, executing, and generating Jupyter notebooks with AI assistance. Code, Explain, Generate - Anywhere. Built with React, TypeScript, powered by Claude 3.5 Sonnet for AI generation, Python 3.11 execution, real-time WebSocket streaming, and PostgreSQL persistence.',
  ARRAY['React 18', 'TypeScript', 'Claude 3.5 Sonnet', 'Python 3.11', 'PostgreSQL', 'Tailwind CSS', 'CodeMirror 6', 'WebSocket', 'Drizzle ORM', 'shadcn/ui', 'Jupyter Format'],
  'https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/agentilabook-image.png',
  '# AgentiLabook - AI-Powered Jupyter Studio

## Overview

AgentiLabook is a revolutionary cloud-native platform that brings the power of Jupyter notebooks to any device with AI-enhanced capabilities. Write Python code, execute it in real-time, generate entire notebooks from natural language prompts, and share your work instantly - all powered by Claude 3.5 Sonnet and modern web technologies.

**Slogan:** "Code, Explain, Generate - Anywhere"

## Core Capabilities

The platform enables users to:
- **Create & Edit Notebooks** with intuitive web-based interface
- **Execute Python Code** with real-time output streaming
- **AI-Powered Generation** of complete notebooks or individual cells
- **Code Explanation** with AI-generated educational markdown
- **Visualization Support** for matplotlib and plotly charts
- **Export & Share** notebooks in Jupyter format or as HTML

## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe notebook applications
- **CodeMirror 6** for advanced code editing with Python and Markdown syntax highlighting
- **Tailwind CSS** with AgentiLab branding (Blue #3B82F6, Teal #14B8A6)
- **shadcn/ui** components for modern, accessible UI
- **TanStack Query v5** for server state management
- **Wouter** for lightweight client-side routing
- **WebSocket Client** for real-time execution streaming

### Backend Architecture
- **Node.js** with Express for robust API
- **Python 3.11** runtime for code execution
- **PostgreSQL (Neon)** with Drizzle ORM for persistent storage
- **Claude 3.5 Sonnet** via Anthropic API for AI capabilities
- **WebSocket Server** for real-time output streaming
- **sanitize-html** for secure HTML export

## Notebook Management System

### Complete CRUD Operations

**Create Notebooks**
- Generate from AI prompts
- Start with empty template
- Auto-generated UUID and timestamps
- Default title with edit capability

**Edit & Auto-Save**
- 10-second auto-save interval
- Real-time title editing
- Cell-level modifications
- Optimistic UI updates

**List & Browse**
- All notebooks ordered by last modified
- Metadata display (created/updated dates)
- Empty state with helpful prompts
- Search and filter (future)

**Delete Operations**
- Confirmation dialogs
- Cascade delete with cells
- Instant UI feedback

## Cell Operations

### Code Cells

Advanced Python editing experience:
- **CodeMirror 6 Integration** - Professional code editor
- **Python Syntax Highlighting** - Clear code visualization
- **Execution Counter** - Track execution order
- **Real-Time Output** - Streaming execution results
- **Error Handling** - Stack traces with line numbers
- **Visual Output** - Charts, images, tables

### Markdown Cells

Rich text documentation:
- **Markdown Editing** - Full markdown syntax support
- **Live Preview** - Real-time rendering
- **Code Blocks** - Syntax highlighted code snippets
- **Tables & Lists** - Structured documentation
- **LaTeX Support** - Mathematical equations (future)

### Cell Management

Intuitive organization:
- **Add/Delete Cells** - Insert code or markdown cells
- **Reorder Cells** - Up/down arrow buttons for rearrangement
- **Drag-and-Drop** - Visual reordering (UI ready)
- **Cell Metadata** - Extensible metadata system

## AI-Powered Features

### Complete Notebook Generation

Claude 3.5 Sonnet creates entire notebooks:

**Input:** Natural language prompt
```
"Create a data analysis notebook for exploring iris dataset 
with visualizations and statistical analysis"
```

**Output:** Complete notebook with:
- Introduction markdown cell
- Import statements code cell
- Data loading code cell
- Exploratory analysis cells
- Visualization cells with matplotlib/plotly
- Conclusion markdown cell

### Individual Cell Generation

Context-aware cell creation:
- Analyzes existing notebook context
- Generates relevant code or markdown
- Maintains consistent narrative flow
- Suggests next logical steps

### Code Explanation

AI-generated educational content:
- Explains code functionality line-by-line
- Adds mathematical context
- Provides usage examples
- Links to documentation (future)

### Floating AI Chat Panel

Interactive AI assistance:
- Always-accessible chat interface
- Contextual help and suggestions
- Code debugging assistance
- Best practices recommendations

## Python Code Execution

### Execution Environment

**Python 3.11 Runtime**
- Pre-installed scientific libraries:
  - matplotlib (static charts)
  - numpy (numerical computing)
  - pandas (data analysis)
  - plotly (interactive visualizations)

**Execution Features:**
- **30-second timeout** for safety
- **1MB output buffer limit** to prevent memory issues
- **Process isolation** with spawn
- **Input validation** for dangerous patterns

### Output Types

Comprehensive output handling:

**stdout/stderr Streams**
```python
print("Hello, World!")  # Text output
print(f"Result: {42}")  # Formatted output
```

**Execution Results**
```python
2 + 2  # Returns: 4
df.head()  # Returns: DataFrame HTML
```

**Display Data**
```python
from IPython.display import Image, HTML
display(Image(url="..."))
display(HTML("<h1>Title</h1>"))
```

**Matplotlib Charts**
```python
import matplotlib.pyplot as plt
plt.plot([1, 2, 3, 4])
plt.ylabel("some numbers")
plt.show()  # Captured as PNG image
```

**Plotly Interactive Charts**
```python
import plotly.express as px
fig = px.scatter(df, x="x", y="y")
fig.show()  # Rendered as interactive HTML
```

**Error Handling**
- Full stack traces with line numbers
- Error type identification
- Helpful error messages
- Debugging suggestions

### Security Considerations

**⚠️ Development Environment Only**
- Unsandboxed Python execution
- Remote Code Execution vulnerability
- **NOT production-ready** without containerization

**Security Measures:**
- Process isolation (basic)
- Resource limits (time, memory, output)
- Input validation for known dangerous patterns
- **Production requirement**: Docker/E2E/Modal containerization

## Export & Sharing System

### Jupyter Format Export (.ipynb)

Standard Jupyter notebook format:
- Full compatibility with Jupyter, JupyterLab, Google Colab
- Preserves all cell types and outputs
- Execution count maintained
- Metadata included
- Import into VS Code, PyCharm

### HTML Sharing

Permanent shareable URLs:

**Sharing Workflow:**
1. Click "Share" button
2. Notebook auto-saved with latest changes
3. Unique share ID generated
4. Permanent URL created: `/shared/:shareId`
5. Copy-to-clipboard functionality

**HTML Export Features:**
- **Modern Responsive Design** - Works on all devices
- **Gradient Header** with animations
- **Professional Typography** - Inter + JetBrains Mono fonts
- **Syntax Highlighting** - Code blocks beautifully rendered
- **Responsive Outputs** - Charts and tables adapt to screen size
- **AgentiLab Branding** - Footer with attribution

**Security:**
- **sanitize-html Library** - Battle-tested XSS prevention
- **Safe Allowlist** - Only allows safe HTML elements
- **Script Blocking** - All script tags removed
- **Event Handler Blocking** - No onclick, onerror, etc.
- **Protocol Filtering** - Only safe protocols (http, https, data for images)

### Share Dialog

User-friendly sharing interface:
- Prominent copy button
- URL preview
- Share link styling
- Success feedback
- Social sharing (future)

## Design System

### AgentiLab Branding

Professional notebook interface:

**Color Palette:**
- **Primary Blue (#3B82F6):** Actions, links, highlights
- **Accent Teal (#14B8A6):** Success states, AI features
- **Dark Background (#0B0B0F):** Main notebook surface
- **Code Background:** Elevated code cell surfaces

### Typography
- **UI Text:** Inter for clean readability
- **Code:** JetBrains Mono for monospace precision
- **Markdown:** System fonts for content

### Mobile-First Design

Optimized for all devices:
- **Single-column layout** on mobile (no multi-column markdown)
- **Touch-optimized** interactions for cell manipulation
- **Responsive code editor** adapts to screen size
- **Floating action button** for AI features on mobile
- **Edge-to-edge** layout maximizes screen space
- **Execution count** repositioned for small screens

### Dark/Light Mode

Complete theme support:
- Dark mode by default
- Light mode toggle
- Theme persistence
- Smooth transitions
- Proper contrast ratios

## Real-Time Features

### WebSocket Integration

Live execution streaming:

**Connection Flow:**
1. Client connects to `/ws`
2. Subscribe to execution events
3. Receive streaming output chunks
4. Update UI in real-time
5. Handle completion/errors

**Event Types:**
- `execution:start` - Execution initiated
- `execution:output` - Output chunk received
- `execution:complete` - Execution finished
- `execution:error` - Error occurred

### Auto-Save System

Automatic notebook persistence:
- **10-second interval** - Saves every 10 seconds
- **Debounced saves** - Prevents excessive updates
- **Optimistic updates** - Immediate UI feedback
- **Error recovery** - Retry on failure
- **Visual indicator** - Shows save status

## Data Model

### Notebook Structure

PostgreSQL schema with Drizzle ORM:

```typescript
interface Notebook {
  id: string;              // UUID primary key
  title: string;           // User-editable title
  cells: NotebookCell[];   // Array of cells
  metadata: object;        // Extensible metadata
  createdAt: Date;        // Creation timestamp
  updatedAt: Date;        // Last modified timestamp
}

interface NotebookCell {
  id: string;                    // Cell UUID
  type: "code" | "markdown";     // Cell type
  source: string;                // Cell content
  outputs?: CellOutput[];        // Execution outputs
  execution_count?: number;      // Execution order
  metadata?: object;             // Cell metadata
}
```

## Use Cases & Applications

### Data Science Education
- Interactive Python tutorials
- Statistical analysis demonstrations
- Machine learning walkthroughs
- Visualization workshops

### Research & Analysis
- Exploratory data analysis
- Scientific computing
- Reproducible research
- Collaborative analysis

### Documentation
- Technical documentation with live code
- API usage examples
- Tutorial creation
- Knowledge sharing

### Rapid Prototyping
- Quick Python experiments
- Algorithm testing
- Data processing pipelines
- API integration testing

## Performance & Optimization

### Frontend Optimization

Smooth user experience:
- **Code splitting** for faster initial load
- **Lazy loading** for notebook cells
- **Virtualization** for large notebooks (future)
- **Debounced saves** to reduce API calls
- **Optimistic UI** for instant feedback

### Backend Optimization

Efficient execution:
- **Process pooling** for Python workers (future)
- **Execution queue** for concurrent requests
- **Output streaming** reduces memory usage
- **Database indexing** for fast queries
- **Connection pooling** for PostgreSQL',
  ARRAY[
    'Notebook Management - Create, edit, delete notebooks with auto-save every 10 seconds',
    'Python Code Execution - Python 3.11 runtime with matplotlib, numpy, pandas, plotly support',
    'AI Notebook Generation - Claude 3.5 Sonnet generates complete notebooks from prompts',
    'AI Cell Generation - Context-aware code and markdown cell creation',
    'Code Explanation - AI-generated educational markdown explaining code functionality',
    'CodeMirror 6 Editor - Professional code editing with Python and Markdown syntax highlighting',
    'Real-Time Output - WebSocket streaming for live execution results and stdout',
    'Visualization Support - Matplotlib static charts (PNG) and Plotly interactive charts (HTML)',
    'Markdown Cells - Rich text documentation with live preview and code blocks',
    'Cell Reordering - Up/down arrow buttons for easy cell rearrangement',
    'Jupyter Export - Export to .ipynb format compatible with Jupyter, Colab, VS Code',
    'HTML Sharing - Permanent shareable URLs with secure sanitization and responsive design',
    'Floating AI Chat - Always-accessible AI assistance panel for help and suggestions',
    'Error Handling - Full stack traces with line numbers and debugging suggestions',
    'Dark/Light Mode - Complete theme support with persistence and smooth transitions',
    'Mobile-First Design - Touch-optimized responsive interface for all devices',
    'PostgreSQL Storage - Persistent notebooks with Drizzle ORM and Neon database',
    'Execution Counter - Track cell execution order with numbered outputs',
    'Auto-Save System - 10-second interval saves with optimistic UI updates',
    'Secure Export - XSS-safe HTML sharing with sanitize-html library'
  ],
  'https://agentilabook.app'
);
