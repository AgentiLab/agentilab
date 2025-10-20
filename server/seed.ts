import { db } from "./db";
import { projects, blogPosts } from "@shared/schema";
import type { InsertBlogPost } from "@shared/schema";

const seedProjects = [
  {
    slug: "securechat",
    title: "SecureChat",
    description: "An encrypted AI-powered messaging app with private channels and real-time emoji reactions.",
    tech: ["React", "PostgreSQL", "GPT-5"],
    image: "/assets/generated_images/SecureChat_messaging_interface_screenshot_e4c46faf.png",
    overview: "SecureChat is a next-generation encrypted messaging platform that combines end-to-end encryption with AI-powered features. Built with privacy at its core, it enables secure communication for teams and individuals while leveraging GPT-5 for intelligent message assistance and smart replies.",
    features: [
      "End-to-end encryption for all messages",
      "AI-powered smart replies and message composition",
      "Private channels with granular permissions",
      "Real-time emoji reactions and threading",
      "Cross-platform synchronization",
      "Voice and video calling with encryption"
    ],
    liveUrl: "https://securechat.demo"
  },
  {
    slug: "vibelab",
    title: "VibeLab",
    description: "A creative AI playground that generates React apps and visual dashboards in real time.",
    tech: ["Vite", "Anthropic Claude", "Framer Motion"],
    image: "/assets/generated_images/VibeLab_creative_playground_interface_6c078e97.png",
    overview: "VibeLab transforms ideas into functional React applications through natural language. Using Anthropic's Claude AI, it generates production-ready components, dashboards, and entire applications in seconds, making development accessible to creators of all skill levels.",
    features: [
      "Natural language to React component generation",
      "Real-time visual dashboard creation",
      "Framer Motion animation presets",
      "Live code preview and editing",
      "Export to production-ready code",
      "Template library with best practices"
    ],
    liveUrl: "https://vibelab.demo"
  },
  {
    slug: "passvault",
    title: "PassVault",
    description: "A password manager powered by local encryption and smart suggestions.",
    tech: ["Electron", "TypeScript", "AES Encryption"],
    image: "/assets/generated_images/PassVault_password_manager_interface_1f781cfd.png",
    overview: "PassVault is a desktop password manager that keeps your credentials secure with military-grade AES encryption. All data is stored locally, ensuring you maintain complete control over your sensitive information while enjoying smart features like password generation and breach monitoring.",
    features: [
      "AES-256 encryption for all stored data",
      "Smart password generator with entropy analysis",
      "Breach monitoring and alerts",
      "Auto-fill for desktop applications",
      "Secure sharing with encrypted links",
      "Biometric authentication support"
    ]
  }
];

