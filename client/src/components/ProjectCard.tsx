import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover-elevate cursor-pointer" data-testid={`card-project-${project.slug}`}>
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.slug}`}>
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2" data-testid={`text-project-description-${project.slug}`}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-muted text-chart-2 text-xs font-mono"
                data-testid={`badge-tech-${project.slug}-${tech.toLowerCase()}`}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
            <span>View Project</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
