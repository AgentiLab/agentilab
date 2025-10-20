import { type Contact, type InsertContact, type Project, type InsertProject, type BlogPost, type InsertBlogPost, type User, type InsertUser, type Conversation, type InsertConversation, type Message, type InsertMessage, type GeneratedImage, type InsertGeneratedImage, type StatusCheck, type InsertStatusCheck, contacts, projects, blogPosts, users, conversations, messages, generatedImages, statusChecks } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

export interface IStorage {
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  
  // Project methods
  createProject(project: InsertProject): Promise<Project>;
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Blog post methods
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // User methods
  createUser(user: InsertUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  updateUserPassword(id: number, password: string): Promise<boolean>;
  
  // Conversation methods
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversationsByUserId(userId: number): Promise<Conversation[]>;
  getConversation(id: number): Promise<Conversation | undefined>;
  updateConversation(id: number, data: Partial<InsertConversation>): Promise<Conversation | undefined>;
  deleteConversation(id: number): Promise<boolean>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesByConversationId(conversationId: number): Promise<Message[]>;
  
  // Generated Images methods
  createGeneratedImage(image: InsertGeneratedImage): Promise<GeneratedImage>;
  getGeneratedImagesByUserId(userId: number): Promise<GeneratedImage[]>;
  getGeneratedImage(id: number): Promise<GeneratedImage | undefined>;
  deleteGeneratedImage(id: number): Promise<boolean>;
  
  // Status Check methods
  createStatusCheck(statusCheck: InsertStatusCheck): Promise<StatusCheck>;
  getStatusChecks(limit?: number): Promise<StatusCheck[]>;
  getLatestStatusByService(): Promise<StatusCheck[]>;
  getStatusChecksSince(date: Date): Promise<StatusCheck[]>;
}

export class DatabaseStorage implements IStorage {
  // Contact methods
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || undefined;
  }

  // Project methods
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    return project || undefined;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();
    return project || undefined;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id)).returning();
    return result.length > 0;
  }

  // Blog post methods
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [blogPost] = await db
      .insert(blogPosts)
      .values(insertBlogPost)
      .returning();
    return blogPost;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [blogPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return blogPost || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [blogPost] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return blogPost || undefined;
  }

  async updateBlogPost(id: number, updateData: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [blogPost] = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();
    return blogPost || undefined;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  // User methods
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async updateUserPassword(id: number, password: string): Promise<boolean> {
    const result = await db
      .update(users)
      .set({ password })
      .where(eq(users.id, id))
      .returning();
    return result.length > 0;
  }

  // Conversation methods
  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const [conversation] = await db
      .insert(conversations)
      .values(insertConversation)
      .returning();
    return conversation;
  }

  async getConversationsByUserId(userId: number): Promise<Conversation[]> {
    return await db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(desc(conversations.updatedAt));
  }

  async getConversation(id: number): Promise<Conversation | undefined> {
    const [conversation] = await db.select().from(conversations).where(eq(conversations.id, id));
    return conversation || undefined;
  }

  async updateConversation(id: number, updateData: Partial<InsertConversation>): Promise<Conversation | undefined> {
    const [conversation] = await db
      .update(conversations)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(conversations.id, id))
      .returning();
    return conversation || undefined;
  }

  async deleteConversation(id: number): Promise<boolean> {
    const result = await db.delete(conversations).where(eq(conversations.id, id)).returning();
    return result.length > 0;
  }

  // Message methods
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    
    // Update conversation's updatedAt
    await db
      .update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, insertMessage.conversationId));
    
    return message;
  }

  async getMessagesByConversationId(conversationId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(messages.createdAt);
  }

  // Generated Images methods
  async createGeneratedImage(insertImage: InsertGeneratedImage): Promise<GeneratedImage> {
    const [image] = await db
      .insert(generatedImages)
      .values(insertImage)
      .returning();
    return image;
  }

  async getGeneratedImagesByUserId(userId: number): Promise<GeneratedImage[]> {
    return await db
      .select()
      .from(generatedImages)
      .where(eq(generatedImages.userId, userId))
      .orderBy(desc(generatedImages.createdAt));
  }

  async getGeneratedImage(id: number): Promise<GeneratedImage | undefined> {
    const [image] = await db.select().from(generatedImages).where(eq(generatedImages.id, id));
    return image || undefined;
  }

  async deleteGeneratedImage(id: number): Promise<boolean> {
    const result = await db.delete(generatedImages).where(eq(generatedImages.id, id)).returning();
    return result.length > 0;
  }

  // Status Check methods
  async createStatusCheck(insertStatusCheck: InsertStatusCheck): Promise<StatusCheck> {
    const [statusCheck] = await db
      .insert(statusChecks)
      .values(insertStatusCheck)
      .returning();
    return statusCheck;
  }

  async getStatusChecks(limit: number = 100): Promise<StatusCheck[]> {
    return await db
      .select()
      .from(statusChecks)
      .orderBy(desc(statusChecks.checkedAt))
      .limit(limit);
  }

  async getLatestStatusByService(): Promise<StatusCheck[]> {
    // Get the latest status check for each unique service
    const latestChecks = await db
      .select()
      .from(statusChecks)
      .orderBy(desc(statusChecks.checkedAt));
    
    // Group by serviceName and get the latest for each
    const serviceMap = new Map<string, StatusCheck>();
    for (const check of latestChecks) {
      if (!serviceMap.has(check.serviceName)) {
        serviceMap.set(check.serviceName, check);
      }
    }
    
    return Array.from(serviceMap.values());
  }

  async getStatusChecksSince(date: Date): Promise<StatusCheck[]> {
    return await db
      .select()
      .from(statusChecks)
      .where(sql`${statusChecks.checkedAt} >= ${date}`)
      .orderBy(desc(statusChecks.checkedAt));
  }
}

export const storage = new DatabaseStorage();
