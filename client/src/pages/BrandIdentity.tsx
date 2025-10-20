import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Palette, Type, Layout, Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const ColorSwatch = ({ color, name, hsl }: { color: string; name: string; hsl: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hsl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="group cursor-pointer"
      onClick={copyToClipboard}
      data-testid={`color-swatch-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div
        className={`h-24 rounded-lg border border-border mb-3 ${color}`}
        style={{ backgroundColor: color.startsWith('#') ? color : undefined }}
      />
      <div className="space-y-1">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-muted-foreground font-mono flex items-center gap-2">
          {hsl}
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </p>
      </div>
    </motion.div>
  );
};

const FontExample = ({ family, className, text }: { family: string; className: string; text: string }) => (
  <div className="space-y-2" data-testid={`font-example-${family.toLowerCase().replace(/\s+/g, '-')}`}>
    <p className="text-sm text-muted-foreground">{family}</p>
    <p className={`text-3xl ${className}`}>{text}</p>
  </div>
);

export default function BrandIdentity() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="Brand Identity - AgentiLab.ai"
        description="Explore the visual identity, design system, and brand guidelines of AgentiLab.ai. Learn about our colors, typography, and design principles."
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Brand Identity</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6" data-testid="heading-brand-identity">
              AgentiLab
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                {" "}Visual Identity
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              A modern, tech-forward design system built for innovation. 
              Explore the colors, typography, and principles that define our brand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Essence */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-center">
              Our Brand Essence
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              AgentiLab represents the fusion of artificial intelligence and software excellence. 
              Our visual identity reflects innovation, precision, and forward-thinking technology.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover-elevate" data-testid="card-principle-innovation">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Cutting-edge AI technology meets modern design principles to create experiences that feel futuristic yet familiar.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="card-principle-precision">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Layout className="h-5 w-5 text-primary" />
                    Precision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Every pixel, color, and interaction is carefully crafted to deliver clarity and purpose in our interfaces.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-elevate" data-testid="card-principle-excellence">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display">
                    <Palette className="h-5 w-5 text-primary" />
                    Excellence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Professional-grade design that reflects our commitment to building world-class AI applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Color Palette
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our carefully selected colors communicate trust, innovation, and energy. 
                  Click any color to copy its HSL value.
                </p>
              </div>

              {/* Primary Colors */}
              <div className="mb-12">
                <h3 className="font-display text-xl font-semibold mb-6">Primary Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <ColorSwatch
                    color="#3B82F6"
                    name="Primary Blue"
                    hsl="217 91% 60%"
                  />
                  <ColorSwatch
                    color="#14B8A6"
                    name="Accent Teal"
                    hsl="174 69% 53%"
                  />
                  <ColorSwatch
                    color="hsl(210 6% 10%)"
                    name="Dark Background"
                    hsl="210 6% 10%"
                  />
                  <ColorSwatch
                    color="hsl(217 16% 88%)"
                    name="Light Foreground"
                    hsl="217 16% 88%"
                  />
                </div>
              </div>

              {/* Semantic Colors */}
              <div>
                <h3 className="font-display text-xl font-semibold mb-6">Semantic Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <ColorSwatch
                    color="#10B981"
                    name="Success Green"
                    hsl="142 76% 36%"
                  />
                  <ColorSwatch
                    color="#F59E0B"
                    name="Warning Amber"
                    hsl="38 92% 50%"
                  />
                  <ColorSwatch
                    color="#DC2626"
                    name="Danger Red"
                    hsl="0 84% 48%"
                  />
                  <ColorSwatch
                    color="#8B5CF6"
                    name="Info Purple"
                    hsl="262 83% 58%"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Type className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Typography
                </h2>
                <p className="text-lg text-muted-foreground">
                  Three carefully selected typefaces for different purposes: impact, readability, and technical precision.
                </p>
              </div>

              <div className="space-y-8">
                <Card className="p-8">
                  <FontExample
                    family="Space Grotesk (Display)"
                    className="font-display font-bold"
                    text="Building the Future of AI"
                  />
                </Card>

                <Card className="p-8">
                  <FontExample
                    family="Inter (Sans-Serif)"
                    className="font-sans"
                    text="Exceptional readability for body text and user interfaces"
                  />
                </Card>

                <Card className="p-8">
                  <FontExample
                    family="JetBrains Mono (Monospace)"
                    className="font-mono"
                    text="const agentilab = 'AI Excellence';"
                  />
                </Card>
              </div>

              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Typography Guidelines:</strong> Use Space Grotesk for headings and hero text, 
                  Inter for body content and UI elements, and JetBrains Mono for code snippets and technical badges.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
                Design Principles
              </h2>

              <div className="space-y-6">
                <Card className="p-6 hover-elevate" data-testid="card-principle-dark-first">
                  <h3 className="font-display text-xl font-semibold mb-3">Dark Mode First</h3>
                  <p className="text-muted-foreground">
                    Our primary theme uses dark backgrounds to reduce eye strain, create premium aesthetics, 
                    and align with modern development tools that developers use daily.
                  </p>
                </Card>

                <Card className="p-6 hover-elevate" data-testid="card-principle-minimal-bold">
                  <h3 className="font-display text-xl font-semibold mb-3">Minimal Yet Bold</h3>
                  <p className="text-muted-foreground">
                    We embrace generous whitespace and bold typography to create visual impact without clutter. 
                    Every element has purpose and breathing room.
                  </p>
                </Card>

                <Card className="p-6 hover-elevate" data-testid="card-principle-accessible">
                  <h3 className="font-display text-xl font-semibold mb-3">Accessible by Default</h3>
                  <p className="text-muted-foreground">
                    WCAG AA contrast ratios, keyboard navigation, and semantic HTML ensure our interfaces 
                    are usable by everyone, regardless of ability.
                  </p>
                </Card>

                <Card className="p-6 hover-elevate" data-testid="card-principle-tech-forward">
                  <h3 className="font-display text-xl font-semibold mb-3">Tech-Forward Aesthetic</h3>
                  <p className="text-muted-foreground">
                    Subtle gradients, glass-morphism effects, and smooth animations create a modern, 
                    cutting-edge feel that reflects our AI-first approach to software development.
                  </p>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Usage */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Logo & Brand Name
              </h2>
              <div className="bg-background border border-border rounded-2xl p-12 mb-8">
                <h3 className="font-display text-6xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  AgentiLab.ai
                </h3>
              </div>
              <p className="text-muted-foreground">
                Our wordmark combines bold typography with a gradient effect from primary blue to teal, 
                symbolizing the flow of intelligence and innovation. The ".ai" extension reinforces our focus on artificial intelligence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-primary/10 via-background to-chart-2/10 border-primary/20 p-8 md:p-12 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Build with AgentiLab?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience our design system in action through our cutting-edge AI projects and applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild data-testid="button-view-projects">
                  <a href="/projects">View Our Projects</a>
                </Button>
                <Button size="lg" variant="outline" asChild data-testid="button-contact">
                  <a href="/contact">Get in Touch</a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
