import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, User, Home, Info, FolderOpen, BookOpen, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useQuery } from "@tanstack/react-query";

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const { data: authData } = useQuery<{ isAuthenticated: boolean; user: any }>({
    queryKey: ["/api/auth/check"],
  });

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/projects", label: "Projects", icon: FolderOpen },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              AgentiLab.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                <span
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            
            {authData?.isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="outline" size="sm" data-testid="button-nav-dashboard">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" data-testid="button-nav-login">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" data-testid="button-nav-signup">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            <ThemeToggle testId="button-theme-toggle-desktop" />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle testId="button-theme-toggle-mobile" />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu-toggle">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Navigate to different sections of the website</SheetDescription>
              </SheetHeader>
              
              {/* Header avec logo */}
              <div className="flex items-center gap-2 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <span className="font-display text-lg font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                  AgentiLab.ai
                </span>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    >
                      <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover-elevate ${
                          active
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                        <span className="text-base font-medium">
                          {link.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
                
              <div className="mt-6 pt-6 border-t border-border">
                {authData?.isAuthenticated ? (
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full rounded-xl h-12" data-testid="button-mobile-dashboard">
                      <User className="mr-2 h-5 w-5" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl h-12 text-base" data-testid="button-mobile-login">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setOpen(false)}>
                      <Button className="w-full rounded-xl h-12 text-base shadow-lg shadow-primary/20" data-testid="button-mobile-signup">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
