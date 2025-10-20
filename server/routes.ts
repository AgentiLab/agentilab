import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, insertProjectSchema, insertBlogPostSchema, signUpSchema, loginSchema, resetPasswordSchema, updateProfileSchema, insertConversationSchema, insertMessageSchema, generateImageSchema, type InsertStatusCheck, type StatusCheck } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { verifyAdminPassword, requireAuth } from "./auth";
import { handleChatStream } from "./chat";
import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { getOpenRouterModels, streamOpenRouterChat } from "./openrouter";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication endpoints
  const adminLoginSchema = z.object({
    password: z.string().min(1, "Password is required"),
  });

  app.post("/api/admin/login", async (req, res) => {
    try {
      const result = adminLoginSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ error: "Invalid request" });
      }

      const isValid = await verifyAdminPassword(result.data.password);
      
      if (!isValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      req.session.isAdmin = true;
      
      // Force session save to ensure it's persisted before redirect
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          return res.status(500).json({ error: "Failed to save session" });
        }
        return res.json({ success: true });
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/admin/check", (req, res) => {
    res.json({ isAuthenticated: req.session?.isAdmin === true });
  });

  // User authentication endpoints
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const result = signUpSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      const { username, password, email, ...otherData } = result.data;

      // Check if username already exists
      const existingUserByUsername = await storage.getUserByUsername(username);
      if (existingUserByUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }

      // Check if email already exists
      const existingUserByEmail = await storage.getUserByEmail(email);
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate JWT reset key (random 32-character string)
      const jwtResetKey = crypto.randomBytes(16).toString('hex');

      // Create user
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        email,
        jwtResetKey,
        ...otherData,
      });

      // Set session and force save before responding
      req.session.userId = user.id;

      // Force session save to ensure it's persisted before redirect
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          return res.status(500).json({ error: "Failed to save session" });
        }

        // Return user info (without password) and reset key
        const { password: _, ...userWithoutPassword } = user;
        return res.status(201).json({
          success: true,
          user: userWithoutPassword,
          jwtResetKey: jwtResetKey,
          message: "Account created successfully. Please save your JWT Reset Key for password recovery.",
        });
      });
    } catch (error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      const { username, password } = result.data;

      // Get user by username
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Set session and force save before responding
      req.session.userId = user.id;

      // Force session save to ensure it's persisted before redirect
      req.session.save((err) => {
        if (err) {
          console.error("Error saving session:", err);
          return res.status(500).json({ error: "Failed to save session" });
        }

        // Return user info (without password)
        const { password: _, jwtResetKey: __, ...userWithoutSensitive } = user;
        return res.json({
          success: true,
          user: userWithoutSensitive,
        });
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/check", async (req, res) => {
    if (!req.session.userId) {
      return res.json({ isAuthenticated: false, user: null });
    }

    try {
      const user = await storage.getUserById(req.session.userId);
      if (!user) {
        return res.json({ isAuthenticated: false, user: null });
      }

      const { password: _, jwtResetKey: __, ...userWithoutSensitive } = user;
      return res.json({ isAuthenticated: true, user: userWithoutSensitive });
    } catch (error) {
      console.error("Error checking auth:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const result = resetPasswordSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      const { username, jwtResetKey, newPassword } = result.data;

      // Get user by username
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify JWT reset key
      if (user.jwtResetKey !== jwtResetKey) {
        return res.status(401).json({ error: "Invalid JWT Reset Key" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      const success = await storage.updateUserPassword(user.id, hashedPassword);

      if (!success) {
        return res.status(500).json({ error: "Failed to update password" });
      }

      return res.json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error("Error during password reset:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/auth/profile", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const result = updateProfileSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      // Check if email is being changed and if it's already taken
      if (result.data.email) {
        const existingUser = await storage.getUserByEmail(result.data.email);
        if (existingUser && existingUser.id !== req.session.userId) {
          return res.status(400).json({ error: "Email already in use" });
        }
      }

      const updatedUser = await storage.updateUser(req.session.userId, result.data);

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, jwtResetKey: __, ...userWithoutSensitive } = updatedUser;
      return res.json({
        success: true,
        user: userWithoutSensitive,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const result = contactFormSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          error: validationError.toString() 
        });
      }

      const contact = await storage.createContact(result.data);
      
      return res.status(201).json({ 
        success: true,
        message: "Contact form submitted successfully",
        id: contact.id 
      });
    } catch (error) {
      console.error("Error creating contact:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (_req, res) => {
    try {
      const contacts = await storage.getContacts();
      return res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  // Project endpoints
  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      return res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  app.get("/api/projects/:slug", async (req, res) => {
    try {
      const project = await storage.getProjectBySlug(req.params.slug);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      return res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  app.post("/api/projects", requireAuth, async (req, res) => {
    try {
      const result = insertProjectSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          error: validationError.toString() 
        });
      }

      const project = await storage.createProject(result.data);
      
      return res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  app.put("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertProjectSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          error: validationError.toString() 
        });
      }

      const project = await storage.updateProject(id, result.data);
      
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      return res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  app.delete("/api/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProject(id);
      
      if (!success) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  // Blog post endpoints
  app.get("/api/blog", async (_req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      return res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const blogPost = await storage.getBlogPostBySlug(req.params.slug);
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      return res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  app.post("/api/blog", requireAuth, async (req, res) => {
    try {
      const result = insertBlogPostSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          error: validationError.toString() 
        });
      }

      const blogPost = await storage.createBlogPost(result.data);
      
      return res.status(201).json(blogPost);
    } catch (error) {
      console.error("Error creating blog post:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  app.put("/api/blog/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertBlogPostSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ 
          error: validationError.toString() 
        });
      }

      const blogPost = await storage.updateBlogPost(id, result.data);
      
      if (!blogPost) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      return res.json(blogPost);
    } catch (error) {
      console.error("Error updating blog post:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  app.delete("/api/blog/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlogPost(id);
      
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return res.status(500).json({ 
        error: "Internal server error" 
      });
    }
  });

  // Capture screenshot endpoint (admin only)
  app.post("/api/admin/capture-screenshot", requireAuth, async (req, res) => {
    try {
      const { url, projectId } = req.body;
      
      if (!url || !projectId) {
        return res.status(400).json({ error: "URL and projectId are required" });
      }

      // Use Thum.io to capture screenshot (1000 free/month, no API key needed)
      const screenshotUrl = `https://image.thum.io/get/width/1200/crop/800/${encodeURIComponent(url)}`;
      
      // Fetch the screenshot
      const response = await fetch(screenshotUrl);
      if (!response.ok) {
        throw new Error(`Failed to capture screenshot: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Generate filename from project slug
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const fs = await import('fs/promises');
      const path = await import('path');
      
      const filename = `${project.slug}-screenshot.jpg`;
      const filepath = path.join(process.cwd(), 'client/public/assets/screenshots', filename);
      
      // Save the file
      await fs.writeFile(filepath, buffer);

      // Update project with new image path
      const imagePath = `/assets/screenshots/${filename}`;
      await storage.updateProject(projectId, { image: imagePath });

      return res.json({ 
        success: true, 
        imagePath,
        message: `Screenshot captured for ${project.title}`
      });
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      return res.status(500).json({ 
        error: "Failed to capture screenshot" 
      });
    }
  });

  // Public endpoint to proxy screenshots (bypasses CORS)
  app.get("/api/screenshot", async (req, res) => {
    try {
      const url = req.query.url as string;
      
      if (!url) {
        return res.status(400).json({ error: "URL parameter is required" });
      }

      // Use Thum.io to get screenshot
      const screenshotUrl = `https://image.thum.io/get/width/1200/crop/800/${encodeURIComponent(url)}`;
      
      // Fetch the screenshot
      const response = await fetch(screenshotUrl);
      if (!response.ok) {
        throw new Error(`Failed to capture screenshot: ${response.statusText}`);
      }

      // Get the image buffer
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Set appropriate headers
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      
      // Send the image
      return res.send(buffer);
    } catch (error) {
      console.error("Error proxying screenshot:", error);
      return res.status(500).json({ 
        error: "Failed to capture screenshot" 
      });
    }
  });

  // Capture all project screenshots (admin only)
  app.post("/api/admin/capture-all-screenshots", requireAuth, async (req, res) => {
    try {
      const projects = await storage.getProjects();
      const results = [];

      for (const project of projects) {
        if (project.liveUrl) {
          try {
            const screenshotUrl = `https://image.thum.io/get/width/1200/crop/800/${encodeURIComponent(project.liveUrl)}`;
            const response = await fetch(screenshotUrl);
            
            if (response.ok) {
              const arrayBuffer = await response.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);

              const fs = await import('fs/promises');
              const path = await import('path');
              
              const filename = `${project.slug}-screenshot.jpg`;
              const filepath = path.join(process.cwd(), 'client/public/assets/screenshots', filename);
              
              await fs.writeFile(filepath, buffer);

              const imagePath = `/assets/screenshots/${filename}`;
              await storage.updateProject(project.id, { image: imagePath });

              results.push({ 
                projectId: project.id, 
                title: project.title, 
                success: true, 
                imagePath 
              });
            } else {
              results.push({ 
                projectId: project.id, 
                title: project.title, 
                success: false, 
                error: `HTTP ${response.status}` 
              });
            }
          } catch (error) {
            results.push({ 
              projectId: project.id, 
              title: project.title, 
              success: false, 
              error: error instanceof Error ? error.message : 'Unknown error' 
            });
          }
        } else {
          results.push({ 
            projectId: project.id, 
            title: project.title, 
            success: false, 
            error: 'No live URL' 
          });
        }
      }

      return res.json({ results });
    } catch (error) {
      console.error("Error capturing screenshots:", error);
      return res.status(500).json({ 
        error: "Failed to capture screenshots" 
      });
    }
  });

  // Chat endpoint for AI assistant
  app.post("/api/chat", async (req, res) => {
    await handleChatStream(req, res, storage);
  });

  // OpenRouter chatbot endpoints
  // Get available models
  app.get("/api/openrouter/models", async (req, res) => {
    try {
      const models = await getOpenRouterModels();
      return res.json(models);
    } catch (error) {
      console.error("Error fetching OpenRouter models:", error);
      return res.status(500).json({ error: "Failed to fetch models" });
    }
  });

  // Get user's conversations
  app.get("/api/chatbot/conversations", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const conversations = await storage.getConversationsByUserId(req.session.userId);
      return res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return res.status(500).json({ error: "Failed to fetch conversations" });
    }
  });

  // Create new conversation
  app.post("/api/chatbot/conversations", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const result = insertConversationSchema.extend({
        userId: z.number(),
      }).safeParse({ ...req.body, userId: req.session.userId });

      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      const conversation = await storage.createConversation(result.data);
      return res.status(201).json(conversation);
    } catch (error) {
      console.error("Error creating conversation:", error);
      return res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  // Get conversation with messages
  app.get("/api/chatbot/conversations/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const conversationId = parseInt(req.params.id);
      const conversation = await storage.getConversation(conversationId);

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      if (conversation.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const messages = await storage.getMessagesByConversationId(conversationId);
      return res.json({ conversation, messages });
    } catch (error) {
      console.error("Error fetching conversation:", error);
      return res.status(500).json({ error: "Failed to fetch conversation" });
    }
  });

  // Delete conversation
  app.delete("/api/chatbot/conversations/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const conversationId = parseInt(req.params.id);
      const conversation = await storage.getConversation(conversationId);

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      if (conversation.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      await storage.deleteConversation(conversationId);
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting conversation:", error);
      return res.status(500).json({ error: "Failed to delete conversation" });
    }
  });

  // Stream chat
  app.post("/api/chatbot/chat", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const { conversationId, message, model } = req.body;

      // Verify conversation ownership
      const conversation = await storage.getConversation(conversationId);
      if (!conversation || conversation.userId !== req.session.userId) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Save user message
      await storage.createMessage({
        conversationId,
        role: "user",
        content: message,
      });

      // Get conversation history
      const messages = await storage.getMessagesByConversationId(conversationId);
      const chatMessages = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      // Stream response
      let assistantMessage = "";
      
      // Set up SSE
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.REPLIT_DOMAINS || "http://localhost:5000",
          "X-Title": "AgentiLab.ai Chat",
        },
        body: JSON.stringify({
          model: model || conversation.model,
          messages: chatMessages,
          stream: true,
        }),
      });

      if (!openRouterResponse.ok) {
        res.write(`data: ${JSON.stringify({ error: "API error" })}\n\n`);
        res.end();
        return;
      }

      if (!openRouterResponse.body) {
        res.write(`data: ${JSON.stringify({ error: "No response body" })}\n\n`);
        res.end();
        return;
      }

      const reader = openRouterResponse.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            // Save assistant message
            await storage.createMessage({
              conversationId,
              role: "assistant",
              content: assistantMessage,
            });

            res.write("data: [DONE]\n\n");
            res.end();
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter(line => line.trim() !== "");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              
              if (data === "[DONE]") {
                continue;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                
                if (content) {
                  assistantMessage += content;
                  res.write(`data: ${JSON.stringify({ content })}\n\n`);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      } catch (error) {
        console.error("Error streaming:", error);
        res.write(`data: ${JSON.stringify({ error: "Stream error" })}\n\n`);
        res.end();
      }
    } catch (error) {
      console.error("Error in chat:", error);
      return res.status(500).json({ error: "Chat failed" });
    }
  });

  // Get chat statistics
  app.get("/api/chatbot/stats", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const conversations = await storage.getConversationsByUserId(req.session.userId);
      
      let totalMessages = 0;
      const modelUsage: Record<string, number> = {};

      for (const conversation of conversations) {
        const messages = await storage.getMessagesByConversationId(conversation.id);
        totalMessages += messages.length;

        modelUsage[conversation.model] = (modelUsage[conversation.model] || 0) + 1;
      }

      return res.json({
        totalConversations: conversations.length,
        totalMessages,
        modelUsage,
        conversations: conversations.slice(0, 10), // Last 10 conversations
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      return res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Image Generation Routes
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Generate images with DALL-E
  app.post("/api/images/generate", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const result = generateImageSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromError(result.error);
        return res.status(400).json({ error: validationError.toString() });
      }

      const { prompt, numberOfImages, size, quality, style } = result.data;

      // Generate images in parallel (DALL-E 3 only generates 1 image per request)
      const imagePromises = Array.from({ length: numberOfImages }, async () => {
        try {
          const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            size,
            quality,
            style,
            n: 1,
          });

          if (!response.data || response.data.length === 0) {
            throw new Error("No image data returned");
          }

          const imageData = response.data[0];
          
          // Save to database
          const savedImage = await storage.createGeneratedImage({
            userId: req.session.userId!,
            prompt,
            imageUrl: imageData.url!,
            size,
            quality,
            style,
            revisedPrompt: imageData.revised_prompt || null,
          });

          return {
            id: savedImage.id,
            url: imageData.url,
            revisedPrompt: imageData.revised_prompt,
          };
        } catch (error: any) {
          console.error("Error generating single image:", error);
          return {
            error: error.message || "Failed to generate image",
          };
        }
      });

      const results = await Promise.all(imagePromises);
      
      // Filter out errors
      const successfulImages = results.filter(r => !('error' in r));
      const errors = results.filter(r => 'error' in r);

      return res.json({
        success: successfulImages.length > 0,
        images: successfulImages,
        errors: errors.length > 0 ? errors : undefined,
        totalGenerated: successfulImages.length,
        totalRequested: numberOfImages,
      });
    } catch (error: any) {
      console.error("Error in image generation:", error);
      return res.status(500).json({ 
        error: error.message || "Failed to generate images" 
      });
    }
  });

  // Get user's generated images history
  app.get("/api/images/history", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const images = await storage.getGeneratedImagesByUserId(req.session.userId);
      return res.json(images);
    } catch (error) {
      console.error("Error fetching image history:", error);
      return res.status(500).json({ error: "Failed to fetch image history" });
    }
  });

  // Delete generated image
  app.delete("/api/images/:id", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const imageId = parseInt(req.params.id);
      
      if (isNaN(imageId)) {
        return res.status(400).json({ error: "Invalid image ID" });
      }

      // Verify image belongs to user
      const image = await storage.getGeneratedImage(imageId);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      if (image.userId !== req.session.userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const success = await storage.deleteGeneratedImage(imageId);
      
      if (success) {
        return res.json({ success: true });
      } else {
        return res.status(500).json({ error: "Failed to delete image" });
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      return res.status(500).json({ error: "Failed to delete image" });
    }
  });

  // Download generated image (proxy to avoid CORS issues)
  app.get("/api/images/:id/download", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const imageId = parseInt(req.params.id);
      
      if (isNaN(imageId)) {
        return res.status(400).json({ error: "Invalid image ID" });
      }

      // Verify image belongs to user
      const image = await storage.getGeneratedImage(imageId);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      if (image.userId !== req.session.userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      // Fetch the image from OpenAI's URL
      const imageResponse = await fetch(image.imageUrl);
      
      if (!imageResponse.ok) {
        return res.status(500).json({ error: "Failed to fetch image" });
      }

      // Get the image buffer
      const imageBuffer = await imageResponse.arrayBuffer();
      
      // Set appropriate headers for download
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment; filename="image-${imageId}.png"`);
      res.setHeader('Content-Length', imageBuffer.byteLength.toString());
      
      // Send the image
      res.send(Buffer.from(imageBuffer));
    } catch (error) {
      console.error("Error downloading image:", error);
      return res.status(500).json({ error: "Failed to download image" });
    }
  });

  // Status page endpoint - Check all projects and services
  app.get("/api/status", async (req, res) => {
    try {
      const checks: InsertStatusCheck[] = [];

      // Check Client Dashboard (always check this)
      const dashboardUrl = `${req.protocol}://${req.get('host')}/dashboard`;
      const dashboardCheck = await checkServiceStatus("Client Dashboard", dashboardUrl);
      checks.push(dashboardCheck);

      // Try to get projects from database, but continue if it fails
      try {
        const projects = await storage.getProjects();
        
        // Check each project with a live URL
        for (const project of projects) {
          if (project.liveUrl) {
            const projectCheck = await checkServiceStatus(project.title, project.liveUrl);
            checks.push(projectCheck);
          }
        }
      } catch (dbError) {
        console.error("Error fetching projects from DB:", dbError);
        // Continue without projects if DB is unavailable
      }

      // Try to save checks to database, but return results even if save fails
      let savedChecks = checks;
      try {
        savedChecks = await Promise.all(
          checks.map(check => storage.createStatusCheck(check))
        );
      } catch (saveError) {
        console.error("Error saving status checks:", saveError);
        // Use original checks if save fails
      }

      // Try to get latest statuses, fallback to current checks
      let latestStatuses = savedChecks;
      try {
        latestStatuses = await storage.getLatestStatusByService();
      } catch (summaryError) {
        console.error("Error fetching status summary:", summaryError);
        // Use current checks as summary
      }

      return res.json({
        timestamp: new Date().toISOString(),
        checks: savedChecks,
        summary: latestStatuses,
      });
    } catch (error) {
      console.error("Error checking status:", error);
      return res.status(500).json({ error: "Failed to check status" });
    }
  });

  // Get status history
  app.get("/api/status/history", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const history = await storage.getStatusChecks(limit);
      return res.json(history);
    } catch (error) {
      console.error("Error fetching status history:", error);
      // Return empty array instead of error if history is not available
      return res.json([]);
    }
  });

  // Get 24h status history grouped by service
  app.get("/api/status/history/24h", async (req, res) => {
    try {
      // Get all checks from last 24 hours
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const history = await storage.getStatusChecksSince(twentyFourHoursAgo);
      
      // Group by service name
      const groupedByService: Record<string, StatusCheck[]> = {};
      for (const check of history) {
        if (!groupedByService[check.serviceName]) {
          groupedByService[check.serviceName] = [];
        }
        groupedByService[check.serviceName].push(check);
      }
      
      return res.json(groupedByService);
    } catch (error) {
      console.error("Error fetching 24h history:", error);
      return res.json({});
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Helper function to check service status
async function checkServiceStatus(serviceName: string, serviceUrl: string): Promise<InsertStatusCheck> {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(serviceUrl, {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const responseTime = Date.now() - startTime;

    let status: "operational" | "degraded" | "down";
    if (response.ok) {
      status = responseTime < 1000 ? "operational" : "degraded";
    } else {
      status = "down";
    }

    return {
      serviceName,
      serviceUrl,
      status,
      responseTime,
      statusCode: response.status,
      errorMessage: response.ok ? null : `HTTP ${response.status}`,
    };
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    return {
      serviceName,
      serviceUrl,
      status: "down",
      responseTime,
      statusCode: null,
      errorMessage: error.message || "Connection failed",
    };
  }
}
