import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Shield, Key, Lock, AlertTriangle } from "lucide-react";

export default function JwtRecoveryInfo() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => setLocation("/signup")}
            className="mb-6"
            data-testid="button-back-to-signup"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign Up
          </Button>

          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid="text-jwt-info-title">
              JWT Recovery Key Explained
            </h1>
            <p className="text-xl text-muted-foreground">
              Understanding your password recovery system
            </p>
          </div>

          <div className="space-y-6">
            {/* What is it */}
            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-2">What is a JWT Recovery Key?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A JWT (JSON Web Token) Recovery Key is a unique, secure code generated specifically for your account when you sign up. 
                    It acts as a master key to reset your password if you ever forget it.
                  </p>
                </div>
              </div>
            </Card>

            {/* How it works */}
            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-chart-2/10">
                  <Shield className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-2">How Does It Work?</h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>When you create your account:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Our system generates a unique 32-character recovery key</li>
                      <li>This key is displayed <strong>only once</strong> after successful registration</li>
                      <li>You save this key in a secure location</li>
                      <li>If you forget your password, you use this key to reset it</li>
                    </ol>
                  </div>
                </div>
              </div>
            </Card>

            {/* Security benefits */}
            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-chart-3/10">
                  <Lock className="h-6 w-6 text-chart-3" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-2">Why This System?</h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    <p>This recovery method offers several advantages:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-chart-3 mt-1">✓</span>
                        <span><strong>No email dependency:</strong> Works even if you lose access to your email</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-chart-3 mt-1">✓</span>
                        <span><strong>Maximum security:</strong> Only you have the recovery key</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-chart-3 mt-1">✓</span>
                        <span><strong>Instant recovery:</strong> Reset your password immediately</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-chart-3 mt-1">✓</span>
                        <span><strong>Privacy first:</strong> No personal information needed for recovery</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* Superior Security */}
            <Card className="p-6 md:p-8 border-chart-3/20 bg-chart-3/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-chart-3/10">
                  <Shield className="h-6 w-6 text-chart-3" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-2 text-chart-3">Superior Security Over Third-Party Providers</h2>
                  <div className="text-foreground leading-relaxed space-y-4">
                    <p>
                      <strong>This authentication system is the most secure option available.</strong> Unlike third-party authentication providers (Google, Facebook, Auth0, etc.), our JWT-based recovery system eliminates the risk of data breaches through external services.
                    </p>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Why Third-Party Providers Are Risky:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-1">⚠</span>
                          <span><strong>Data Breach Vulnerability:</strong> When third-party providers experience security breaches, millions of user accounts can be compromised simultaneously</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-1">⚠</span>
                          <span><strong>Data Leakage:</strong> Your personal information is shared with and stored by external companies, increasing exposure points</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-1">⚠</span>
                          <span><strong>Lack of Control:</strong> You depend on third-party security measures that you cannot audit or verify</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-destructive mt-1">⚠</span>
                          <span><strong>Privacy Concerns:</strong> Third parties can track your activities across multiple platforms</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">Our JWT System Advantages:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-chart-3 mt-1">✓</span>
                          <span><strong>Zero External Dependencies:</strong> Your authentication data stays entirely within our secure infrastructure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-chart-3 mt-1">✓</span>
                          <span><strong>No Data Sharing:</strong> Your information is never transmitted to or stored by third parties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-chart-3 mt-1">✓</span>
                          <span><strong>Complete Control:</strong> You alone possess the recovery key - no external provider can access it</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-chart-3 mt-1">✓</span>
                          <span><strong>Reduced Attack Surface:</strong> Fewer integration points means fewer potential vulnerabilities</span>
                        </li>
                      </ul>
                    </div>

                    <p className="pt-2 font-medium">
                      By using our JWT-based authentication, you benefit from enterprise-grade security without the inherent risks of third-party provider integrations.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Important notes */}
            <Card className="p-6 md:p-8 border-destructive/20 bg-destructive/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-semibold mb-2 text-destructive">Important Notes</h2>
                  <div className="text-foreground leading-relaxed space-y-3">
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">⚠</span>
                        <span><strong>Save it immediately:</strong> The recovery key is shown only once during signup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">⚠</span>
                        <span><strong>Keep it secure:</strong> Store it in a password manager or secure note</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">⚠</span>
                        <span><strong>Don't share it:</strong> Never give your recovery key to anyone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-destructive mt-1">⚠</span>
                        <span><strong>No recovery if lost:</strong> If you lose both your password and recovery key, account recovery is not possible</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>

            {/* How to use */}
            <Card className="p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold mb-4">How to Reset Your Password</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>If you forget your password, follow these steps:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Go to the <a href="/reset-password" className="text-primary hover:underline">Password Reset</a> page</li>
                  <li>Enter your username</li>
                  <li>Enter your JWT Recovery Key</li>
                  <li>Enter your new password</li>
                  <li>Submit the form to reset your password</li>
                </ol>
                <p className="pt-2">
                  You'll be able to log in immediately with your new password.
                </p>
              </div>
            </Card>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                className="flex-1"
                onClick={() => setLocation("/signup")}
                data-testid="button-continue-signup"
              >
                Continue to Sign Up
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setLocation("/login")}
                data-testid="button-go-login"
              >
                Already have an account? Login
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
