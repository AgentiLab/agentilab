import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { StructuredData, createProjectSchema } from "@/components/StructuredData";
import type { Project } from "@shared/schema";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ProjectDetail() {
  const [, params] = useRoute("/projects/:slug");
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", params?.slug],
    enabled: !!params?.slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={`${project.title} - AgentiLab.ai`}
        description={project.description}
        ogType="article"
        ogImage={project.image}
      />
      <StructuredData data={createProjectSchema({
        id: project.slug,
        title: project.title,
        description: project.description,
        image: project.image,
        tech: project.tech,
        liveUrl: project.liveUrl || undefined,
      })} />
      {/* Hero Section with Project Image */}
      <section className="relative min-h-[60vh] md:min-h-[65vh] overflow-hidden pt-16 flex items-end">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="img-project-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full p-8 md:p-12 pb-8 md:pb-12"
        >
          <div className="container mx-auto max-w-7xl">
            <Link href="/projects">
              <Button variant="ghost" className="mb-4" data-testid="button-back-to-projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="text-project-detail-title">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono border border-primary/20"
                  data-testid={`badge-tech-detail-${tech.toLowerCase()}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-3xl font-bold mb-6">Overview</h2>
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-display prose-headings:font-bold
                    prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                    prose-li:text-muted-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-code:text-chart-2 prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                    prose-pre:bg-muted prose-pre:border prose-pre:border-border
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
                  data-testid="text-project-overview"
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {project.overview}
                  </ReactMarkdown>
                </div>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="font-display text-3xl font-bold mb-6">Key Features</h2>
                <motion.ul
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="space-y-4"
                >
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start gap-3"
                      data-testid={`text-feature-${index}`}
                    >
                      <CheckCircle2 className="h-6 w-6 text-chart-3 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* Screenshot Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="font-display text-3xl font-bold mb-6">Screenshots</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((image, index) => (
                      <div key={index} className="aspect-video rounded-xl overflow-hidden border border-border">
                        <img
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                          data-testid={`img-screenshot-${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-6">
                {/* Tech Stack Card */}
                <div className="p-6 rounded-xl bg-card border border-card-border">
                  <h3 className="font-display text-xl font-semibold mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-muted text-foreground text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Card */}
                {project.liveUrl && (
                  <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-chart-2/10 border border-primary/20">
                    <h3 className="font-display text-xl font-semibold mb-2">View Live Demo</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Experience {project.title} in action
                    </p>
                    <Button className="w-full" asChild data-testid="button-visit-live">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Visit Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}

                {/* Contact Card */}
                <div className="p-6 rounded-xl bg-card border border-card-border">
                  <h3 className="font-display text-xl font-semibold mb-2">Interested in Similar Work?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Let's discuss how we can build something amazing for you.
                  </p>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full" data-testid="button-contact-us">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
