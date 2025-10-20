import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Clock, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import type { BlogPost } from "@shared/schema";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Blog() {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Blog - AgentiLab.ai"
        description="Insights, articles, and thoughts on AI development, machine learning, and the future of artificial intelligence from the AgentiLab.ai team."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6" data-testid="heading-blog">
              Insights & <span className="text-primary">Ideas</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-testid="text-blog-subtitle">
              Exploring the frontier of AI development, one article at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={fadeInUp}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="group h-full overflow-hidden border-border hover:border-primary transition-all duration-300 hover-elevate cursor-pointer" data-testid={`card-blog-${post.slug}`}>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1" data-testid={`text-blog-date-${post.slug}`}>
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1" data-testid={`text-blog-readtime-${post.slug}`}>
                        <Clock className="h-4 w-4" />
                        {post.readTimeMinutes} min read
                      </span>
                    </div>
                    
                    <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors" data-testid={`text-blog-title-${post.slug}`}>
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3" data-testid={`text-blog-excerpt-${post.slug}`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-chart-2 text-xs font-medium"
                          data-testid={`badge-tag-${post.slug}-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
