import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";

export default function Subscribe() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4" data-testid="text-subscribe-header">
              Abonnement Premium AgentiLab.ai
            </h1>
            <p className="text-muted-foreground text-lg">
              Débloquez tout le potentiel de nos services d'intelligence artificielle
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="font-display text-2xl font-semibold mb-6">Détails de l'abonnement</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Accès complet aux services AI</p>
                    <p className="text-sm text-muted-foreground">
                      Utilisez tous nos outils d'intelligence artificielle
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Support prioritaire</p>
                    <p className="text-sm text-muted-foreground">
                      Réponse garantie sous 24h
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Mises à jour régulières</p>
                    <p className="text-sm text-muted-foreground">
                      Accès aux nouvelles fonctionnalités en avant-première
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">API illimitée</p>
                    <p className="text-sm text-muted-foreground">
                      Aucune limite d'utilisation
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mb-8">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-lg font-medium">Total mensuel</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold" data-testid="text-price">39,99 $</span>
                    <span className="text-muted-foreground"> / mois</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Annulez à tout moment. Aucun engagement.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setLocation("/contact")} data-testid="button-contact-subscribe">
                  Nous contacter pour s'abonner
                </Button>
                <Button size="lg" variant="outline" onClick={() => setLocation("/client-dashboard")} data-testid="button-return-dashboard">
                  Retour au tableau de bord
                </Button>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
