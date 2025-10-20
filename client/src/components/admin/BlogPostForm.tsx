import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost } from "@shared/schema";

const blogPostFormSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  publishedAt: z.string().min(1, "Published date is required"),
  coverImage: z.string().url("Must be a valid URL"),
  tags: z.string().min(1, "Tags are required"),
  readTimeMinutes: z.string().min(1, "Read time is required"),
});

type BlogPostFormData = z.infer<typeof blogPostFormSchema>;

interface BlogPostFormProps {
  post: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogPostForm({ post, open, onOpenChange }: BlogPostFormProps) {
  const { toast } = useToast();
  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: post
      ? {
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          publishedAt: new Date(post.publishedAt).toISOString().split("T")[0],
          coverImage: post.coverImage,
          tags: post.tags.join(", "),
          readTimeMinutes: post.readTimeMinutes.toString(),
        }
      : {
          slug: "",
          title: "",
          excerpt: "",
          content: "",
          author: "AgentiLab Team",
          publishedAt: new Date().toISOString().split("T")[0],
          coverImage: "",
          tags: "",
          readTimeMinutes: "5",
        },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        publishedAt: new Date(post.publishedAt).toISOString().split("T")[0],
        coverImage: post.coverImage,
        tags: post.tags.join(", "),
        readTimeMinutes: post.readTimeMinutes.toString(),
      });
    } else {
      form.reset({
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        author: "AgentiLab Team",
        publishedAt: new Date().toISOString().split("T")[0],
        coverImage: "",
        tags: "",
        readTimeMinutes: "5",
      });
    }
  }, [post, form]);

  const mutation = useMutation({
    mutationFn: async (data: BlogPostFormData) => {
      const payload = {
        ...data,
        publishedAt: new Date(data.publishedAt).toISOString(),
        tags: data.tags.split(",").map((t) => t.trim()),
        readTimeMinutes: parseInt(data.readTimeMinutes),
      };

      if (post) {
        return await apiRequest("PUT", `/api/blog/${post.id}`, payload);
      } else {
        return await apiRequest("POST", `/api/blog`, payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      toast({
        title: "Success",
        description: post ? "Blog post updated successfully" : "Blog post created successfully",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save blog post",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BlogPostFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Blog Post" : "Create Blog Post"}</DialogTitle>
          <DialogDescription>
            {post ? "Update blog post details" : "Add a new blog post"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" {...form.register("slug")} data-testid="input-blog-slug" />
              {form.formState.errors.slug && (
                <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" {...form.register("author")} data-testid="input-blog-author" />
              {form.formState.errors.author && (
                <p className="text-sm text-destructive">{form.formState.errors.author.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...form.register("title")} data-testid="input-blog-title" />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              {...form.register("excerpt")}
              rows={3}
              data-testid="input-blog-excerpt"
            />
            {form.formState.errors.excerpt && (
              <p className="text-sm text-destructive">{form.formState.errors.excerpt.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...form.register("content")}
              rows={10}
              data-testid="input-blog-content"
            />
            {form.formState.errors.content && (
              <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publishedAt">Published Date</Label>
              <Input
                id="publishedAt"
                type="date"
                {...form.register("publishedAt")}
                data-testid="input-blog-publishedat"
              />
              {form.formState.errors.publishedAt && (
                <p className="text-sm text-destructive">{form.formState.errors.publishedAt.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTimeMinutes">Read Time (minutes)</Label>
              <Input
                id="readTimeMinutes"
                type="number"
                {...form.register("readTimeMinutes")}
                data-testid="input-blog-readtime"
              />
              {form.formState.errors.readTimeMinutes && (
                <p className="text-sm text-destructive">{form.formState.errors.readTimeMinutes.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input id="coverImage" {...form.register("coverImage")} data-testid="input-blog-coverimage" />
            {form.formState.errors.coverImage && (
              <p className="text-sm text-destructive">{form.formState.errors.coverImage.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              {...form.register("tags")}
              placeholder="AI, Machine Learning, Development"
              data-testid="input-blog-tags"
            />
            {form.formState.errors.tags && (
              <p className="text-sm text-destructive">{form.formState.errors.tags.message}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending} data-testid="button-submit-blog">
              {mutation.isPending ? "Saving..." : post ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
