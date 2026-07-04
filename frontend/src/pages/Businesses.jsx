// pages/Businesses.jsx
import { Link } from 'react-router-dom'
import { FiArrowRight, FiBriefcase, FiFileText, FiUsers, FiShield, FiCheckCircle, FiPhone } from 'react-icons/fi'

const Businesses = () => {
  const services = [
    {
      icon: FiBriefcase,
      title: 'Business Formation',
      description: 'LLC, corporation, partnership setup with proper documentation and compliance.',
    },
    {
      icon: FiFileText,
      title: 'Contract Law',
      description: 'Drafting, review, and negotiation of all business contracts and agreements.',
    },
    {
      icon: FiUsers,
      title: 'Employment Law',
      description: 'Employee handbooks, policies, dispute resolution, and compliance guidance.',
    },
    {
      icon: FiShield,
      title: 'Litigation & Disputes',
      description: 'Strong representation in business disputes, mediation, and court proceedings.',
    },
    {
      icon: FiCheckCircle,
      title: 'Compliance',
      description: 'Regulatory compliance, licensing, and ongoing legal risk management.',
    },
    {
      icon: FiFileText,
      title: 'Intellectual Property',
      description: 'Trademark, copyright protection, and trade secret safeguarding.',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-chocolate py-32">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c6a41b70c2e6?w=1920&h=600&fit=crop"
            alt="Business"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-white/70 text-sm tracking-[0.25em] uppercase mb-4">For Businesses</p>
            <h1 className="font-display text-5xl lg:text-6xl text-white mb-6">
              Legal solutions for your business
            </h1>
            <p className="text-white/80 text-xl leading-relaxed mb-8">
              From startups to established enterprises, we provide the legal foundation 
              your business needs to thrive and grow with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-chocolate rounded-lg font-medium hover:bg-cream transition-all"
              >
                Schedule Consultation
                <FiArrowRight />
              </Link>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-all"
              >
                <FiPhone />
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-chocolate mb-4">
              Business Legal Services
            </h2>
            <p className="text-taupe max-w-2xl mx-auto">
              Comprehensive legal support tailored to protect and grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 bg-cream rounded-2xl hover:shadow-xl hover:bg-white transition-all duration-500 animate-fade-up border border-transparent hover:border-chocolate/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-chocolate/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-chocolate group-hover:text-white transition-all">
                  <service.icon className="text-xl text-chocolate group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display text-2xl text-chocolate mb-3">{service.title}</h3>
                <p className="text-taupe text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-chocolate">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-4xl text-white mb-6">
            Protect your business today
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Let's discuss how we can help your business navigate legal challenges and seize opportunities.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-chocolate rounded-lg font-medium hover:bg-cream transition-all"
          >
            Get Started
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Businesses