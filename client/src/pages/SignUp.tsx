import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { AlertCircle, CheckCircle2, Copy, Info } from "lucide-react";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [jwtResetKey, setJwtResetKey] = useState<string | null>(null);
  const [showKeyCopied, setShowKeyCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const res = await apiRequest("POST", "/api/auth/signup", formData);
      const data = await res.json() as { success: boolean; jwtResetKey: string; message: string };
      
      setJwtResetKey(data.jwtResetKey);
      toast({
        title: "Account created successfully!",
        description: "Please save your JWT Reset Key for password recovery.",
      });
      
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: error.message,
      });
    }
  };

  const copyResetKey = () => {
    if (jwtResetKey) {
      navigator.clipboard.writeText(jwtResetKey);
      setShowKeyCopied(true);
      setTimeout(() => setShowKeyCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "JWT Reset Key copied to clipboard",
      });
    }
  };

  const continueToDashboard = async () => {
    setIsRedirecting(true);
    // Invalidate auth cache to force re-check
    await queryClient.invalidateQueries({ queryKey: ["/api/auth/check"] });
    // Use full page reload to ensure session is properly loaded
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 100);
  };

  if (jwtResetKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-chart-3" />
              </div>
              <h2 className="font-display text-2xl font-bold">Account Created!</h2>
              <p className="text-sm text-muted-foreground">
                Your account has been successfully created. Please save your JWT Reset Key securely.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-muted border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">JWT Reset Key</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyResetKey}
                    data-testid="button-copy-reset-key"
                  >
                    {showKeyCopied ? (
                      <CheckCircle2 className="h-4 w-4 text-chart-3" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <code className="text-sm font-mono break-all" data-testid="text-jwt-reset-key">
                  {jwtResetKey}
                </code>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <p className="text-sm text-destructive">
                  Keep this key safe! You'll need it to reset your password if you forget it.
                </p>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={continueToDashboard}
              disabled={isRedirecting}
              data-testid="button-continue-dashboard"
            >
              {isRedirecting ? "Redirecting..." : "Continue to Dashboard"}
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold mb-2" data-testid="text-signup-title">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Join AgentiLab.ai and access your client dashboard
            </p>
          </div>

          <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-foreground mb-2">
                  <strong>Important:</strong> You'll receive a JWT Recovery Key after signup. This key is essential for password recovery.
                </p>
                <a
                  href="/jwt-recovery-info"
                  className="text-sm text-primary hover:underline font-medium inline-flex items-center gap-1"
                  data-testid="link-jwt-info"
                >
                  Learn more about JWT Recovery Key →
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Username</label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  disabled={isLoading}
                  data-testid="input-username"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Choose a strong password"
                  disabled={isLoading}
                  data-testid="input-password"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  disabled={isLoading}
                  data-testid="input-firstname"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                  disabled={isLoading}
                  data-testid="input-lastname"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={isLoading}
                  data-testid="input-email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  disabled={isLoading}
                  data-testid="input-phone"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Street Address</label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street"
                disabled={isLoading}
                data-testid="input-address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">City</label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                  disabled={isLoading}
                  data-testid="input-city"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium">State/Province</label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="NY"
                  disabled={isLoading}
                  data-testid="input-state"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">Country</label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="United States"
                  disabled={isLoading}
                  data-testid="input-country"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-signup-submit"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary hover:underline font-medium"
                data-testid="link-login"
              >
                Sign in
              </a>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
