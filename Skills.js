import React from 'react';

const Skills = ({ skills }) => {
  if (!skills || skills.length === 0) return <div className="py-20 bg-gray-900 animate-pulse"></div>;

  const iconMap = {
    '👥': '👥',
    '💻': '💻', 
    '🎯': '🎯'
  };

  return (
    <section id="skills" className="py-20 bg-gray-900 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Skills & <span className="text-yellow-400">Expertise</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A unique blend of business acumen, technical proficiency, and leadership capabilities
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, index) => (
            <div
              key={category.id}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105 group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">
                  {iconMap[category.icon] || category.icon}
                </div>
                <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  {category.category_name}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="bg-gray-700 px-4 py-3 rounded-lg text-gray-300 font-medium hover:bg-gray-600 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>

              {/* Decorative Border */}
              <div className="mt-6 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full group-hover:from-yellow-300 transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg mb-6">
            Ready to leverage these skills for your business transformation?
          </p>
          <button className="px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
            Let's Collaborate
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;