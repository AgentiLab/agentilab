import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Send, Plus, Trash2, MessageSquare, BarChart3, Bot, Sparkles, Maximize2, X } from "lucide-react";
import { SiOpenai, SiGoogle, SiMeta, SiAmazon } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import type { Conversation, Message } from "@shared/schema";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface OpenRouterModel {
  id: string;
  name: string;
  description?: string;
  pricing?: {
    prompt: string;
    completion: string;
  };
}

interface ChatStats {
  totalConversations: number;
  totalMessages: number;
  modelUsage: Record<string, number>;
  conversations: Conversation[];
}

// Helper function to get provider icon
function getProviderIcon(modelId: string) {
  const model = modelId.toLowerCase();
  
  if (model.includes('openai') || model.includes('gpt')) {
    return <SiOpenai className="h-4 w-4" />;
  }
  if (model.includes('anthropic') || model.includes('claude')) {
    return <span className="text-sm font-bold">A</span>;
  }
  if (model.includes('google') || model.includes('gemini') || model.includes('palm')) {
    return <SiGoogle className="h-4 w-4" />;
  }
  if (model.includes('meta') || model.includes('llama')) {
    return <SiMeta className="h-4 w-4" />;
  }
  if (model.includes('microsoft') || model.includes('phi')) {
    return <span className="text-sm font-bold">Φ</span>;
  }
  if (model.includes('mistral')) {
    return <span className="text-sm font-bold">M</span>;
  }
  if (model.includes('cohere')) {
    return <span className="text-sm font-bold">C</span>;
  }
  if (model.includes('amazon') || model.includes('bedrock')) {
    return <SiAmazon className="h-4 w-4" />;
  }
  
  return <Sparkles className="h-4 w-4" />;
}

export function Chatbot() {
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState<string>("openai/gpt-4o-mini");
  const [currentConversationId, setCurrentConversationId] = useState<number | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch available models
  const { data: models = [], error: modelsError } = useQuery<OpenRouterModel[]>({
    queryKey: ["/api/openrouter/models"],
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });

  useEffect(() => {
    if (modelsError) {
      toast({
        variant: "destructive",
        title: "Failed to load models",
        description: "Please check your OpenRouter API key configuration.",
      });
    }
  }, [modelsError, toast]);

  // Fetch conversations
  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ["/api/chatbot/conversations"],
  });

  // Fetch current conversation messages
  const { data: conversationData } = useQuery<{ conversation: Conversation; messages: Message[] }>({
    queryKey: ["/api/chatbot/conversations", currentConversationId],
    enabled: !!currentConversationId,
  });

  // Fetch stats
  const { data: stats } = useQuery<ChatStats>({
    queryKey: ["/api/chatbot/stats"],
  });

  // Create conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: async (model: string) => {
      const res = await apiRequest("POST", "/api/chatbot/conversations", {
        title: "New Conversation",
        model,
      });
      return await res.json() as Conversation;
    },
    onSuccess: (conversation) => {
      queryClient.invalidateQueries({ queryKey: ["/api/chatbot/conversations"] });
      setCurrentConversationId(conversation.id);
      toast({
        title: "Conversation created",
        description: "You can now start chatting!",
      });
    },
  });

  // Delete conversation mutation
  const deleteConversationMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/chatbot/conversations/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["/api/chatbot/conversations"] });
      if (currentConversationId === deletedId) {
        setCurrentConversationId(null);
      }
      toast({
        title: "Conversation deleted",
      });
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationData?.messages, streamingMessage]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !currentConversationId) return;

    const userMessage = messageInput.trim();
    setMessageInput("");
    setIsStreaming(true);
    setStreamingMessage("");

    try {
      const response = await fetch("/api/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: currentConversationId,
          message: userMessage,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No response body");
      }

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(line => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            
            if (data === "[DONE]") {
              setIsStreaming(false);
              setStreamingMessage("");
              queryClient.invalidateQueries({ queryKey: ["/api/chatbot/conversations", currentConversationId] });
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setStreamingMessage(prev => prev + parsed.content);
              }
              if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Unknown error",
      });
      setIsStreaming(false);
      setStreamingMessage("");
    }
  };

  const handleNewConversation = () => {
    createConversationMutation.mutate(selectedModel);
  };

  const chatContent = (
    <div className={`flex flex-col ${isFullscreen ? 'gap-3 h-screen' : 'gap-4 h-[380px] sm:h-[500px] md:h-[700px]'}`}>
      {/* Controls Bar */}
      <Card className="p-3">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Conversation Selector */}
          <Select
            value={currentConversationId?.toString() || ""}
            onValueChange={(value) => setCurrentConversationId(value ? Number(value) : null)}
          >
            <SelectTrigger className="flex-1 min-w-[200px]" data-testid="select-conversation">
              <SelectValue placeholder="Select a conversation" />
            </SelectTrigger>
            <SelectContent>
              {conversations.map((conv) => (
                <SelectItem key={conv.id} value={conv.id.toString()}>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center">{getProviderIcon(conv.model)}</span>
                    <span className="truncate">{conv.title}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* New Conversation Button */}
          <Button
            onClick={handleNewConversation}
            disabled={createConversationMutation.isPending}
            data-testid="button-new-conversation"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>

          {/* Delete Conversation Button */}
          {currentConversationId && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => deleteConversationMutation.mutate(currentConversationId)}
              data-testid="button-delete-conversation"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}

          {/* Stats Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" data-testid="button-stats">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Chat Statistics</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {stats ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Conversations</p>
                        <p className="text-2xl font-bold">{stats.totalConversations}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Total Messages</p>
                        <p className="text-2xl font-bold">{stats.totalMessages}</p>
                      </div>
                    </div>
                    
                    {Object.entries(stats.modelUsage).length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Top Models Used</p>
                        <div className="space-y-2">
                          {Object.entries(stats.modelUsage)
                            .sort(([, a], [, b]) => b - a)
                            .slice(0, 5)
                            .map(([model, count]) => (
                              <div key={model} className="flex items-center justify-between p-2 rounded-md bg-muted">
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center">{getProviderIcon(model)}</span>
                                  <span className="text-sm">{model.split("/").pop()}</span>
                                </div>
                                <span className="text-sm font-medium">{count}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Loading statistics...</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>

      {/* Chat Area */}
      <Card className="flex flex-col overflow-hidden flex-1">
        {/* Model Selection & Fullscreen */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                {getProviderIcon(selectedModel)}
              </div>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-full max-w-md" data-testid="select-model">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((model: OpenRouterModel) => (
                    <SelectItem key={model.id} value={model.id}>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center">{getProviderIcon(model.id)}</span>
                        <span>{model.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsFullscreen(!isFullscreen)}
              data-testid="button-fullscreen"
            >
              {isFullscreen ? <X className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          {currentConversationId ? (
            <div className="space-y-4">
              {conversationData?.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                    data-testid={`message-${msg.id}`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Streaming message */}
              {isStreaming && streamingMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-lg p-3 bg-muted max-w-[80%]">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {streamingMessage}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation or create a new one to start chatting</p>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={currentConversationId ? "Type your message..." : "Create a conversation first"}
              disabled={!currentConversationId || isStreaming}
              data-testid="input-chat-message"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentConversationId || !messageInput.trim() || isStreaming}
              data-testid="button-send-message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  if (isFullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-background p-2 md:p-4"
        style={{ width: '100vw', height: '100vh' }}
      >
        {chatContent}
      </motion.div>
    );
  }

  return chatContent;
}
