import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import type { BlogPost } from "@shared/schema";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", params?.slug],
    enabled: !!params?.slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading blog post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button variant="outline" data-testid="button-back-to-blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${post.title} - AgentiLab.ai Blog`}
        description={post.excerpt}
        ogType="article"
        ogImage={post.coverImage}
      />

      {/* Hero Section with Cover Image */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
          data-testid={`img-blog-cover-${post.slug}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </section>

      {/* Article Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp}>
            <Link href="/blog">
              <Button variant="ghost" className="mb-8" data-testid="button-back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4" data-testid={`heading-blog-title-${post.slug}`}>
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <span className="flex items-center gap-2" data-testid={`text-blog-author-${post.slug}`}>
                  By {post.author}
                </span>
                <span className="flex items-center gap-2" data-testid={`text-blog-date-${post.slug}`}>
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2" data-testid={`text-blog-readtime-${post.slug}`}>
                  <Clock className="h-4 w-4" />
                  {post.readTimeMinutes} min read
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-chart-2 text-sm font-medium"
                    data-testid={`badge-tag-${post.slug}-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg text-muted-foreground" data-testid={`text-blog-excerpt-${post.slug}`}>
                {post.excerpt}
              </p>
            </header>

            {/* Article Body */}
            <article 
              className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-4 prose-p:leading-7 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-ul:my-6 prose-ol:my-6 prose-li:my-2 prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-strong:text-foreground" 
              data-testid={`content-blog-${post.slug}`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-border">
              <Link href="/blog">
                <Button variant="outline" data-testid="button-back-to-blog-footer">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Posts
                </Button>
              </Link>
            </footer>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
