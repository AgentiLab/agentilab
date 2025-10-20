import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProjectMiniCardProps {
  project: {
    id: number;
    slug: string;
    title: string;
    description: string;
    tech: string[];
    image: string;
  };
}

export function ProjectMiniCard({ project }: ProjectMiniCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover-elevate cursor-pointer my-3" data-testid={`card-mini-project-${project.slug}`}>
        <div className="flex gap-3 p-3">
          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-testid={`img-mini-project-${project.slug}`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display text-sm font-semibold mb-1 group-hover:text-primary transition-colors truncate" data-testid={`text-mini-project-title-${project.slug}`}>
              {project.title}
            </h4>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2" data-testid={`text-mini-project-description-${project.slug}`}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-full bg-muted text-chart-2 text-[10px] font-mono"
                  data-testid={`badge-mini-tech-${project.slug}-${tech.toLowerCase()}`}
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="px-2 py-0.5 text-[10px] text-muted-foreground">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
