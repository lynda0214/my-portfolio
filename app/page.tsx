import Link from 'next/link';
import { getContentByType, ProjectMatter, BlogMatter } from '../lib/mdx';

export default function Home() {
  const recentProjects = getContentByType<ProjectMatter>('projects').slice(0, 3);
  const recentArticles = getContentByType<BlogMatter>('blog').slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Hi, I'm <span className="text-blue-600">Your Name</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A passionate full-stack developer who loves creating innovative solutions 
            and beautiful user experiences. I specialize in React, Next.js, and modern web technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projects"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View My Projects
            </Link>
            <Link 
              href="/about"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
          <Link 
            href="/projects"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Projects →
          </Link>
        </div>
        
        {recentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentProjects.map((project) => (
              <div key={project.slug} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {project.frontmatter.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.frontmatter.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.frontmatter.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/projects/${project.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No projects found. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Recent Blog Posts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Articles →
          </Link>
        </div>
        
        {recentArticles.length > 0 ? (
          <div className="space-y-6">
            {recentArticles.map((article) => (
              <article key={article.slug} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                    <Link 
                      href={`/blog/${article.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {article.frontmatter.title}
                    </Link>
                  </h3>
                  <div className="text-sm text-gray-500">
                    {new Date(article.frontmatter.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {article.frontmatter.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {article.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/blog/${article.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No articles found. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="text-center bg-blue-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Let's Work Together
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          I'm always interested in new opportunities and exciting projects. 
          Whether you have a project in mind or just want to chat, I'd love to hear from you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:hello@example.com"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get In Touch
          </a>
          <Link 
            href="/about"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
