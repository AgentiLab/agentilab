import { motion } from "framer-motion";
import { Brain, Code2, Lightbulb, Users, Zap, Network, Sparkles } from "lucide-react";
import { SiReact, SiTypescript, SiPython, SiTensorflow, SiOpenai, SiAnthropic, SiMeta } from "react-icons/si";
import { SEO } from "@/components/SEO";

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

export default function About() {
  const techStack = [
    { Icon: SiReact, name: "React" },
    { Icon: SiTypescript, name: "TypeScript" },
    { Icon: SiPython, name: "Python" },
    { Icon: SiTensorflow, name: "TensorFlow" },
    { Icon: SiOpenai, name: "OpenAI" },
    { Icon: SiAnthropic, name: "Anthropic" },
    { Icon: SiMeta, name: "Meta AI" },
    { Icon: Zap, name: "Mistral AI" },
    { Icon: Sparkles, name: "Cohere AI" },
    { Icon: Network, name: "OpenRouter" },
  ];

  return (
    <div className="min-h-screen py-16 md:py-24">
      <SEO
        title="About - AgentiLab.ai"
        description="Learn about AgentiLab.ai's mission to democratize AI development and create intelligent tools that make a difference. Meet our team and discover our values."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8" data-testid="text-about-title">
            About AgentiLab.ai
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6" data-testid="text-mission">
            Our mission is to{" "}
            <span className="text-foreground font-semibold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              democratize AI development
            </span>{" "}
            and accelerate intelligent tool creation for everyone.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe that artificial intelligence should be accessible, practical, and beneficial. 
            Our team combines deep technical expertise with a passion for creating tools that make a difference.
          </p>
        </motion.section>

        {/* Values Section */}
        <section className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Our Values
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center p-6" data-testid="card-value-innovation">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Pushing boundaries with cutting-edge AI research and development
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6" data-testid="card-value-quality">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-chart-2/10 mb-4">
                <Code2 className="h-8 w-8 text-chart-2" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Quality</h3>
              <p className="text-sm text-muted-foreground">
                Delivering robust, well-tested solutions that exceed expectations
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6" data-testid="card-value-collaboration">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-chart-3/10 mb-4">
                <Users className="h-8 w-8 text-chart-3" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                Working closely with clients to understand and solve their challenges
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center p-6" data-testid="card-value-ethics">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-chart-4/10 mb-4">
                <Brain className="h-8 w-8 text-chart-4" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Ethics</h3>
              <p className="text-sm text-muted-foreground">
                Building AI responsibly with transparency and user privacy in mind
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-24 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/5 to-chart-2/5 border border-primary/10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-center">
            Our Vision
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-center" data-testid="text-vision">
            To become the leading AI development firm that transforms how people interact with technology, 
            making advanced AI capabilities accessible to businesses and individuals across all industries. 
            We envision a future where AI seamlessly enhances human creativity and productivity.
          </p>
        </motion.section>

        {/* Technology Stack Section */}
        <section className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Our Technology Stack
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          >
            {techStack.map(({ Icon, name }) => (
              <motion.div
                key={name}
                variants={fadeInUp}
                className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border border-card-border hover-elevate transition-all"
                data-testid={`card-tech-${name.toLowerCase()}`}
              >
                <Icon className="h-12 w-12" />
                <span className="font-medium text-sm">{name}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center text-muted-foreground mt-8"
          >
            And many more cutting-edge technologies to deliver the best solutions
          </motion.p>
        </section>
      </div>
    </div>
  );
}
