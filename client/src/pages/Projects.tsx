import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "@/components/ProjectCard";
import { SEO } from "@/components/SEO";
import type { Project } from "@shared/schema";

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

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div className="min-h-screen py-16 md:py-24">
      <SEO
        title="Projects - AgentiLab.ai"
        description="Explore our portfolio of innovative AI-powered applications including SecureChat, VibeLab, and PassVault. Building intelligent, user-friendly solutions that solve real-world challenges."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-projects-title">
            Our Projects
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of innovative AI-powered applications. Each project showcases 
            our commitment to building intelligent, user-friendly solutions that solve real-world challenges.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-muted-foreground">Loading projects...</div>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
