-- Add blog post: LLM API Parameters Complete Guide
-- Author: AgentiLab Team
-- Read time: 22 minutes
-- Date: October 15, 2025

INSERT INTO blog_posts (slug, title, excerpt, content, author, published_at, cover_image, read_time_minutes, tags)
VALUES (
  'llm-api-parameters-complete-guide',
  'LLM API Parameters: Complete Guide to Temperature, Top-p, and More',
  'Deep dive into Large Language Model API parameters and how they affect output quality. Understand temperature, top_p, frequency_penalty, presence_penalty, max_tokens, and stop sequences. Learn optimal settings for different use cases with real production examples from AgentiLab applications.',
  '# LLM API Parameters: Complete Guide to Temperature, Top-p, and More

## Introduction

Every AI application''s quality depends on understanding and properly configuring LLM API parameters. At AgentiLab, we''ve made millions of API calls across 13 production applications using Claude, GPT-4, and other models. This guide shares our deep understanding of each parameter and how to use them effectively.

## Core API Parameters

### 1. Temperature (0.0 - 2.0)

**What it does:** Controls randomness and creativity in responses.

**Value ranges:**
```typescript
temperature: 0.0      // Deterministic
temperature: 0.1-0.3  // Highly focused
temperature: 0.4-0.7  // Balanced
temperature: 0.8-1.0  // Creative
temperature: 1.5-2.0  // Highly random
```

**Production examples:**

**CPAai (Accounting) - Temperature 0.1:**
```typescript
const response = await anthropic.messages.create({
  model: "claude-sonnet-4.5",
  temperature: 0.1,  // Consistency for accounting
  messages: [{
    role: "user",
    content: "Extract vendor, date, amount from receipt"
  }]
});
```

**BookGen (Creative Writing) - Temperature 0.9:**
```typescript
const response = await openai.chat.completions.create({
  model: "gpt-4",
  temperature: 0.9,  // High creativity
  messages: [{
    role: "user",
    content: "Write Chapter 3 of fantasy novel"
  }]
});
```

### 2. Top-p (0.0 - 1.0)

**What it does:** Controls diversity via nucleus sampling.

**Best Practice:**
```typescript
// ✅ Use ONE randomness control
{ temperature: 0.7 }  // OR
{ top_p: 0.9 }

// ❌ Don''t use both
{ temperature: 0.7, top_p: 0.9 }
```

### 3. Max Tokens

**Production examples:**

**AgentiLabook - Max 2000:**
```typescript
max_tokens: 2000  // Code cells
```

**ChatBuilder - Max 500:**
```typescript
max_tokens: 500  // Concise responses
```

**Ultra Web Crawler - Max 300:**
```typescript
max_tokens: 300  // Short summaries
```

### 4. Frequency Penalty (-2.0 to 2.0)

**ProfileAI - Penalty 0.6:**
```typescript
frequency_penalty: 0.6  // Avoid repetitive language
```

**Use cases:**
- Blog posts: 0.6-0.8
- Product descriptions: 0.5-0.7
- Technical docs: 0.0-0.3
- Creative writing: 0.7-1.0

### 5. Presence Penalty (-2.0 to 2.0)

**Image Playground - Penalty 0.9:**
```typescript
presence_penalty: 0.9  // Diverse concepts
```

**Comparison:**
- Frequency: "Don''t repeat word 5 times"
- Presence: "Don''t mention topic again"

### 6. Stop Sequences

**CPAai - JSON extraction:**
```typescript
stop_sequences: ["}"]
```

**AgentiLaw.ai - Section delimiter:**
```typescript
stop_sequences: ["---END---"]
```

## Parameter Combinations

### Data Extraction
```typescript
{
  temperature: 0.1,
  max_tokens: 1000
}
```

### Creative Content
```typescript
{
  temperature: 0.9,
  max_tokens: 4000,
  frequency_penalty: 0.7,
  presence_penalty: 0.8
}
```

### Code Generation
```typescript
{
  temperature: 0.3,
  max_tokens: 2000,
  stop_sequences: ["```"]
}
```

### Conversational AI
```typescript
{
  temperature: 0.7,
  max_tokens: 500,
  frequency_penalty: 0.3,
  presence_penalty: 0.3
}
```

## Conclusion

Understanding LLM parameters is crucial for production AI. Test configurations for your specific use case and monitor token usage for cost optimization.',
  'AgentiLab Team',
  CURRENT_TIMESTAMP,
  'https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/llm-parameters-blog-cover.png',
  22,
  ARRAY['AI', 'LLM', 'API Parameters', 'Temperature', 'GPT-4', 'Claude', 'Token Optimization', 'Production AI', 'Cost Optimization', 'AI Configuration']
);
