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
import type { Project } from "@shared/schema";

const projectFormSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tech: z.string().min(1, "Tech stack is required"),
  image: z.string().url("Must be a valid URL"),
  overview: z.string().min(1, "Overview is required"),
  features: z.string().min(1, "Features are required"),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectForm({ project, open, onOpenChange }: ProjectFormProps) {
  const { toast } = useToast();
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: project
      ? {
          slug: project.slug,
          title: project.title,
          description: project.description,
          tech: project.tech.join(", "),
          image: project.image,
          overview: project.overview,
          features: project.features.join("\n"),
          liveUrl: project.liveUrl || "",
        }
      : {
          slug: "",
          title: "",
          description: "",
          tech: "",
          image: "",
          overview: "",
          features: "",
          liveUrl: "",
        },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        slug: project.slug,
        title: project.title,
        description: project.description,
        tech: project.tech.join(", "),
        image: project.image,
        overview: project.overview,
        features: project.features.join("\n"),
        liveUrl: project.liveUrl || "",
      });
    } else {
      form.reset({
        slug: "",
        title: "",
        description: "",
        tech: "",
        image: "",
        overview: "",
        features: "",
        liveUrl: "",
      });
    }
  }, [project, form]);

  const mutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const payload = {
        ...data,
        tech: data.tech.split(",").map((t) => t.trim()),
        features: data.features.split("\n").filter((f) => f.trim()),
        liveUrl: data.liveUrl || null,
      };

      if (project) {
        return await apiRequest("PUT", `/api/projects/${project.id}`, payload);
      } else {
        return await apiRequest("POST", `/api/projects`, payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Success",
        description: project ? "Project updated successfully" : "Project created successfully",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save project",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create Project"}</DialogTitle>
          <DialogDescription>
            {project ? "Update project details" : "Add a new project to your portfolio"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" {...form.register("slug")} data-testid="input-project-slug" />
            {form.formState.errors.slug && (
              <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...form.register("title")} data-testid="input-project-title" />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              data-testid="input-project-description"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech">Tech Stack (comma separated)</Label>
            <Input id="tech" {...form.register("tech")} placeholder="React, Node.js, PostgreSQL" data-testid="input-project-tech" />
            {form.formState.errors.tech && (
              <p className="text-sm text-destructive">{form.formState.errors.tech.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" {...form.register("image")} data-testid="input-project-image" />
            {form.formState.errors.image && (
              <p className="text-sm text-destructive">{form.formState.errors.image.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Overview</Label>
            <Textarea id="overview" {...form.register("overview")} rows={4} data-testid="input-project-overview" />
            {form.formState.errors.overview && (
              <p className="text-sm text-destructive">{form.formState.errors.overview.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea id="features" {...form.register("features")} rows={6} data-testid="input-project-features" />
            {form.formState.errors.features && (
              <p className="text-sm text-destructive">{form.formState.errors.features.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live URL (optional)</Label>
            <Input id="liveUrl" {...form.register("liveUrl")} data-testid="input-project-liveurl" />
            {form.formState.errors.liveUrl && (
              <p className="text-sm text-destructive">{form.formState.errors.liveUrl.message}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending} data-testid="button-submit-project">
              {mutation.isPending ? "Saving..." : project ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
