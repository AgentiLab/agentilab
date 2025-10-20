import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const COOKIE_CONSENT_KEY = "agentilab-cookie-consent";
const COOKIE_PREFERENCES_KEY = "agentilab-cookie-preferences";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }

    if (!consent) {
      setShowBanner(true);
    } else {
      setShowFloatingButton(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
    setShowBanner(false);
    setShowFloatingButton(true);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    savePreferences(essentialOnly);
    setShowBanner(false);
    setShowFloatingButton(true);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowSettings(false);
    setShowBanner(false);
    setShowFloatingButton(true);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
            data-testid="cookie-banner"
          >
            <div className="bg-card border border-border rounded-lg shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Cookie className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Cookie Preferences</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We use cookies to enhance your browsing experience and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                    <Link href="/privacy">
                      <span className="text-primary hover:underline">Privacy Policy</span>
                    </Link>{" "}
                    for more information.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={handleAcceptAll}
                      data-testid="button-accept-all"
                    >
                      Accept All
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleRejectAll}
                      data-testid="button-reject-all"
                    >
                      Reject All
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleOpenSettings}
                      data-testid="button-cookie-settings"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cookie Settings Button */}
      <AnimatePresence>
        {showFloatingButton && !showBanner && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleOpenSettings}
            className="fixed bottom-4 left-4 z-40 bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover-elevate active-elevate-2"
            data-testid="button-floating-cookie"
            aria-label="Cookie settings"
          >
            <Cookie className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-cookie-settings">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences. Essential cookies are required for the website to function and cannot be disabled.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Essential Cookies */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="essential" className="text-base font-medium">
                  Essential Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Required for the website to function properly. These cannot be disabled.
                </p>
              </div>
              <Switch
                id="essential"
                checked={preferences.essential}
                disabled
                data-testid="switch-essential"
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="analytics" className="text-base font-medium">
                  Analytics Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
                data-testid="switch-analytics"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="marketing" className="text-base font-medium">
                  Marketing Cookies
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Used to deliver personalized advertisements and track campaign performance.
                </p>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked })
                }
                data-testid="switch-marketing"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSettings(false)}
              className="flex-1"
              data-testid="button-cancel-settings"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="flex-1"
              data-testid="button-save-settings"
            >
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
