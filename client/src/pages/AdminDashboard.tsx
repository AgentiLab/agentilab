import { Route, Switch, Link, useLocation } from "wouter";
import { LogOut, FileText, Folder, LayoutDashboard, Menu, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AdminProjects from "./AdminProjects";
import AdminBlog from "./AdminBlog";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: Folder },
    { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return location === "/admin";
    return location.startsWith(href);
  };

  const NavigationContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      <nav className="px-3 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive(item.href) ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={onItemClick}
              data-testid={`button-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => {
            logout();
            onItemClick?.();
          }}
          data-testid="button-logout"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <SEO title="Admin Dashboard - AgentiLab.ai" />
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-muted/10">
        <h1 className="font-display text-lg font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          AgentiLab Admin
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
          data-testid="button-mobile-menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-6 pb-4">
            <SheetTitle className="font-display text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              AgentiLab Admin
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 relative h-[calc(100vh-80px)]">
            <NavigationContent onItemClick={() => setMobileMenuOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-border bg-muted/10 relative">
        <div className="p-6">
          <h1 className="font-display text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            AgentiLab Admin
          </h1>
        </div>
        <NavigationContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Switch>
          <Route path="/admin" component={AdminOverview} />
          <Route path="/admin/projects" component={AdminProjects} />
          <Route path="/admin/blog" component={AdminBlog} />
        </Switch>
      </main>
    </div>
  );
}

function AdminOverview() {
  const { toast } = useToast();
  
  const captureScreenshotsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/admin/capture-all-screenshots");
      return res.json();
    },
    onSuccess: (data: any) => {
      const successful = data.results.filter((r: any) => r.success).length;
      const failed = data.results.filter((r: any) => !r.success).length;
      
      toast({
        title: "Screenshots Captured",
        description: `${successful} successful, ${failed} failed. Check console for details.`,
      });
      console.log("Screenshot Results:", data.results);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to capture screenshots",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-display font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border border-border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Welcome</h3>
          <p className="text-muted-foreground">
            Manage your portfolio content from here.
          </p>
        </div>
        <Link href="/admin/projects">
          <div className="p-6 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Folder className="mr-2 h-5 w-5" />
              Projects
            </h3>
            <p className="text-muted-foreground">
              Create and manage portfolio projects
            </p>
          </div>
        </Link>
        <Link href="/admin/blog">
          <div className="p-6 border border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Blog Posts
            </h3>
            <p className="text-muted-foreground">
              Write and publish blog articles
            </p>
          </div>
        </Link>
        <div className="p-6 border border-border rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Camera className="mr-2 h-5 w-5" />
            Auto Screenshot
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">
            Capture live screenshots from project URLs
          </p>
          <Button
            onClick={() => captureScreenshotsMutation.mutate()}
            disabled={captureScreenshotsMutation.isPending}
            size="sm"
            className="w-full"
            data-testid="button-capture-screenshots"
          >
            {captureScreenshotsMutation.isPending ? "Capturing..." : "Capture All Screenshots"}
          </Button>
        </div>
      </div>
    </div>
  );
}
