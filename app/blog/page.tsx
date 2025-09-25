import { Metadata } from 'next';
import Link from 'next/link';
import { getContentByType, BlogMatter } from '../../lib/mdx';

export const metadata: Metadata = {
  title: 'Blog | My Portfolio',
  description: 'Thoughts, tutorials, and insights about development and technology.',
};

export default function BlogPage() {
  const articles = getContentByType<BlogMatter>('blog');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about development, technology, and everything in between.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No articles found. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {articles.map((article) => (
            <article key={article.slug} className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{article.frontmatter.author}</span>
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
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                <Link 
                  href={`/blog/${article.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {article.frontmatter.title}
                </Link>
              </h2>

              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                {article.frontmatter.description}
              </p>

              <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                  {article.frontmatter.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/blog/${article.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

