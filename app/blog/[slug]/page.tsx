import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentBySlug, getAllSlugs, BlogMatter } from '../../../lib/mdx';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('blog');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getContentBySlug<BlogMatter>('blog', slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.frontmatter.title} | My Portfolio`,
    description: article.frontmatter.description,
  };
}

export default async function BlogArticlePage({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = getContentBySlug<BlogMatter>('blog', slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link 
          href="/blog"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Blog
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-sm p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.frontmatter.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {article.frontmatter.description}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4 sm:mb-0">
              <span className="font-medium">{article.frontmatter.author}</span>
              <span>•</span>
              <time>
                {new Date(article.frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {article.frontmatter.readTime && (
                <>
                  <span>•</span>
                  <span>{article.frontmatter.readTime}</span>
                </>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {article.frontmatter.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXRemote source={article.content} />
        </div>
      </article>
    </div>
  );
}

