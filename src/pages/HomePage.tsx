import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Ticket, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Layout } from '../components/layout/Layout';

export function HomePage() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: 'Client Management',
      description: 'Organize and manage your client relationships efficiently with comprehensive profiles and communication history.',
    },
    {
      icon: <Ticket className="h-6 w-6 text-primary-600" />,
      title: 'Support Ticketing',
      description: 'Track and resolve client issues with a robust ticketing system featuring notifications and status tracking.',
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary-600" />,
      title: 'Client Feedback',
      description: 'Collect and showcase client feedback to improve your services and build trust with potential clients.',
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary-600" />,
      title: 'Branded Experience',
      description: 'Customize the platform with your brand colors, logo, and styling to create a seamless client experience.',
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Build Better Client Relationships
            </h1>
            <p className="mt-6 text-xl text-primary-100">
              A full-featured platform for managing client support, feedback, and communication—all with your brand at the forefront.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary-700 hover:bg-gray-100"
                onClick={() => navigate('/signup')}
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-primary-800"
                onClick={() => navigate('/demo')}
              >
                Request Demo
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="w-full h-auto fill-white"
            preserveAspectRatio="none"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Everything You Need for Client Success
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools necessary to manage client relationships, support, and feedback in one place.
            </p>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-2 bg-primary-50 rounded-lg">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-20">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Ready to transform your client experience?
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-primary-100">
                  Start your 14-day free trial today. No credit card required.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="sm:flex">
                  <Button
                    size="lg"
                    className="bg-white text-primary-700 hover:bg-gray-100"
                    rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
                    onClick={() => navigate('/signup')}
                  >
                    Get Started Now
                  </Button>
                </div>
                <p className="mt-3 text-sm text-primary-100">
                  Need more information? <a href="/pricing" className="font-medium underline">View pricing plans</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Trusted by Businesses Worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Hear what our customers have to say about their experience with CommunityHub.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "CommunityHub has completely transformed how we manage client support. The branded experience makes our clients feel valued and part of our community.",
                author: "Sarah Johnson",
                role: "Customer Success Manager",
                company: "TechGrowth Inc.",
              },
              {
                quote: "The ticketing system and client feedback features have helped us improve our service quality dramatically. Our client satisfaction is at an all-time high.",
                author: "Michael Chen",
                role: "Operations Director",
                company: "ServicePro Solutions",
              },
              {
                quote: "As a small business, we needed a solution that would scale with us. CommunityHub offers enterprise-level features at a price point that makes sense for companies of any size.",
                author: "Lisa Rodriguez",
                role: "Founder & CEO",
                company: "Bright Consulting",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <svg className="h-8 w-8 text-primary-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}