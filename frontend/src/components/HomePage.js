import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Brain, 
  Shield, 
  FileText, 
  Calculator,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Clock,
  Award,
  Zap,
  Eye,
  AlertTriangle
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI breaks down complex legal jargon into plain English summaries.',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Identifies potential risks and unusual clauses in your documents.',
      color: 'green'
    },
    {
      icon: AlertTriangle,
      title: 'Fraud Detection',
      description: 'Detects potential fraud indicators and suspicious elements.',
      color: 'red'
    },
    {
      icon: Calculator,
      title: 'Financial Calculations',
      description: 'Automatically calculates interest rates, payments, and fees.',
      color: 'purple'
    },
    {
      icon: Eye,
      title: 'Term Explanations',
      description: 'Get clear explanations of complex legal terms and clauses.',
      color: 'indigo'
    },
    {
      icon: MessageSquare,
      title: 'Reply Generation',
      description: 'Generate professional reply letters based on document analysis.',
      color: 'orange'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Small Business Owner',
      content: 'LegalAI saved me thousands in legal fees. I can now understand my contracts without needing a lawyer for every document.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Real Estate Agent',
      content: 'The fraud detection feature caught a suspicious clause in a lease agreement. This tool pays for itself.',
      rating: 5
    },
    {
      name: 'Emily Johnson',
      role: 'Freelance Consultant',
      content: 'Finally, I can review client contracts with confidence. The AI explanations are incredibly helpful.',
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Documents Analyzed' },
    { icon: Clock, value: '5 mins', label: 'Average Analysis Time' },
    { icon: Award, value: '99.7%', label: 'Accuracy Rate' },
    { icon: Zap, value: '24/7', label: 'Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-800 leading-tight">
                Transform Legal
                <span className="text-gradient block">Documents into</span>
                Clear Insights
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Upload any legal document and get instant AI-powered analysis, plain English summaries, 
                risk assessments, and fraud detection in minutes.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login" className="btn-primary text-lg px-8 py-4">
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/features" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
            </div>

            <div className="pt-8">
              <p className="text-sm text-slate-500 mb-4">
                Trusted by professionals worldwide
              </p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                {/* Placeholder for company logos */}
                <div className="bg-slate-200 h-8 w-24 rounded"></div>
                <div className="bg-slate-200 h-8 w-24 rounded"></div>
                <div className="bg-slate-200 h-8 w-24 rounded"></div>
                <div className="bg-slate-200 h-8 w-24 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-3">
                  <div className="bg-blue-50 p-4 rounded-xl inline-block">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                    <div className="text-slate-600">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              Powerful Features for Legal Analysis
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive legal document analysis 
              with features designed for professionals and individuals alike.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card hover-lift animate-slide-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className={`bg-${feature.color}-50 p-4 rounded-xl inline-block mb-4`}>
                    <Icon className={`h-8 w-8 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/features" className="btn-primary">
              View All Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get professional legal document analysis in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="bg-blue-100 p-6 rounded-full inline-block">
                <FileText className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800">1. Upload Document</h3>
              <p className="text-slate-600">
                Upload your legal document in PDF, Word, or text format
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-purple-100 p-6 rounded-full inline-block">
                <Brain className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800">2. AI Analysis</h3>
              <p className="text-slate-600">
                Our AI analyzes the document and identifies key information
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-green-100 p-6 rounded-full inline-block">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-800">3. Get Insights</h3>
              <p className="text-slate-600">
                Receive comprehensive analysis with summaries and recommendations
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/login" className="btn-primary">
              Try It Now - Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800">
              What Our Users Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of professionals who trust LegalAI for their document analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card hover-lift">
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-slate-800">{testimonial.name}</div>
                  <div className="text-slate-500 text-sm">{testimonial.role}</div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Legal Documents?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of professionals who use LegalAI to understand their legal documents better
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/pricing" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;