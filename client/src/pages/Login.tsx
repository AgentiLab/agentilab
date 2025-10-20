import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Please enter both username and password",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await apiRequest("POST", "/api/auth/login", {
        username,
        password,
      });
      
      const data = await res.json();
      
      // Invalidate auth cache to force re-check
      await queryClient.invalidateQueries({ queryKey: ["/api/auth/check"] });
      
      toast({
        title: "Login successful!",
        description: "Redirecting to dashboard...",
      });
      
      // Use full page reload to ensure session is properly loaded
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
      
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid username or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-bold mb-2" data-testid="text-login-title">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your client dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                data-testid="input-username"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                data-testid="input-password"
                required
              />
            </div>

            <div className="flex items-center justify-end">
              <a
                href="/reset-password"
                className="text-sm text-primary hover:underline"
                data-testid="link-reset-password"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-login-submit"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-primary hover:underline font-medium"
                data-testid="link-signup"
              >
                Sign up
              </a>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
