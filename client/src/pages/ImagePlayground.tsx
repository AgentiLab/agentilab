import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateImageSchema, type GenerateImageForm, type GeneratedImage } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, Download, Trash2, Image as ImageIcon, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ImagePlayground() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<GenerateImageForm>({
    resolver: zodResolver(generateImageSchema),
    defaultValues: {
      prompt: "",
      numberOfImages: 1,
      size: "1024x1024",
      quality: "standard",
      style: "vivid",
    },
  });

  const { data: imageHistory, isLoading: isLoadingHistory } = useQuery<GeneratedImage[]>({
    queryKey: ["/api/images/history"],
  });

  const generateImagesMutation = useMutation({
    mutationFn: async (data: GenerateImageForm) => {
      const res = await apiRequest("POST", "/api/images/generate", data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to generate images");
      }
      return await res.json() as {
        success: boolean;
        images: Array<{ id: number; url: string; revisedPrompt?: string }>;
        errors?: Array<{ error: string }>;
        totalGenerated: number;
        totalRequested: number;
      };
    },
    onSuccess: (data) => {
      if (data.success) {
        if (data.errors && data.errors.length > 0) {
          toast({
            title: "Partial success",
            description: `Generated ${data.totalGenerated} of ${data.totalRequested} images. ${data.errors.length} failed.`,
          });
        } else {
          toast({
            title: "Images generated!",
            description: `Successfully generated ${data.totalGenerated} image${data.totalGenerated > 1 ? 's' : ''}.`,
          });
        }
        queryClient.invalidateQueries({ queryKey: ["/api/images/history"] });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Generation failed",
          description: "Failed to generate any images. Please try again.",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: error.message || "An unexpected error occurred",
      });
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/images/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Image deleted",
        description: "The image has been removed from your history.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/images/history"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error.message,
      });
    },
  });

  const onSubmit = async (data: GenerateImageForm) => {
    setIsGenerating(true);
    try {
      await generateImagesMutation.mutateAsync(data);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (imageId: number) => {
    try {
      // Use the server proxy endpoint to download the image
      const a = document.createElement('a');
      a.href = `/api/images/${imageId}/download`;
      a.download = `image-${imageId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Download started",
        description: "Your image is being downloaded.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Failed to download the image. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="generate" data-testid="tab-generate">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="history" data-testid="tab-history">
            <ImageIcon className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="font-display text-2xl font-semibold mb-2">
                  AI Image Generator
                </h2>
                <p className="text-muted-foreground">
                  Create stunning images using DALL-E 3. Describe what you want to see and let AI bring it to life.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A serene mountain landscape at sunset with a crystal clear lake reflecting the pink and orange sky..."
                            className="min-h-[120px] resize-none"
                            data-testid="input-prompt"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Describe the image you want to generate (min. 10 characters)
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="numberOfImages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Images</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              max={10}
                              data-testid="input-number-of-images"
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                const value = e.target.value;
                                const parsed = parseInt(value);
                                field.onChange(isNaN(parsed) ? 1 : parsed);
                              }}
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">
                            Generate 1-10 images (each image is generated separately)
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image Size</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-size">
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1024x1024">Square (1024x1024)</SelectItem>
                              <SelectItem value="1792x1024">Landscape (1792x1024)</SelectItem>
                              <SelectItem value="1024x1792">Portrait (1024x1792)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quality</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-quality">
                                <SelectValue placeholder="Select quality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="hd">HD (Higher Detail)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="style"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Style</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-style">
                                <SelectValue placeholder="Select style" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="vivid">Vivid (Hyper-real & Dramatic)</SelectItem>
                              <SelectItem value="natural">Natural (More Natural Look)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isGenerating}
                    className="w-full"
                    data-testid="button-generate"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Images
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h2 className="font-display text-2xl font-semibold mb-2">
                Image History
              </h2>
              <p className="text-muted-foreground">
                View and download your previously generated images
              </p>
            </div>

            {isLoadingHistory ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted animate-pulse rounded" />
                      <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                      <div className="flex gap-2">
                        <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                        <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : !imageHistory || imageHistory.length === 0 ? (
              <Card className="p-12 text-center">
                <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-semibold text-lg mb-2">No images yet</h3>
                <p className="text-muted-foreground">
                  Generate your first image using the Generate tab
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imageHistory.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden hover-elevate" data-testid={`card-image-${image.id}`}>
                      <div className="aspect-square relative bg-muted">
                        <img
                          src={image.imageUrl}
                          alt={image.prompt}
                          className="w-full h-full object-cover"
                          data-testid={`img-${image.id}`}
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <p className="text-sm line-clamp-2" data-testid={`text-prompt-${image.id}`}>
                          {image.prompt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {image.size}
                          </Badge>
                          <Badge variant="secondary">
                            {image.quality}
                          </Badge>
                          <Badge variant="secondary">
                            {image.style}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleDownload(image.id)}
                            data-testid={`button-download-${image.id}`}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteImageMutation.mutate(image.id)}
                            disabled={deleteImageMutation.isPending}
                            data-testid={`button-delete-${image.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
