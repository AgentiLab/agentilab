import { Link } from "wouter";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* About Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">AgentiLab.ai</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building the future of AI software. We design, develop, and deploy
              intelligent systems that empower developers and creators worldwide.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" data-testid="link-footer-about">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/projects" data-testid="link-footer-projects">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Our Projects
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" data-testid="link-footer-contact">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/brand" data-testid="link-footer-brand">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Brand Identity
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/terms" data-testid="link-footer-terms">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Use
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" data-testid="link-footer-privacy">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/corporate" data-testid="link-footer-corporate">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Corporate Information
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/status" data-testid="link-footer-status">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    System Status
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/copyright" data-testid="link-footer-copyright">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Copyright Notice
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/agentilab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-github"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/company/agentilab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-linkedin"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/agentilab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-social-twitter"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
            <div className="space-y-2">
              <a
                href="mailto:contact@agentilab.ai"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                data-testid="link-email"
              >
                <Mail className="h-4 w-4" />
                contact@agentilab.ai
              </a>
              <a
                href="tel:+13673804910"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                data-testid="link-phone"
              >
                <Phone className="h-4 w-4" />
                +1 (367) 380-4910
              </a>
              <a
                href="https://wa.me/13673804910"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href="https://t.me/+13673804910"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                data-testid="link-telegram"
              >
                <SiTelegram className="h-4 w-4" />
                Telegram
              </a>
              <div className="text-sm text-muted-foreground flex items-start gap-2" data-testid="text-address">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>1820 rue des intendants, local 218<br />Québec, Canada, G1J 5C2</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} AgentiLab.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
