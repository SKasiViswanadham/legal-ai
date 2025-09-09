import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Target, 
  Heart, 
  Award,
  Users,
  Globe,
  ArrowRight,
  Linkedin,
  Twitter,
  Mail
} from 'lucide-react';

const AboutPage = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Former legal counsel with 15+ years experience. Harvard Law graduate passionate about making legal services accessible.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher and former Google engineer. PhD in Machine Learning from Stanford University.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      bio: 'Product strategist with background in legal tech. MBA from Wharton, formerly at LegalZoom.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'David Thompson',
      role: 'Lead AI Engineer',
      bio: 'NLP specialist with expertise in legal document processing. MS in Computer Science from MIT.',
      image: '/api/placeholder/300/300'
    }
  ];

  const values = [
    {
      icon: Scale,
      title: 'Justice & Accessibility',
      description: 'We believe everyone deserves access to legal understanding, regardless of their background or resources.'
    },
    {
      icon: Heart,
      title: 'Empathy & Support',
      description: 'We understand the stress of legal documents and strive to provide clarity and peace of mind.'
    },
    {
      icon: Award,
      title: 'Excellence & Accuracy',
      description: 'We maintain the highest standards of accuracy and reliability in our AI analysis.'
    },
    {
      icon: Globe,
      title: 'Innovation & Impact',
      description: 'We continuously innovate to democratize legal knowledge and create positive global impact.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'LegalAI was founded with the mission to democratize legal document understanding.'
    },
    {
      year: '2024',
      title: 'AI Model Launch',
      description: 'Released our first AI-powered legal document analysis tool with 95% accuracy.'
    },
    {
      year: '2024',
      title: '10K+ Documents',
      description: 'Analyzed over 10,000 legal documents, helping thousands of users understand their contracts.'
    },
    {
      year: '2025',
      title: 'Advanced Features',
      description: 'Launched fraud detection, risk assessment, and reply generation features.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
              About
              <span className="text-gradient"> LegalAI</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize legal document understanding through 
              the power of artificial intelligence, making legal knowledge accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">Our Mission</h2>
              </div>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Legal documents shouldn't be a barrier to understanding your rights and obligations. 
                Our mission is to bridge the gap between complex legal language and everyday comprehension, 
                empowering individuals and businesses to make informed decisions.
              </p>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                Through cutting-edge AI technology, we transform intimidating legal jargon into 
                clear, actionable insights that anyone can understand and act upon.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-12 text-center">
              <Scale className="h-24 w-24 text-blue-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Making Legal Knowledge Accessible
              </h3>
              <p className="text-slate-600">
                Since 2023, we've helped over 10,000 people understand their legal documents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-800">Our Values</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that guide everything we do at LegalAI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center space-y-4 p-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm inline-block">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-800">Meet Our Team</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A diverse team of legal experts, AI researchers, and product innovators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card hover-lift text-center">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-48 rounded-lg mb-6 flex items-center justify-center">
                  <Users className="h-16 w-16 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-800">Our Journey</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Key milestones in our mission to democratize legal document understanding
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg min-w-[100px] text-center">
                  {milestone.year}
                </div>
                <div className="card flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-slate-600">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Join Us in Our Mission
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Be part of the revolution that's making legal documents accessible to everyone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;