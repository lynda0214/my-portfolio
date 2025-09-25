import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ProjectMatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface BlogMatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readTime?: string;
}

export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  content: string;
}

export function getContentByType<T>(type: 'projects' | 'blog'): ContentItem<T>[] {
  const contentPath = path.join(contentDirectory, type);
  
  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const files = fs.readdirSync(contentPath);
  
  const content = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(contentPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        slug: file.replace('.mdx', ''),
        frontmatter: data as T,
        content,
      };
    })
    .sort((a, b) => {
      const dateA = new Date((a.frontmatter as any).date);
      const dateB = new Date((b.frontmatter as any).date);
      return dateB.getTime() - dateA.getTime();
    });

  return content;
}

export function getContentBySlug<T>(type: 'projects' | 'blog', slug: string): ContentItem<T> | null {
  try {
    const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      slug,
      frontmatter: data as T,
      content,
    };
  } catch (error) {
    return null;
  }
}

export function getAllSlugs(type: 'projects' | 'blog'): string[] {
  const contentPath = path.join(contentDirectory, type);
  
  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const files = fs.readdirSync(contentPath);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}

