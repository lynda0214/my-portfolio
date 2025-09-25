import { Metadata } from 'next';
import Link from 'next/link';
import { getContentByType, ProjectMatter } from '../../lib/mdx';

export const metadata: Metadata = {
  title: 'Projects | My Portfolio',
  description: 'A collection of my projects and work.',
};

export default function ProjectsPage() {
  const projects = getContentByType<ProjectMatter>('projects');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Here's a collection of projects I've worked on. Each one represents a unique 
          challenge and learning experience.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {project.frontmatter.image && (
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
              )}
              
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.frontmatter.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.frontmatter.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.frontmatter.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </Link>
                  
                  <div className="flex space-x-3">
                    {project.frontmatter.github && (
                      <a 
                        href={project.frontmatter.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        GitHub
                      </a>
                    )}
                    {project.frontmatter.demo && (
                      <a 
                        href={project.frontmatter.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(project.frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

