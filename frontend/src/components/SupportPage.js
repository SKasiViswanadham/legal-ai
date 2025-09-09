import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Search,
  BookOpen,
  Video,
  FileText,
  Users,
  ArrowRight
} from 'lucide-react';

const SupportPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I upload a document for analysis?',
          answer: 'Simply click on the "Upload" button in your dashboard or drag and drop your document into the upload area. We support PDF, Word (.docx), and text (.txt) files up to 10MB in size.'
        },
        {
          question: 'What types of legal documents can LegalAI analyze?',
          answer: 'LegalAI can analyze a wide variety of documents including contracts, leases, employment agreements, loan documents, terms of service, privacy policies, NDAs, and more. Our AI is trained on diverse legal document types.'
        },
        {
          question: 'How long does the analysis take?',
          answer: 'Most document analyses are completed within 30-60 seconds. Complex or longer documents may take up to 2-3 minutes. You\'ll receive a notification when your analysis is ready.'
        }
      ]
    },
    {
      category: 'Features & Functionality',
      questions: [
        {
          question: 'What is included in the document analysis?',
          answer: 'Our analysis includes: document classification, plain English summary, key terms explanation, risk assessment, fraud detection, financial calculations (if applicable), unusual clause identification, and suggested questions you might want to ask.'
        },
        {
          question: 'How accurate is the AI analysis?',
          answer: 'Our AI model achieves 99.7% accuracy in document analysis. However, LegalAI is designed to assist and inform, not replace professional legal advice. For critical legal decisions, always consult with a qualified attorney.'
        },
        {
          question: 'Can I generate reply letters?',
          answer: 'Yes! After analyzing your document, you can use our reply generation feature. Answer a few simple questions about your situation, and our AI will draft a professional response letter for you.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          question: 'How secure are my documents?',
          answer: 'We take security seriously. All documents are encrypted in transit and at rest. We use industry-standard security measures and never permanently store your documents after analysis. Your privacy is our priority.'
        },
        {
          question: 'Who can see my uploaded documents?',
          answer: 'Only you can access your documents and analysis results. Our system is designed with privacy by default, and we never share your documents with third parties or use them for training purposes.'
        },
        {
          question: 'How long do you keep my documents?',
          answer: 'We automatically delete uploaded documents from our servers within 24 hours of analysis completion. Analysis results are kept in your account until you choose to delete them.'
        }
      ]
    },
    {
      category: 'Billing & Plans',
      questions: [
        {
          question: 'Is there a free trial?',
          answer: 'Yes! New users get 3 free document analyses to try our service. No credit card required for the free trial.'
        },
        {
          question: 'Can I cancel my subscription anytime?',
          answer: 'Absolutely. You can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your current billing period.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied with our service, contact support for a full refund within 30 days of purchase.'
        }
      ]
    }
  ];

  const supportChannels = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Monday - Friday, 9 AM - 6 PM PST',
      action: 'Start Chat',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed questions via email',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: 'green'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      availability: 'Monday - Friday, 9 AM - 5 PM PST',
      action: 'Call Now',
      color: 'purple'
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: 'Knowledge Base',
      description: 'Comprehensive guides and tutorials',
      link: '#'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video walkthroughs',
      link: '#'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Technical documentation and API guides',
      link: '#'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Connect with other LegalAI users',
      link: '#'
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleFaq = (categoryIndex, questionIndex) => {
    const faqId = `${categoryIndex}-${questionIndex}`;
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
              How Can We
              <span className="text-gradient block">Help You?</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions, get in touch with our support team, 
              or explore our comprehensive resources.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 text-lg py-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Get in Touch</h2>
            <p className="text-lg text-slate-600">
              Choose the support channel that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <div key={index} className="card hover-lift text-center">
                  <div className={`bg-${channel.color}-100 p-4 rounded-xl inline-block mb-4`}>
                    <Icon className={`h-8 w-8 text-${channel.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {channel.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 mb-6">
                    <Clock className="h-4 w-4" />
                    <span>{channel.availability}</span>
                  </div>
                  <button className={`btn-primary bg-${channel.color}-600 hover:bg-${channel.color}-700`}>
                    {channel.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-800">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Find quick answers to the most common questions about LegalAI
            </p>
          </div>

          <div className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2">
                  {category.category}
                </h3>
                
                <div className="space-y-3">
                  {category.questions.map((faq, questionIndex) => {
                    const faqId = `${categoryIndex}-${questionIndex}`;
                    const isExpanded = expandedFaq === faqId;
                    
                    return (
                      <div key={questionIndex} className="bg-white rounded-lg shadow-sm">
                        <button
                          onClick={() => toggleFaq(categoryIndex, questionIndex)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-medium text-slate-800 pr-4">
                            {faq.question}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="px-6 pb-6 animate-fade-in">
                            <p className="text-slate-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">
                No results found for "{searchTerm}"
              </h3>
              <p className="text-slate-500 mb-6">
                Try a different search term or contact our support team for help.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn-secondary"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-800">
              Additional Resources
            </h2>
            <p className="text-lg text-slate-600">
              Explore our comprehensive collection of guides, tutorials, and documentation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <a
                  key={index}
                  href={resource.link}
                  className="card hover-lift text-center block"
                >
                  <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {resource.description}
                  </p>
                  <div className="text-blue-600 font-medium flex items-center justify-center">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </a>
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
              Still Need Help?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Our support team is here to help you succeed with LegalAI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Contact Support
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/login" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Try LegalAI Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;