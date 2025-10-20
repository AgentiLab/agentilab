import { motion } from "framer-motion";
import { Building2, MapPin, Mail, Phone, User, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function CorporateInfo() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <SEO
        title="Corporate Information - AgentiLab Technologies Inc."
        description="Corporate information, head office address, and organization details for AgentiLab Technologies Inc., a software development company based in Quebec, Canada."
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="text-corporate-title">
              Corporate Information
            </h1>
            <p className="text-xl text-muted-foreground">
              Société de développement de logiciels
            </p>
          </div>

          {/* Company Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-8">
              <h2 className="font-display text-2xl font-semibold mb-4">Company Name</h2>
              <p className="text-lg" data-testid="text-company-name">
                AgentiLab Technologies Inc.
              </p>
            </Card>
          </motion.div>

          {/* Head Office */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="p-8">
              <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Head Office Address
              </h2>
              <div className="space-y-1" data-testid="text-head-office">
                <p className="text-lg">1820 Rue Des Intendants, Unit 218</p>
                <p className="text-lg">Quebec, QC, Canada, G1J 5C2</p>
              </div>
            </Card>
          </motion.div>

          {/* Organization Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <Card className="p-8">
              <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                Organization Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Jurisdiction</h3>
                  <p className="text-lg" data-testid="text-jurisdiction">Quebec</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Person */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8">
              <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Contact Information
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2" data-testid="text-contact-name">
                    Simon-Pierre Boucher
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid="text-contact-role">
                    Director, Shareholder, Président
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <a
                      href="mailto:spbou4@protonmail.com"
                      className="text-primary hover:underline"
                      data-testid="link-contact-email"
                    >
                      spbou4@protonmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <a
                      href="tel:+13673804910"
                      className="text-primary hover:underline"
                      data-testid="link-contact-phone"
                    >
                      +1 367 380 4910
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div data-testid="text-contact-address">
                      <p>1820 Rue Des Intendants, Unit 218</p>
                      <p>Quebec, QC, Canada, G1J 5C2</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Residency:</span> Canadian Resident
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