const seedBlogPosts: InsertBlogPost[] = [
  {
    slug: "future-of-ai-agents",
    title: "The Future of AI Agents: Beyond Chatbots",
    excerpt: "Exploring how AI agents are evolving from simple conversational interfaces to sophisticated autonomous systems that can reason, plan, and execute complex tasks.",
    content: "AI agents have come a long way from their humble beginnings as rule-based chatbots. Today's AI agents are sophisticated systems capable of understanding context, making decisions, and even collaborating with humans on complex tasks.\n\nThe Evolution of AI Agents\n\nThe journey from simple chatbots to today's advanced AI agents represents a fundamental shift in how we think about artificial intelligence. Early chatbots were limited to predefined responses and simple pattern matching. Modern AI agents, powered by large language models and advanced reasoning capabilities, can understand nuanced context and intent, plan multi-step solutions to complex problems, learn from interactions and improve over time, and integrate with external tools and APIs.\n\nKey Capabilities of Modern AI Agents\n\nReasoning and Planning: Today's AI agents can break down complex tasks into manageable steps, reason about different approaches, and adapt their strategies based on outcomes.\n\nTool Integration: Modern agents can seamlessly integrate with external tools, APIs, and databases, extending their capabilities far beyond text generation.\n\nMemory and Context: Advanced memory systems allow agents to maintain context across conversations and even learn user preferences over time.\n\nThe Road Ahead\n\nThe future of AI agents lies in their ability to become true collaborators. We're moving towards a world where AI agents will work alongside humans as intelligent assistants, handle increasingly complex autonomous tasks, collaborate with other AI agents to solve multi-faceted problems, and adapt to individual user needs and preferences.\n\nAt AgentiLab.ai, we're at the forefront of this transformation, building AI agents that push the boundaries of what's possible.",
    author: "AgentiLab Team",
    publishedAt: new Date("2025-01-15"),
    coverImage: "/api/placeholder/1200/600",
    tags: ["AI Agents", "Machine Learning", "Future Tech"],
    readTimeMinutes: 8,
  },
  {
    slug: "building-secure-ai-applications",
    title: "Building Secure AI Applications: Best Practices",
    excerpt: "A comprehensive guide to security considerations when developing AI-powered applications, from data protection to model safety.",
    content: "Security is paramount when building AI applications. As AI systems become more powerful and integrated into critical workflows, ensuring their security becomes increasingly important.\n\nCore Security Principles\n\nData Protection: The foundation of any secure AI application is robust data protection. This includes encryption at rest and in transit using industry-standard algorithms, access control with fine-grained limits, and data anonymization to remove or obfuscate personally identifiable information where possible.\n\nModel Security: AI models themselves can be vulnerable to various attacks including prompt injection (malicious users attempting to manipulate AI behavior through crafted inputs), model extraction (adversaries trying to steal model weights or replicate functionality), and data poisoning (attempts to corrupt training data to influence model behavior).\n\nBest Practices for Secure AI Development\n\n1. Input Validation and Sanitization: Always validate and sanitize user inputs before processing them through AI models. This prevents prompt injection and other input-based attacks.\n\n2. Rate Limiting and Monitoring: Implement rate limiting to prevent abuse and continuously monitor AI interactions for suspicious patterns.\n\n3. Secure API Design: When exposing AI capabilities via APIs, use authentication and authorization, implement proper error handling, and log all interactions for audit purposes.\n\n4. Regular Security Audits: Conduct regular security audits of your AI systems, including penetration testing, code reviews, and dependency scanning.\n\nThe Human Element\n\nRemember that security isn't just about technology—it's also about people. Train your team on secure coding practices, threat awareness, and incident response procedures.\n\nAt AgentiLab.ai, security is embedded in every aspect of our development process, from initial design to deployment.",
    author: "Security Team",
    publishedAt: new Date("2025-01-10"),
    coverImage: "/api/placeholder/1200/600",
    tags: ["Security", "AI Development", "Best Practices"],
    readTimeMinutes: 12,
  },
  {
    slug: "enhancing-user-experience-with-ai",
    title: "Enhancing User Experience with AI: Practical Strategies",
    excerpt: "Discover practical strategies for using AI to create more intuitive, personalized, and engaging user experiences in your applications.",
    content: "AI has the power to transform user experiences from good to exceptional. Here's how to harness that power effectively.\n\nUnderstanding AI-Enhanced UX\n\nAI-enhanced UX goes beyond simple automation. It's about creating experiences that feel natural, personalized, and genuinely helpful.\n\nKey Principles: Predictive Assistance (anticipate user needs before they're explicitly stated), Personalization (adapt interfaces and content to individual preferences), Natural Interactions (enable conversations and interactions that feel human), and Intelligent Automation (automate repetitive tasks while keeping users in control).\n\nPractical Implementation Strategies\n\nSmart Defaults: Use AI to suggest intelligent defaults based on user history and preferences, similar user behaviors, and contextual information.\n\nProgressive Disclosure: AI can help determine what information to show immediately, what to hide behind progressive disclosure, and when to surface advanced features.\n\nContextual Help: Provide AI-powered assistance that understands user context, offers relevant suggestions, and learns from user interactions.\n\nMeasuring Success\n\nTrack these key metrics: task completion rates, time to completion, user satisfaction scores, and feature adoption rates.\n\nCommon Pitfalls to Avoid: Over-automation (don't remove user agency), lack of transparency (always explain AI decisions), ignoring edge cases (AI should gracefully handle unexpected inputs), and privacy concerns (be transparent about data usage).\n\nThe Future of AI-Enhanced UX\n\nWe're moving towards experiences where AI seamlessly blends into the background, enhancing user capabilities without drawing attention to itself. The best AI UX is often invisible.\n\nAt AgentiLab.ai, we specialize in creating AI-powered experiences that feel natural and empowering.",
    author: "UX Research Team",
    publishedAt: new Date("2025-01-05"),
    coverImage: "/api/placeholder/1200/600",
    tags: ["User Experience", "AI", "Design"],
    readTimeMinutes: 10,
  },
];

async function seed() {
  console.log("Starting seed...");
  
  for (const project of seedProjects) {
    try {
      await db.insert(projects).values(project);
      console.log(`✓ Seeded project: ${project.title}`);
    } catch (error) {
      console.error(`✗ Error seeding project ${project.title}:`, error);
    }
  }
  
  for (const post of seedBlogPosts) {
    try {
      await db.insert(blogPosts).values(post);
      console.log(`✓ Seeded blog post: ${post.title}`);
    } catch (error) {
      console.error(`✗ Error seeding blog post ${post.title}:`, error);
    }
  }
  
  console.log("Seed complete!");
  process.exit(0);
}

seed();
