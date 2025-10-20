import { motion } from "framer-motion";
import { Shield, Scale, AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Copyright() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <SEO
        title="Copyright & Intellectual Property - AgentiLab.ai"
        description="Copyright notice and intellectual property rights for AgentiLab.ai. All content, code, and materials are protected under international copyright law."
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-6" data-testid="heading-copyright">
            Copyright & Intellectual Property
          </h1>
          
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Effective Date: October 14, 2025
          </p>

          {/* Copyright Notice */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-6 w-6 text-primary" />
              <h2 className="font-display text-2xl font-semibold">Copyright Notice</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                All content, materials, code, designs, graphics, logos, text, images, videos, software, applications, and other intellectual property available on AgentiLab.ai and its related projects are the exclusive property of <strong>AgentiLab Technologies Inc.</strong> and are protected by international copyright laws, including but not limited to the United States Copyright Act, the Berne Convention, and other applicable treaties.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                © 2024-2025 AgentiLab Technologies Inc. All rights reserved.
              </p>
            </div>
          </section>

          {/* Protected Materials */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">Protected Materials</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                The following materials are protected under copyright law:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>All source code, algorithms, and software applications</li>
                <li>Website design, layout, and user interface elements</li>
                <li>Blog posts, articles, documentation, and written content</li>
                <li>Graphics, logos, icons, and visual designs</li>
                <li>Project descriptions, technical specifications, and methodologies</li>
                <li>AI models, prompts, and training methodologies</li>
                <li>Database schemas and architectural designs</li>
                <li>Marketing materials and brand assets</li>
              </ul>
            </div>
          </section>

          {/* Usage Restrictions */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">Usage Restrictions</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unless explicitly authorized in writing by AgentiLab Technologies Inc., you may NOT:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Copy, reproduce, duplicate, or redistribute any content or code</li>
                <li>Modify, adapt, translate, or create derivative works</li>
                <li>Reverse engineer, decompile, or disassemble any software</li>
                <li>Use our intellectual property for commercial purposes</li>
                <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                <li>Frame, mirror, or republish our content on other websites</li>
                <li>Extract data through scraping, crawling, or automated means</li>
                <li>Use our branding, logos, or designs without authorization</li>
              </ul>
            </div>
          </section>

          {/* Legal Warning */}
          <section className="mb-12">
            <div className="p-6 rounded-lg bg-destructive/10 border border-destructive/20">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-4 text-destructive">Legal Warning</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong>Violation of these copyright terms will result in legal action.</strong> Unauthorized use, reproduction, or distribution of our intellectual property constitutes copyright infringement and may subject you to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                      <li><strong>Civil litigation</strong> with claims for damages, including actual damages and statutory damages up to $150,000 per work infringed</li>
                      <li><strong>Injunctive relief</strong> requiring immediate cessation of infringing activities</li>
                      <li><strong>Attorney fees and court costs</strong> as provided by copyright law</li>
                      <li><strong>Criminal prosecution</strong> in cases of willful infringement for commercial advantage or private financial gain</li>
                      <li><strong>Seizure and destruction</strong> of infringing materials</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      We actively monitor for copyright violations and will pursue all available legal remedies to protect our intellectual property rights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Permitted Use */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">Permitted Use</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may view and interact with our website and applications for personal, non-commercial use only. You may also:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Share links to our content on social media with proper attribution</li>
                <li>Quote brief excerpts in articles or reviews with proper citation</li>
                <li>Use our services as intended through the provided user interfaces</li>
              </ul>
            </div>
          </section>

          {/* DMCA Policy */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">DMCA Takedown Notice</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>A description of the copyrighted work you claim has been infringed</li>
                <li>The location of the infringing material on our website</li>
                <li>Your contact information (address, phone, email)</li>
                <li>A statement of good faith belief that the use is unauthorized</li>
                <li>A statement under penalty of perjury that the information is accurate</li>
                <li>Your physical or electronic signature</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Contact our Copyright Agent at: <a href="mailto:legal@agentilab.ai" className="text-primary hover:underline">legal@agentilab.ai</a>
              </p>
            </div>
          </section>

          {/* Licensing Inquiries */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">Licensing & Permissions</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                If you wish to use our intellectual property for purposes not covered by fair use, please contact us to discuss licensing arrangements. We may grant permissions on a case-by-case basis for appropriate uses.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                For licensing inquiries, contact: <a href="mailto:licensing@agentilab.ai" className="text-primary hover:underline">licensing@agentilab.ai</a>
              </p>
            </div>
          </section>

          {/* Updates */}
          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this copyright notice at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                For questions about copyright, permissions, or licensing:
              </p>
              <div className="mt-4 p-4 bg-card rounded-lg border border-border">
                <p className="font-medium mb-2">AgentiLab Technologies Inc.</p>
                <p className="text-muted-foreground">Legal Department</p>
                <p className="text-muted-foreground">Email: <a href="mailto:legal@agentilab.ai" className="text-primary hover:underline">legal@agentilab.ai</a></p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
