import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ProjectMiniCard } from "@/components/ProjectMiniCard";
import { useQuery } from "@tanstack/react-query";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  projectIds?: number[];
}

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
}

export function AgentiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Hello! I\'m **Agenti**, your AI assistant for AgentiLab.ai. I can help you learn about our AI projects and capabilities. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [streamingProjectIds, setStreamingProjectIds] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch all projects to match referenced projects
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingMessage]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamingMessage('');
    setStreamingProjectIds([]);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let buffer = '';
      let detectedProjectIds: number[] = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.text) {
                  fullResponse += data.text;
                  setStreamingMessage(fullResponse);
                  
                  // Detect project mentions in real-time
                  const foundIds = detectProjectsInText(fullResponse, projects);
                  if (foundIds.length !== detectedProjectIds.length) {
                    detectedProjectIds = foundIds;
                    setStreamingProjectIds(foundIds);
                  }
                }
                
                if (data.done) {
                  const assistantMessage: Message = {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: fullResponse,
                    projectIds: detectedProjectIds,
                  };
                  setMessages(prev => [...prev, assistantMessage]);
                  setStreamingMessage('');
                  setStreamingProjectIds([]);
                }
                
                if (data.error) {
                  throw new Error(data.error);
                }
              } catch (parseError) {
                console.error('Failed to parse SSE data:', line, parseError);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, an error occurred. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
      setStreamingMessage('');
      setStreamingProjectIds([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Detect projects mentioned in text
  const detectProjectsInText = (text: string, allProjects: Project[]): number[] => {
    const foundIds: number[] = [];
    const lowerText = text.toLowerCase();
    
    allProjects.forEach(project => {
      const titleLower = project.title.toLowerCase();
      const slugLower = project.slug.toLowerCase();
      
      // Check if project is mentioned by title or slug
      if (lowerText.includes(titleLower) || lowerText.includes(slugLower)) {
        if (!foundIds.includes(project.id)) {
          foundIds.push(project.id);
        }
      }
    });
    
    return foundIds;
  };

  // Get projects by IDs
  const getProjectsByIds = (ids: number[]): Project[] => {
    return projects.filter(p => ids.includes(p.id));
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(true)}
            style={{ position: 'fixed' }}
            className="bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover-elevate active-elevate-2 group"
            data-testid="button-open-chat"
            aria-label="Open chat with Agenti"
          >
            <MessageCircle className="h-6 w-6" />
            <motion.div
              className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full p-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Sparkles className="h-3 w-3" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed' }}
            className="inset-0 md:bottom-6 md:right-6 md:inset-auto z-[9999] md:w-[440px] md:h-[680px] w-full h-full bg-background border-0 md:border md:border-border rounded-none md:rounded-xl shadow-2xl flex flex-col overflow-hidden"
            data-testid="chat-box"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center ring-2 ring-primary/20">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm">Agenti</h3>
                  <p className="text-xs text-muted-foreground">AI Assistant</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="hover:bg-muted"
                data-testid="button-close-chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div
                      className={cn(
                        "flex gap-3",
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                      data-testid={`message-${message.role}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                      )}
                      
                      <div
                        className={cn(
                          "max-w-[85%] rounded-xl px-4 py-2.5 border",
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground border-primary-border'
                            : 'bg-card border-border'
                        )}
                      >
                        {message.role === 'assistant' ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        )}
                      </div>

                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="h-4 w-4 text-foreground" />
                        </div>
                      )}
                    </div>
                    
                    {/* Show project cards for this message */}
                    {message.role === 'assistant' && message.projectIds && message.projectIds.length > 0 && (
                      <div className="ml-11 mt-2">
                        {getProjectsByIds(message.projectIds).map(project => (
                          <ProjectMiniCard key={project.id} project={project} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Streaming message */}
                {streamingMessage && (
                  <div>
                    <div className="flex gap-3 justify-start" data-testid="message-streaming">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="max-w-[85%] rounded-xl px-4 py-2.5 border bg-card border-border">
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {streamingMessage}
                          </ReactMarkdown>
                        </div>
                        <motion.span
                          className="inline-block w-1.5 h-4 ml-1 bg-primary rounded-sm"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        />
                      </div>
                    </div>
                    
                    {/* Show project cards while streaming */}
                    {streamingProjectIds.length > 0 && (
                      <div className="ml-11 mt-2">
                        {getProjectsByIds(streamingProjectIds).map(project => (
                          <ProjectMiniCard key={project.id} project={project} />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Loading indicator */}
                {isLoading && !streamingMessage && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-card border border-border rounded-xl px-4 py-3">
                      <div className="flex gap-1.5">
                        <motion.div
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-muted-foreground rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border bg-muted/20 backdrop-blur-sm">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our AI projects..."
                  disabled={isLoading}
                  className="flex-1 bg-background"
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
