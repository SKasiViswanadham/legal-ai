import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  Zap, 
  Star, 
  ArrowRight,
  Crown,
  Shield,
  Clock,
  Users
} from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for trying out LegalAI',
      price: { monthly: 0, yearly: 0 },
      features: [
        '3 document analyses per month',
        'Basic AI analysis',
        'Plain English summaries',
        'Key terms explanation',
        'Email support'
      ],
      limitations: [
        'No fraud detection',
        'No reply generation',
        'No financial calculations',
        'Limited risk assessment'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'slate'
    },
    {
      name: 'Professional',
      description: 'Ideal for individuals and small businesses',
      price: { monthly: 29, yearly: 290 },
      features: [
        '50 document analyses per month',
        'Complete AI analysis suite',
        'Fraud detection',
        'Risk assessment',
        'Financial calculations',
        'Reply letter generation',
        'Priority email support',
        'Document history'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: true,
      color: 'blue'
    },
    {
      name: 'Business',
      description: 'For teams and growing businesses',
      price: { monthly: 99, yearly: 990 },
      features: [
        '200 document analyses per month',
        'Everything in Professional',
        'Team collaboration',
        'Advanced risk scoring',
        'Custom analysis templates',
        'API access',
        'Phone support',
        'Dedicated account manager'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      popular: false,
      color: 'purple'
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: { monthly: 'Custom', yearly: 'Custom' },
      features: [
        'Unlimited document analyses',
        'Everything in Business',
        'Custom AI model training',
        'On-premise deployment',
        'Advanced security features',
        'SLA guarantees',
        '24/7 premium support',
        'Custom integrations'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'gold'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Small Business Owner',
      content: 'LegalAI Professional has saved me thousands in legal fees. The fraud detection caught a suspicious clause that would have cost me dearly.',
      plan: 'Professional'
    },
    {
      name: 'Marcus Johnson',
      role: 'Legal Team Lead',
      content: 'Our team uses LegalAI Business to review contracts faster than ever. The collaboration features are game-changing.',
      plan: 'Business'
    }
  ];

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing adjustments.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'What happens if I exceed my monthly limit?',
      answer: 'You can purchase additional analyses at $2 each, or upgrade to a higher plan for better value.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, we\'ll refund your payment in full.'
    }
  ];

  const getPrice = (plan) => {
    const price = plan.price[billingCycle];
    if (typeof price === 'string') return price;
    if (billingCycle === 'yearly') {
      return `$${price}`;
    }
    return `$${price}`;
  };

  const getBillingText = (plan) => {
    const price = plan.price[billingCycle];
    if (typeof price === 'string') return '';
    if (billingCycle === 'yearly') {
      return `/year`;
    }
    return `/month`;
  };

  const getSavings = (plan) => {
    if (typeof plan.price.yearly === 'string' || plan.price.monthly === 0) return null;
    const yearlyPerMonth = plan.price.yearly / 12;
    const savings = ((plan.price.monthly - yearlyPerMonth) / plan.price.monthly * 100).toFixed(0);
    return savings;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 leading-tight">
              Simple, Transparent
              <span className="text-gradient block">Pricing</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your legal document analysis needs. 
              Start with our free plan or try any paid plan with a 14-day free trial.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-800' : 'text-slate-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-800' : 'text-slate-500'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  Save up to 17%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => {
              const savings = getSavings(plan);
              return (
                <div
                  key={index}
                  className={`card hover-lift relative ${
                    plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-6">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-slate-800">
                          {getPrice(plan)}
                        </span>
                        <span className="text-slate-500 ml-1">
                          {getBillingText(plan)}
                        </span>
                      </div>
                      {savings && billingCycle === 'yearly' && (
                        <p className="text-green-600 text-sm mt-2">
                          Save {savings}% with yearly billing
                        </p>
                      )}
                    </div>

                    <Link
                      to="/login"
                      className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors mb-6 ${
                        plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                      }`}
                    >
                      {plan.cta}
                    </Link>

                    <div className="text-left space-y-3">
                      <h4 className="font-semibold text-slate-800 text-sm">Features included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.limitations.length > 0 && (
                        <div className="pt-4">
                          <h4 className="font-semibold text-slate-800 text-sm mb-2">Not included:</h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, limitIndex) => (
                              <li key={limitIndex} className="flex items-start space-x-3">
                                <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-500 text-sm">{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-800">
              Compare Plans
            </h2>
            <p className="text-lg text-slate-600">
              See what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-6 font-semibold text-slate-800">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-800">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-800">Professional</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-800">Business</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-800">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-6 text-slate-700">Monthly Analyses</td>
                  <td className="text-center py-4 px-6">3</td>
                  <td className="text-center py-4 px-6">50</td>
                  <td className="text-center py-4 px-6">200</td>
                  <td className="text-center py-4 px-6">Unlimited</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-6 text-slate-700">AI Analysis</td>
                  <td className="text-center py-4 px-6"><Check className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-4 px-6 text-slate-700">Fraud Detection</td>
                  <td className="text-center py-4 px-6"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="h-5 w-5 text-green-600 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="h-5 w-5 text-green-600 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-800">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-slate-500 text-sm">{testimonial.role}</div>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {testimonial.plan}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-slate-800">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <h3 className="font-semibold text-slate-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600">
                  {faq.answer}
                </p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Start your free trial today and experience the power of AI-driven legal document analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;