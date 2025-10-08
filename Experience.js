import React from 'react';
import { MapPin, Calendar, TrendingUp } from 'lucide-react';

const Experience = ({ experience }) => {
  if (!experience || experience.length === 0) return <div className="py-20 bg-gray-50 animate-pulse"></div>;

  return (
    <section id="experience" className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Professional <span className="text-yellow-400">Experience</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A track record of transforming businesses through strategic leadership and innovation
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className="relative"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Timeline Line */}
              {index !== experience.length - 1 && (
                <div className="absolute left-6 top-24 w-0.5 h-32 bg-yellow-400/30"></div>
              )}
              
              {/* Experience Card */}
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="grid lg:grid-cols-4 gap-6">
                    {/* Job Details */}
                    <div className="lg:col-span-3 space-y-4">
                      <div className="border-l-4 border-yellow-400 pl-6">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                          {exp.position}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {exp.start_date} - {exp.is_current ? 'Current' : exp.end_date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-3">
                        {exp.achievements.map((achievement, achIndex) => (
                          <div
                            key={achIndex}
                            className="flex items-start space-x-3 text-gray-700"
                          >
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
                            <p className="leading-relaxed">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlight Metric */}
                    {exp.highlight_metric && (
                      <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-end text-center lg:text-right">
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 w-full">
                          <TrendingUp className="w-8 h-8 text-yellow-400 mb-3 mx-auto lg:ml-auto lg:mr-0" />
                          <div className="text-4xl font-bold text-yellow-400 mb-2">
                            {exp.highlight_metric.value}
                          </div>
                          <div className="text-gray-600 font-medium text-sm">
                            {exp.highlight_metric.label}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 bg-gray-900 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready for the Next Challenge
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Looking to bring my experience to a forward-thinking organization focused on growth and innovation
          </p>
          <button className="px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
            Explore Opportunities
          </button>
        </div>
      </div>
    </section>
  );
};

export default Experience;