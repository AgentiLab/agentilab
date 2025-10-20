import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { updateProfileSchema, type UpdateProfileForm, type User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { User as UserIcon, LogOut, Edit, Save, X, Mail, Phone, MapPin, MessageSquare, UserCircle, Image as ImageIcon } from "lucide-react";
import { Chatbot } from "@/components/Chatbot";
import ImagePlayground from "./ImagePlayground";

export default function ClientDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const { data: authData, isLoading } = useQuery<{ isAuthenticated: boolean; user: User | null }>({
    queryKey: ["/api/auth/check"],
  });

  useEffect(() => {
    if (!isLoading && (!authData?.isAuthenticated || !authData.user)) {
      setLocation("/login");
    }
  }, [authData, isLoading, setLocation]);

  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    values: authData?.user ? {
      firstName: authData.user.firstName,
      lastName: authData.user.lastName,
      email: authData.user.email,
      phone: authData.user.phone,
      address: authData.user.address,
      city: authData.user.city,
      state: authData.user.state,
      country: authData.user.country,
    } : undefined,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileForm) => {
      const res = await apiRequest("PUT", "/api/auth/profile", data);
      return await res.json() as { success: boolean; user: User };
    },
    onSuccess: () => {
      toast({
        title: "Profile updated!",
        description: "Your information has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/check"] });
      setIsEditing(false);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/auth/logout");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/check"] });
      setLocation("/login");
    },
  });

  const onSubmit = (data: UpdateProfileForm) => {
    updateProfileMutation.mutate(data);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!authData?.isAuthenticated || !authData.user) {
    return null;
  }

  const user = authData.user;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2" data-testid="text-dashboard-title">
                Client Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {user.firstName}!
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              data-testid="button-logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 gap-2">
              <TabsTrigger value="profile" data-testid="tab-profile">
                <UserCircle className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="chatbot" data-testid="tab-chatbot">
                <MessageSquare className="mr-2 h-4 w-4" />
                AI Chatbot
              </TabsTrigger>
              <TabsTrigger value="images" data-testid="tab-images">
                <ImageIcon className="mr-2 h-4 w-4" />
                Image Playground
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Summary Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Card className="p-6 h-full">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserIcon className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h2 className="font-display text-xl font-semibold mb-1" data-testid="text-user-fullname">
                            {user.firstName} {user.lastName}
                          </h2>
                          <p className="text-sm text-muted-foreground" data-testid="text-user-username">
                            @{user.username}
                          </p>
                        </div>
                        <div className="w-full space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span className="truncate" data-testid="text-user-email">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span data-testid="text-user-phone">{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate" data-testid="text-user-location">
                              {user.city}, {user.country}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Profile Details Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-2"
                  >
                    <Card className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-display text-2xl font-semibold">Profile Information</h2>
                        {!isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            data-testid="button-edit-profile"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                        )}
                      </div>

                      {isEditing ? (
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} data-testid="input-edit-firstname" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} data-testid="input-edit-lastname" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input type="email" {...field} data-testid="input-edit-email" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                      <Input type="tel" {...field} data-testid="input-edit-phone" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Street Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} data-testid="input-edit-address" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                      <Input {...field} data-testid="input-edit-city" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>State/Province</FormLabel>
                                    <FormControl>
                                      <Input {...field} data-testid="input-edit-state" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                      <Input {...field} data-testid="input-edit-country" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="flex gap-3 pt-4">
                              <Button
                                type="submit"
                                disabled={updateProfileMutation.isPending}
                                data-testid="button-save-profile"
                              >
                                <Save className="mr-2 h-4 w-4" />
                                {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setIsEditing(false);
                                  form.reset();
                                }}
                                data-testid="button-cancel-edit"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Form>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground mb-1">First Name</h3>
                              <p className="text-foreground" data-testid="text-display-firstname">{user.firstName}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Name</h3>
                              <p className="text-foreground" data-testid="text-display-lastname">{user.lastName}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground mb-1">Email</h3>
                              <p className="text-foreground" data-testid="text-display-email">{user.email}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone</h3>
                              <p className="text-foreground" data-testid="text-display-phone">{user.phone}</p>
                            </div>
                            <div className="md:col-span-2">
                              <h3 className="text-sm font-medium text-muted-foreground mb-1">Address</h3>
                              <p className="text-foreground" data-testid="text-display-address">
                                {user.address}<br />
                                {user.city}, {user.state}<br />
                                {user.country}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="p-6">
                    <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        className="justify-start h-auto py-4"
                        onClick={() => setLocation("/projects")}
                        data-testid="button-view-projects"
                      >
                        <div className="text-left">
                          <div className="font-semibold mb-1">View Projects</div>
                          <div className="text-sm text-muted-foreground">Explore our portfolio</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start h-auto py-4"
                        onClick={() => setLocation("/blog")}
                        data-testid="button-view-blog"
                      >
                        <div className="text-left">
                          <div className="font-semibold mb-1">Read Blog</div>
                          <div className="text-sm text-muted-foreground">Latest insights</div>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start h-auto py-4"
                        onClick={() => setLocation("/contact")}
                        data-testid="button-contact-us"
                      >
                        <div className="text-left">
                          <div className="font-semibold mb-1">Contact Us</div>
                          <div className="text-sm text-muted-foreground">Get in touch</div>
                        </div>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="chatbot" className="mt-6">
              <Chatbot />
            </TabsContent>

            <TabsContent value="images" className="mt-6">
              <ImagePlayground />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
