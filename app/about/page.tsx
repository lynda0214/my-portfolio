import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | My Portfolio',
  description: 'Learn more about me, my background, and my interests.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto md:mx-0 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Your Photo</span>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About Me</h1>
            
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Hello! I'm a passionate developer with a love for creating innovative solutions 
                and beautiful user experiences. With expertise in modern web technologies, 
                I enjoy tackling complex problems and turning ideas into reality.
              </p>
              
              <p>
                My journey in technology started several years ago, and since then I've been 
                continuously learning and growing. I specialize in full-stack development 
                with a particular focus on React, Next.js, and modern JavaScript frameworks.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open source projects, or sharing my knowledge through blog posts and 
                community involvement.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skills & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
                  'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Git'
                ].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Let's Connect</h2>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a 
                  href="https://linkedin.com" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a 
                  href="mailto:hello@example.com" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

