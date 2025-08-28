'use client';

import { useState, useEffect } from 'react';



function AboutSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "3D Dependency Mapping",
      description: "Visualize complex file relationships through stunning 3D flowcharts with interactive nodes and connections.",
      icon: "🌐",
      color: "blue-cyan"
    },
    {
      title: "Intelligent Bug Tracking",
      description: "AI-powered code analysis identifies errors and displays them directly within the 3D visualization.",
      icon: "🔍",
      color: "purple-pink"
    },
    {
      title: "Real-time Analysis",
      description: "Dynamic parsing of your codebase with instant updates as you modify and upload new files.",
      icon: "⚡",
      color: "green-teal"
    }
  ];

  const techStack = [
    { name: "Next.js", color: "bg-black text-white" },
    { name: "Node.js", color: "bg-green-600 text-white" },
    { name: "Express.js", color: "bg-gray-700 text-white" },
    { name: "Three.js", color: "bg-blue-600 text-white" },
    { name: "React", color: "bg-blue-500 text-white" }
  ];

  return (
    <div className="about-wrapper">
      {/* Blobs and particles */}
      <div className="background-effects">
        <div className="blob blob-top-right"></div>
        <div className="blob blob-bottom-left delay-2s"></div>
        <div className="blob blob-center delay-4s"></div>
        <div className="particle particle-1 delay-1s"></div>
        <div className="particle particle-2 delay-3s"></div>
        <div className="particle particle-3 delay-5s"></div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="container">
          {/* Header */}
          <div className={`section ${isVisible ? 'fade-in' : 'hidden'}`}>
            <div className="tagline">
              <h1><span className="emoji">About Our Project</span></h1>
              <span className="label"></span>
            </div>
            <h1 className="headline">
              Code Connectivity
              <span className="gradient-text">Visualizer</span>
            </h1>
            <p className="description">
              Transforming complex codebases into beautiful, interactive 3D visualizations that reveal 
              hidden connections and identify potential issues with unprecedented clarity.
            </p>
          </div>

          {/* Mission */}
          <div className={`section delay-300 ${isVisible ? 'fade-in' : 'hidden'}`}>
            <div className="card glass-card">
              <h2 className="subheading">Our Mission</h2>
              <p className="text">
                We believe that understanding code structure should not be a puzzle. Our innovative PBL project 
                combines cutting-edge 3D visualization technology with intelligent code analysis to create 
                an intuitive platform where developers can see, understand, and debug their projects like never before.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className={`section delay-500 ${isVisible ? 'fade-in' : 'hidden'}`}>
            <h2 className="subheading center">What Makes Us Special</h2>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`feature-card group ${activeFeature === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`icon ${feature.color}`}>{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.description}</p>
                  <div className={`glow ${feature.color}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className={`section delay-700 ${isVisible ? 'fade-in' : 'hidden'}`}>
            <div className="card steps-card">
              <h2 className="subheading center">How It Works</h2>
              <div className="steps-grid">
                {[
                  { step: '01', title: 'Upload Files', desc: 'Drop your project files into our secure platform' },
                  { step: '02', title: 'Parse & Analyze', desc: 'Our engine analyzes file dependencies and relationships' },
                  { step: '03', title: 'Generate 3D Map', desc: 'Creates interactive 3D visualization with nodes and connections' },
                  { step: '04', title: 'Identify Issues', desc: 'Highlights bugs and errors directly in the visual map' }
                ].map((item, index) => (
                  <div key={index} className="step">
                    <div className="step-number">{item.step}</div>
                    <h3 className="step-title">{item.title}</h3>
                    <p className="step-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className={`section delay-900 ${isVisible ? 'fade-in' : 'hidden'}`}>
            <h2 className="subheading center">Built With Modern Technology</h2>
            <div className="tech-stack">
              {techStack.map((tech, index) => (
                <div key={index} className={`tech-pill ${tech.color}`}>
                  {tech.name}
                </div>
              ))}
            </div>
            <p className="tech-desc">
              Leveraging the power of Next.js for seamless user experience, Node.js and Express.js for robust backend processing, 
              and Three.js for stunning 3D visualizations.
            </p>
          </div>

          {/* CTA */}
          <div className={`section delay-1100 ${isVisible ? 'fade-in' : 'hidden'}`}>
            <div className="card cta-card">
              <h2 className="subheading">Ready to Visualize Your Code?</h2>
              <p className="text">Experience the future of code visualization and debugging. Transform your development workflow today.</p>
              <div className="cta-buttons">
                <a href="#upload" className="btn primary">
                  Start Exploring
                </a>
                <a href="#demo" className="btn secondary">
                  Watch Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
