import { pgTable, text, timestamp, serial, integer, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tech: text("tech").array().notNull(),
  image: text("image").notNull(),
  gallery: text("gallery").array(),
  overview: text("overview").notNull(),
  features: text("features").array().notNull(),
  liveUrl: text("live_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});
export const selectProjectSchema = createSelectSchema(projects);
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Contacts table
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});
export type ContactForm = z.infer<typeof contactFormSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  coverImage: text("cover_image").notNull(),
  tags: text("tags").array().notNull(),
  readTimeMinutes: integer("read_time_minutes").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});
export const selectBlogPostSchema = createSelectSchema(blogPosts);
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  jwtResetKey: text("jwt_reset_key").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state/province"),
  country: z.string().min(2, "Please enter a valid country"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const resetPasswordSchema = z.object({
  username: z.string().min(1, "Username is required"),
  jwtResetKey: z.string().min(1, "JWT Reset Key is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state/province"),
  country: z.string().min(2, "Please enter a valid country"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SignUpForm = z.infer<typeof signUpSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

// Conversations table for chatbot
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  model: text("model").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Messages table for chatbot
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Generated Images table for Image Playground
export const generatedImages = pgTable("generated_images", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  prompt: text("prompt").notNull(),
  imageUrl: text("image_url").notNull(),
  size: text("size").notNull(), // "1024x1024", "1792x1024", "1024x1792"
  quality: text("quality").notNull(), // "standard" or "hd"
  style: text("style").notNull(), // "vivid" or "natural"
  revisedPrompt: text("revised_prompt"), // OpenAI may revise the prompt
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGeneratedImageSchema = createInsertSchema(generatedImages).omit({
  id: true,
  createdAt: true,
});

export const generateImageSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters").max(4000, "Prompt cannot exceed 4000 characters"),
  numberOfImages: z.number().min(1).max(10).default(1),
  size: z.enum(["1024x1024", "1792x1024", "1024x1792"]).default("1024x1024"),
  quality: z.enum(["standard", "hd"]).default("standard"),
  style: z.enum(["vivid", "natural"]).default("vivid"),
});

export type GeneratedImage = typeof generatedImages.$inferSelect;
export type InsertGeneratedImage = z.infer<typeof insertGeneratedImageSchema>;
export type GenerateImageForm = z.infer<typeof generateImageSchema>;

// Status checks table for monitoring projects and services
export const statusChecks = pgTable("status_checks", {
  id: serial("id").primaryKey(),
  serviceName: text("service_name").notNull(), // "AI Web Search", "Client Dashboard", etc.
  serviceUrl: text("service_url").notNull(), // URL to check
  status: text("status").notNull(), // "operational", "degraded", "down"
  responseTime: integer("response_time"), // Response time in ms
  statusCode: integer("status_code"), // HTTP status code
  errorMessage: text("error_message"), // Error message if any
  checkedAt: timestamp("checked_at").defaultNow().notNull(),
});

export const insertStatusCheckSchema = createInsertSchema(statusChecks).omit({
  id: true,
  checkedAt: true,
});

export type StatusCheck = typeof statusChecks.$inferSelect;
export type InsertStatusCheck = z.infer<typeof insertStatusCheckSchema>;
