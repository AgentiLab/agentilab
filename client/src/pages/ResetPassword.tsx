import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordSchema, type ResetPasswordForm } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { AlertCircle } from "lucide-react";

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      username: "",
      jwtResetKey: "",
      newPassword: "",
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: ResetPasswordForm) => {
      const res = await apiRequest("POST", "/api/auth/reset-password", data);
      return await res.json() as { success: boolean; message: string };
    },
    onSuccess: () => {
      toast({
        title: "Password reset successful!",
        description: "You can now login with your new password.",
      });
      setLocation("/login");
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Password reset failed",
        description: error.message,
      });
    },
  });

  const onSubmit = (data: ResetPasswordForm) => {
    resetPasswordMutation.mutate(data);
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
            <h1 className="font-display text-3xl font-bold mb-2" data-testid="text-reset-password-title">
              Reset Password
            </h1>
            <p className="text-muted-foreground">
              Enter your username and JWT Reset Key to reset your password
            </p>
          </div>

          <div className="mb-6 p-3 rounded-lg bg-muted border border-border">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                You received your JWT Reset Key when you created your account. Keep it safe for future password resets.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        data-testid="input-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jwtResetKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>JWT Reset Key</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your JWT Reset Key"
                        {...field}
                        data-testid="input-jwt-reset-key"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
                        {...field}
                        data-testid="input-new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={resetPasswordMutation.isPending}
                data-testid="button-reset-password-submit"
              >
                {resetPasswordMutation.isPending ? "Resetting password..." : "Reset Password"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <a
                  href="/login"
                  className="text-primary hover:underline"
                  data-testid="link-login"
                >
                  Sign in
                </a>
              </p>
            </form>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
