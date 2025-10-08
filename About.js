import React from 'react';

const About = ({ aboutInfo }) => {
  if (!aboutInfo) return <div className="py-20 bg-gray-50 animate-pulse"></div>;

  return (
    <section id="about" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-yellow-400">Me</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between business strategy and data science innovation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Journey Description */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {aboutInfo.journey_description}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                {aboutInfo.current_focus}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(aboutInfo.stats).map(([key, stat], index) => (
              <div
                key={key}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="border-l-4 border-yellow-400 pl-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium text-sm tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Preview */}
        <div className="mt-20 text-center">
          <div className="bg-gray-900 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-white mb-6">
              Skills & <span className="text-yellow-400">Expertise</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              A unique blend of business acumen, technical proficiency, and leadership capabilities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;