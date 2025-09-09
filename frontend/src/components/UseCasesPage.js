import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  CreditCard, 
  FileText, 
  Shield,
  Building,
  Users,
  Car,
  Heart,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Calculator,
  Eye
} from 'lucide-react';

const UseCasesPage = () => {
  const useCases = [
    {
      icon: Home,
      title: 'Real Estate Documents',
      description: 'Analyze leases, purchase agreements, and rental contracts',
      examples: [
        'Residential lease agreements',
        'Commercial property contracts',
        'Purchase and sale agreements',
        'Property management contracts'
      ],
      benefits: [
        'Identify hidden fees and unusual clauses',
        'Understand payment terms and responsibilities',
        'Detect potentially fraudulent agreements',
        'Calculate total costs and financial obligations'
      ],
      color: 'green',
      testimonial: {
        quote: "LegalAI caught a hidden fee clause in my lease that would have cost me $500 extra per month.",
        author: "Jennifer M., Tenant"
      }
    },
    {
      icon: Briefcase,
      title: 'Employment Contracts',
      description: 'Review job offers, NDAs, and employment agreements',
      examples: [
        'Employment offer letters',
        'Non-disclosure agreements',
        'Non-compete clauses',
        'Severance agreements'
      ],
      benefits: [
        'Understand compensation and benefits clearly',
        'Identify restrictive clauses',
        'Know your rights and obligations',
        'Negotiate better terms with confidence'
      ],
      color: 'blue',
      testimonial: {
        quote: "The AI analysis helped me understand a complex non-compete clause and negotiate better terms.",
        author: "David K., Software Engineer"
      }
    },
    {
      icon: CreditCard,
      title: 'Financial Documents',
      description: 'Analyze loans, credit agreements, and financial contracts',
      examples: [
        'Personal loan agreements',
        'Mortgage documents',
        'Credit card terms',
        'Business financing contracts'
      ],
      benefits: [
        'Calculate true interest rates and costs',
        'Identify penalty clauses',
        'Understand payment schedules',
        'Compare different loan offers'
      ],
      color: 'purple',
      testimonial: {
        quote: "LegalAI helped me compare mortgage offers and saved me thousands in hidden fees.",
        author: "Maria S., Homebuyer"
      }
    },
    {
      icon: Building,
      title: 'Business Contracts',
      description: 'Review vendor agreements, partnerships, and service contracts',
      examples: [
        'Service level agreements',
        'Vendor contracts',
        'Partnership agreements',
        'Licensing deals'
      ],
      benefits: [
        'Assess business risks and liabilities',
        'Understand performance obligations',
        'Identify termination clauses',
        'Ensure favorable terms'
      ],
      color: 'indigo',
      testimonial: {
        quote: "Our team uses LegalAI to review all vendor contracts. It's saved us from several bad deals.",
        author: "Robert L., Business Owner"
      }
    },
    {
      icon: Shield,
      title: 'Insurance Policies',
      description: 'Understand coverage, exclusions, and policy terms',
      examples: [
        'Health insurance policies',
        'Auto insurance contracts',
        'Life insurance agreements',
        'Business liability policies'
      ],
      benefits: [
        'Understand what\'s covered and excluded',
        'Compare different policies',
        'Identify coverage gaps',
        'Know your rights during claims'
      ],
      color: 'red',
      testimonial: {
        quote: "I finally understand what my health insurance actually covers thanks to LegalAI's analysis.",
        author: "Susan T., Insurance Policyholder"
      }
    },
    {
      icon: FileText,
      title: 'Terms of Service & Privacy',
      description: 'Analyze website terms, privacy policies, and user agreements',
      examples: [
        'Website terms of service',
        'Privacy policies',
        'Software license agreements',
        'Subscription terms'
      ],
      benefits: [
        'Understand data usage and privacy rights',
        'Know cancellation and refund policies',
        'Identify unusual restrictions',
        'Make informed decisions about services'
      ],
      color: 'yellow',
      testimonial: {
        quote: "LegalAI revealed concerning data collection practices in a service I was considering.",
        author: "Alex P., Privacy-Conscious User"
      }
    }
  ];

  const industries = [
    {
      icon: Building,
      name: 'Real Estate',
      description: 'Property managers, agents, and investors'
    },
    {
      icon: Briefcase,
      name: 'Legal Services',
      description: 'Law firms and legal professionals'
    },
    {
      icon: Users,
      name: 'Small Business',
      description: 'Entrepreneurs and small business owners'
    },
    {
      icon: Car,
      name: 'Insurance',
      description: 'Insurance agencies and brokers'
    },
    {
      icon: Heart,
      name: 'Healthcare',
      description: 'Healthcare providers and administrators'
    },
    {
      icon: CreditCard,
      name: 'Financial Services',
      description: 'Banks, credit unions, and financial advisors'
    }
  ];

  const features = [
    {
      icon: Eye,
      title: 'Plain English Translation',
      description: 'Complex legal terms explained in simple language'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Assessment',
      description: 'Identify potential risks and concerning clauses'
    },
    {
      icon: Calculator,
      title: 'Financial Analysis',
      description: 'Calculate costs, fees, and financial obligations'
    },
    {
      icon: CheckCircle,
      title: 'Fraud Detection',
      description: 'Spot suspicious elements and potential fraud'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
              Legal Documents
              <span className="text-gradient block">Made Simple</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover how LegalAI helps people across different industries understand 
              and analyze their legal documents with confidence.
            </p>
            <Link to="/login" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
              Try With Your Document
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-800">
              Common Use Cases
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how LegalAI analyzes different types of legal documents
            </p>
          </div>

          <div className="space-y-16">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  
                  {/* Content */}
                  <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`bg-${useCase.color}-100 p-4 rounded-xl`}>
                        <Icon className={`h-8 w-8 text-${useCase.color}-600`} />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-800">
                        {useCase.title}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {useCase.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Document Types:</h4>
                        <ul className="space-y-2">
                          {useCase.examples.map((example, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <FileText className={`h-4 w-4 text-${useCase.color}-600 mt-0.5 flex-shrink-0`} />
                              <span className="text-slate-600 text-sm">{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {useCase.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <CheckCircle className={`h-4 w-4 text-${useCase.color}-600 mt-0.5 flex-shrink-0`} />
                              <span className="text-slate-600 text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className={`bg-${useCase.color}-50 rounded-lg p-6 border border-${useCase.color}-200`}>
                      <p className={`text-${useCase.color}-800 italic mb-3`}>
                        "{useCase.testimonial.quote}"
                      </p>
                      <p className={`text-${useCase.color}-700 font-medium text-sm`}>
                        — {useCase.testimonial.author}
                      </p>
                    </div>
                  </div>
                  
                  {/* Visual */}
                  <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="card hover-lift">
                      <div className={`bg-gradient-to-br from-${useCase.color}-100 to-${useCase.color}-200 rounded-xl p-12 text-center`}>
                        <Icon className={`h-24 w-24 text-${useCase.color}-600 mx-auto mb-6`} />
                        <h4 className="text-xl font-semibold text-slate-800 mb-2">
                          Try Sample Analysis
                        </h4>
                        <p className="text-slate-600 mb-6">
                          See how LegalAI analyzes {useCase.title.toLowerCase()}
                        </p>
                        <Link to="/login" className={`btn-primary bg-${useCase.color}-600 hover:bg-${useCase.color}-700`}>
                          Upload Sample Document
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-800">
              Powerful Analysis Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every document analysis includes these comprehensive features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center space-y-4">
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

      {/* Industries Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-800">
              Trusted Across Industries
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professionals in various industries rely on LegalAI for document analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div key={index} className="card hover-lift text-center">
                  <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {industry.name}
                  </h3>
                  <p className="text-slate-600">
                    {industry.description}
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
              Ready to Analyze Your Documents?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Upload your legal document and get comprehensive AI-powered analysis in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/features" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UseCasesPage;