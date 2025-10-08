import React, { useState, useEffect, useCallback } from "react";
import "@/App.css";
import axios from "axios";

// Components
import Navigation from "@/components/Navigation/Navigation";
import Hero from "@/components/Portfolio/Hero";
import About from "@/components/Portfolio/About";
import Skills from "@/components/Portfolio/Skills";
import Experience from "@/components/Portfolio/Experience";
import Projects from "@/components/Portfolio/Projects";
import Contact from "@/components/Portfolio/Contact";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  // Portfolio data states
  const [personalInfo, setPersonalInfo] = useState(null);
  const [aboutInfo, setAboutInfo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Fetch portfolio data
  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      
      const [personalRes, aboutRes, skillsRes, experienceRes, projectsRes] = await Promise.all([
        axios.get(`${API}/portfolio/personal-info`),
        axios.get(`${API}/portfolio/about`),
        axios.get(`${API}/portfolio/skills`),
        axios.get(`${API}/portfolio/experience`),
        axios.get(`${API}/portfolio/projects`)
      ]);

      setPersonalInfo(personalRes.data);
      setAboutInfo(aboutRes.data);
      setSkills(skillsRes.data);
      setExperience(experienceRes.data);
      setProjects(projectsRes.data);
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (formData) => {
    try {
      await axios.post(`${API}/portfolio/contact`, formData);
      return true;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  };

  // Smooth scroll navigation
  const handleNavigation = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Handle CTA button clicks
  const handleViewWork = () => handleNavigation('projects');
  const handleGetInTouch = () => handleNavigation('contact');

  // Track active section on scroll
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
    
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Load data on mount
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App relative">
      {/* Navigation */}
      <Navigation 
        activeSection={activeSection}
        onNavigate={handleNavigation}
      />

      {/* Hero Section */}
      <div id="hero">
        <Hero
          personalInfo={personalInfo}
          onViewWork={handleViewWork}
          onGetInTouch={handleGetInTouch}
        />
      </div>

      {/* About Section */}
      <div id="about">
        <About aboutInfo={aboutInfo} />
      </div>

      {/* Skills Section */}
      <div id="skills">
        <Skills skills={skills} />
      </div>

      {/* Experience Section */}
      <div id="experience">
        <Experience experience={experience} />
      </div>

      {/* Projects Section */}
      <div id="projects">
        <Projects projects={projects} />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact
          personalInfo={personalInfo}
          onSubmitMessage={handleContactSubmit}
        />
      </div>

      {/* Made with Emergent Badge */}
      <div className="fixed bottom-4 right-4 z-40">
        <a
          href="https://app.emergent.sh/?utm_source=emergent-badge"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors shadow-lg border border-gray-700"
        >
          Made with Emergent
        </a>
      </div>
    </div>
  );
}

export default App;
