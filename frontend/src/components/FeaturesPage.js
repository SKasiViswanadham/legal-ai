import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Shield, 
  FileText, 
  Calculator,
  MessageSquare,
  Eye,
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Lock
} from 'lucide-react';

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Document Analysis',
      description: 'Our advanced AI technology uses Gemini 2.0-flash model to analyze legal documents with unprecedented accuracy.',
      features: [
        'Natural language processing for complex legal text',
        'Document classification and categorization',
        'Contextual understanding of legal terminology',
        'Multi-language support for international documents'
      ],
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Comprehensive Risk Assessment',
      description: 'Identify potential risks and vulnerabilities in your legal documents before they become problems.',
      features: [
        'Risk level scoring (Low, Medium, High)',
        'Identification of problematic clauses',
        'Compliance checking against common standards',
        'Recommendations for risk mitigation'
      ],
      color: 'green'
    },
    {
      icon: AlertTriangle,
      title: 'Advanced Fraud Detection',
      description: 'Protect yourself from fraudulent documents with our sophisticated fraud detection algorithms.',
      features: [
        'Pattern recognition for suspicious elements',
        'Inconsistency detection in document structure',
        'Verification of standard legal formatting',
        'Red flag identification and alerts'
      ],
      color: 'red'
    },
    {
      icon: Eye,
      title: 'Plain English Explanations',
      description: 'Convert complex legal jargon into clear, understandable language that anyone can comprehend.',
      features: [
        'Term-by-term explanations',
        'Context-aware interpretations',
        'Visual highlights for important sections',
        'Simplified summaries for quick understanding'
      ],
      color: 'purple'
    },
    {
      icon: Calculator,
      title: 'Automatic Financial Calculations',
      description: 'Extract and calculate financial information from contracts, loans, and other financial documents.',
      features: [
        'Interest rate calculations',
        'Payment schedule analysis',
        'Fee and penalty identification',
        'Total cost projections'
      ],
      color: 'indigo'
    },
    {
      icon: MessageSquare,
      title: 'Professional Reply Generation',
      description: 'Generate professional responses and correspondence based on your document analysis.',
      features: [
        'Context-aware letter drafting',
        'Professional tone and formatting',
        'Customizable response templates',
        'Multi-format output options'
      ],
      color: 'orange'
    }
  ];

  const additionalFeatures = [
    {
      icon: Clock,
      title: 'Lightning Fast Processing',
      description: 'Get comprehensive analysis results in under 5 minutes'
    },
    {
      icon: Globe,
      title: 'Multiple File Formats',
      description: 'Support for PDF, Word, and text documents'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your documents are encrypted and never stored permanently'
    },
    {
      icon: Zap,
      title: '24/7 Availability',
      description: 'Access our AI analysis tools anytime, anywhere'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
              Powerful Features for
              <span className="text-gradient block">Legal Document Analysis</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover all the advanced features that make LegalAI the most comprehensive 
              legal document analysis platform available today.
            </p>
            <Link to="/login" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              Try All Features Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`bg-${feature.color}-100 p-4 rounded-xl`}>
                        <Icon className={`h-8 w-8 text-${feature.color}-600`} />
                      </div>
                      <h2 className="text-3xl font-bold text-slate-800">
                        {feature.title}
                      </h2>
                    </div>
                    
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-start space-x-3">
                          <CheckCircle className={`h-5 w-5 text-${feature.color}-600 mt-0.5 flex-shrink-0`} />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover-lift">
                      <div className={`bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-xl p-12 text-center`}>
                        <Icon className={`h-24 w-24 text-${feature.color}-600 mx-auto mb-4`} />
                        <h3 className="text-xl font-semibold text-slate-800">
                          Interactive Demo
                        </h3>
                        <p className="text-slate-600 mt-2">
                          Try this feature with sample documents
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-800">
              And Much More
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Additional features that make LegalAI the complete solution for legal document analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center space-y-4 p-6">
                  <div className="bg-blue-100 p-4 rounded-xl inline-block">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Experience All Features Today
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Start your free trial and explore every powerful feature LegalAI has to offer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Start Free Trial
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

export default FeaturesPage;