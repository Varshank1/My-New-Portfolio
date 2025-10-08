import React from 'react';
import { ExternalLink, Badge, CheckCircle, Clock } from 'lucide-react';

const Projects = ({ projects }) => {
  if (!projects || projects.length === 0) return <div className="py-20 bg-gray-900 animate-pulse"></div>;

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'completed 2025':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'ongoing':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <Badge className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'completed 2025':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'data science capstone':
        return '📊';
      case 'business operations':
        return '⚙️';
      case 'data visualization':
        return '📈';
      default:
        return '💼';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gray-900 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured <span className="text-yellow-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Showcasing real-world applications of business strategy and data science
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 overflow-hidden group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Project Header */}
              <div className="p-8 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(project.category)}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(project.status)}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-yellow-400 mb-3 group-hover:text-yellow-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="px-8 py-4 bg-gray-700/50">
                <div className="mb-3">
                  <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-2">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Results */}
              <div className="p-8">
                <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-4">
                  Key Results:
                </h4>
                <div className="space-y-2">
                  {project.key_results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{result}</span>
                    </div>
                  ))}
                </div>

                {/* Status Badge */}
                <div className="mt-6 flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="ml-2">{project.status}</span>
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-yellow-400 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Interested in Collaborating?
            </h3>
            <p className="text-gray-800 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how my experience can help drive your next project to success
            </p>
            <button className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              Start a Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;