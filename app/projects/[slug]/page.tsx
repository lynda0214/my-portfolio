import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getContentBySlug, getAllSlugs, ProjectMatter } from '../../../lib/mdx';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('projects');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getContentBySlug<ProjectMatter>('projects', slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.frontmatter.title} | My Portfolio`,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getContentBySlug<ProjectMatter>('projects', slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link 
          href="/projects"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Projects
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-sm p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {project.frontmatter.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {project.frontmatter.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {project.frontmatter.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {project.frontmatter.github && (
                <a 
                  href={project.frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  View on GitHub
                </a>
              )}
              {project.frontmatter.demo && (
                <a 
                  href={project.frontmatter.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Published on {new Date(project.frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <MDXRemote source={project.content} />
        </div>
      </article>
    </div>
  );
}

