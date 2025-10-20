import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles, Code, Zap, MessageSquare, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { SEO } from "@/components/SEO";
import { StructuredData, organizationSchema } from "@/components/StructuredData";
import type { Project } from "@shared/schema";
import heroImage from "@assets/generated_images/AI_neural_network_hero_background_4fcf8128.png";

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

export default function Home() {
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });
  
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen">
      <SEO 
        title="AgentiLab.ai - AI Development & Innovation"
        description="Building the future of AI software with intelligent systems and next-generation tools for developers, researchers, and creators worldwide."
        ogType="website"
      />
      <StructuredData data={organizationSchema} />
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="AI Neural Network"
            className="w-full h-full object-cover blur-sm md:blur-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Innovation</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
              data-testid="text-hero-title"
            >
              Building the Future of AI Software
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
              data-testid="text-hero-subtitle"
            >
              We design intelligent systems and next-generation AI tools that empower developers, researchers, and creators worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/projects">
                <Button size="lg" className="min-w-[200px]" data-testid="button-explore-projects">
                  Explore Our Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="min-w-[200px] backdrop-blur-sm bg-background/50" data-testid="button-get-in-touch">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Client Benefits Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Crown className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Premium Client Account</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Access Over 300 AI Models
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Create your client account and enjoy our intelligent chatbot with access to the most advanced models: GPT-4, Claude, Gemini, Llama and many more.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <span>Unlimited conversations with real-time streaming</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <span>Complete history and detailed statistics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="h-3 w-3 text-primary" />
                    </div>
                    <span>Access to the latest AI models on the market</span>
                  </li>
                </ul>
                <Link href="/client-benefits">
                  <Button size="lg" data-testid="button-discover-benefits">
                    Discover the Benefits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 p-8 border border-primary/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-background/50 backdrop-blur-sm rounded-lg border">
                      <MessageSquare className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-semibold">Intelligent ChatBot</p>
                        <p className="text-sm text-muted-foreground">300+ AI Models</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-background/50 backdrop-blur-sm rounded-lg border">
                      <Sparkles className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-semibold">Real-Time Responses</p>
                        <p className="text-sm text-muted-foreground">Ultra-fast streaming</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-background/50 backdrop-blur-sm rounded-lg border">
                      <Code className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-semibold">Multi-Model Support</p>
                        <p className="text-sm text-muted-foreground">OpenAI, Google, Meta & more</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We transform cutting-edge AI research into practical, user-friendly applications that solve real-world problems.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center p-6" data-testid="card-service-ai-development">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">AI Development</h3>
              <p className="text-muted-foreground">
                Custom AI solutions powered by the latest language models and machine learning frameworks.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6" data-testid="card-service-web-apps">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-chart-2/10 mb-4">
                <Zap className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Web Applications</h3>
              <p className="text-muted-foreground">
                Full-stack web apps built with modern technologies for performance and scalability.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6" data-testid="card-service-consulting">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-chart-3/10 mb-4">
                <Sparkles className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">AI Consulting</h3>
              <p className="text-muted-foreground">
                Strategic guidance on integrating AI into your business processes and workflows.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of innovative AI-powered applications across various domains.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/projects">
              <Button variant="outline" size="lg" data-testid="button-view-all-projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
