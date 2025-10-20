import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { 
  Sparkles, 
  MessageSquare, 
  Zap, 
  Shield, 
  TrendingUp, 
  Globe,
  Brain,
  ArrowRight,
  Check
} from "lucide-react";
import { SiOpenai, SiGoogle, SiMeta } from "react-icons/si";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const benefits = [
  {
    icon: MessageSquare,
    title: "Intelligent AI Chatbot",
    description: "Access to over 300 advanced AI models for all your conversations and professional needs.",
  },
  {
    icon: Brain,
    title: "Premium Models",
    description: "GPT-4, Claude, Gemini, Llama and many other cutting-edge models at your fingertips.",
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description: "Real-time streaming for smooth and natural conversations.",
  },
  {
    icon: Shield,
    title: "Secure Data",
    description: "Your conversations and data are protected with end-to-end encryption.",
  },
  {
    icon: TrendingUp,
    title: "Detailed Statistics",
    description: "Track your usage and optimize your interactions with advanced analytics.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Use our platform anywhere in the world, on all your devices.",
  },
];

const providers = [
  { name: "OpenAI", icon: SiOpenai, models: "GPT-4, GPT-3.5" },
  { name: "Google", icon: SiGoogle, models: "Gemini, PaLM" },
  { name: "Anthropic", icon: () => <span className="text-2xl font-bold">A</span>, models: "Claude" },
  { name: "Meta", icon: SiMeta, models: "Llama" },
];

const features = [
  "Unlimited conversations",
  "Complete saved history",
  "Fullscreen mode",
  "Export conversations",
  "Priority support",
  "Free updates",
];

export default function ClientBenefits() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Client Account Benefits - AgentiLab.ai"
        description="Discover the benefits of creating an AgentiLab client account: access to over 300 AI models, intelligent chatbot, and much more."
        ogType="website"
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Premium Client Account</span>
            </motion.div>

            <motion.h1
              {...fadeInUp}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              data-testid="text-benefits-title"
            >
              Unlock the Full Potential of AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Create your client account and access our intelligent chatbot with over <span className="font-bold text-primary">300 AI models</span> from the world's leading providers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/signup">
                <Button size="lg" className="min-w-[200px]" data-testid="button-signup">
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="min-w-[200px]" data-testid="button-login">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* AI Models Showcase */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Over 300 AI Models
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access the most advanced models from the world's leading artificial intelligence providers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {providers.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover-elevate h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <provider.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.models}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-sm text-muted-foreground">
              + Microsoft Phi, Mistral, Cohere, Amazon Bedrock, and many more...
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Client Account Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enjoy a premium experience with advanced features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover-elevate">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Included Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to maximize your productivity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Create your account for free and start exploring the world of AI today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="min-w-[200px]" data-testid="button-cta-signup">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="min-w-[200px]" data-testid="button-contact">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
