// pages/Businesses.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiMapPin, FiMail, FiHome, FiFileText, FiTrendingUp, FiDollarSign, FiZap, FiRadio } from 'react-icons/fi'

const Businesses = () => {
  const [hoveredService, setHoveredService] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    enquiryType: '',
    email: '',
    phone: ''
  })

  const services = [
    {
      id: 'real-estate',
      icon: FiHome,
      title: 'Real estate',
      description: 'From the purchase and sale of commercial premises to general property law advice, our unique history and tried and tested expertise in guiding our clients through the real estate process is second to none. We deliver excellent outcomes to meet your legal requirements, whether it is purchasing multiple properties or investing in your first shop unit.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop'
    },
    {
      id: 'landlord',
      icon: FiFileText,
      title: 'Landlord and tenant',
      description: 'From small and medium enterprises to national retailers, our expert team has experience in acting for both landlords and tenants. Whether you require support in negotiating a new lease agreement or you need advice on a rent review or break clause, we have the experience and skills to help you navigate your way through these processes.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop'
    },
    {
      id: 'restructuring',
      icon: FiTrendingUp,
      title: 'Restructuring, banking and corporate finance',
      description: 'As your business grows, we are here to guide you through the often-complex areas of banking and finance. We regularly assist clients when they are required to provide security for loans or new banking facilities. We work collaboratively with our clients\' other professional advisers to achieve the best-possible solutions.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop'
    },
    {
      id: 'business-sales',
      icon: FiDollarSign,
      title: 'Business sales and purchases',
      description: 'If you are considering acquiring a business, sound and professional legal advice is a must in order to steer you in the right direction. Similarly, if you are considering a disposal of your business or retiring from a partnership, having an expert legal team on hand can make all the difference.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop'
    },
    {
      id: 'renewable',
      icon: FiZap,
      title: 'Renewable energy and telecommunications',
      description: 'Whether you are considering an installation of solar or wind energy equipment within the bounds of your property or you have been approached by a telecommunications company wishing to site its apparatus on your land, seeking independent legal advice should be your first priority.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop'
    },
    {
      id: 'startups',
      icon: FiRadio,
      title: 'Business start-ups and commercial contracts',
      description: 'When starting a new business, there are many legal issues to consider. From deciding upon your constitution, whether you are a sole trader, a partnership or a limited company, through to acquiring your first business premises, we can help you weigh up the risks and make the right decisions.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-[#1a1a1a] text-white py-32 lg:py-40">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=600&fit=crop"
            alt="Business legal services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[#C4956A] text-sm tracking-[0.2em] uppercase mb-4">For business</p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Raising the standard in legal advice
            </h1>
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
              If you are seeking insightful, expert legal advice, our team of legal professionals 
              is your ideal choice. We are highly trained and uniquely positioned to support 
              businesses across a variety of sectors.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== INTRODUCTION ==================== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl font-light">
            With a reputation for providing tailored practical advice, we will help you achieve 
            the best-possible legal outcome, with minimum disruption, allowing you to focus on 
            running your business.
          </p>
        </div>
      </section>

      {/* ==================== SERVICES WITH HOVER EFFECT ==================== */}
      <section className="pb-20 lg:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl lg:text-4xl text-[#1a1a1a] mb-14" 
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            We provide the following services<br />
            to our commercial clients:
          </h2>

          <div className="space-y-0">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group relative border-b border-gray-200"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Service Header - Always visible */}
                <div className="flex items-center justify-between py-6 lg:py-8 cursor-pointer">
                  <div className="flex items-center gap-6">
                    <service.icon className="text-2xl text-[#C4956A] flex-shrink-0" />
                    <h3 className="text-xl lg:text-2xl text-[#1a1a1a] group-hover:text-[#C4956A] transition-colors" 
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {service.title}
                    </h3>
                  </div>
                  <FiArrowRight className="text-gray-300 group-hover:text-[#C4956A] transition-all group-hover:translate-x-2 text-xl flex-shrink-0" />
                </div>

                {/* Expandable Content - Shows on hover */}
                <div 
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 overflow-hidden transition-all duration-500 ease-in-out ${
                    hoveredService === service.id 
                      ? 'max-h-[500px] opacity-100 pb-8 lg:pb-10' 
                      : 'max-h-0 opacity-0 pb-0'
                  }`}
                >
                  <div>
                    <p className="text-gray-600 leading-relaxed font-light">
                      {service.description}
                    </p>
                    <Link
                      to={`/businesses/${service.id}`}
                      className="inline-flex items-center gap-2 text-[#1a1a1a] text-sm tracking-wider uppercase mt-6 font-medium hover:text-[#C4956A] transition-colors"
                    >
                      More details
                      <FiArrowRight />
                    </Link>
                  </div>
                  <div className="h-48 lg:h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ENQUIRY FORM ==================== */}
      <section className="py-20 lg:py-28 bg-[#F8F6F3]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-6" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                How can we help?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                Send us your contact information and one of our team will be in touch to discuss 
                your requirements.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <select
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] focus:border-[#C4956A] outline-none transition-colors"
                >
                  <option value="">Select service area</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="landlord">Landlord & Tenant</option>
                  <option value="restructuring">Restructuring & Finance</option>
                  <option value="business-sales">Business Sales & Purchases</option>
                  <option value="renewable">Renewable Energy</option>
                  <option value="startups">Business Start-ups</option>
                </select>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telephone"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-[#333] transition-all duration-300 mt-4"
              >
                Send Enquiry
                <FiArrowRight />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT BAR ==================== */}
      <section className="py-12 bg-[#1a1a1a] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <FiMapPin className="text-[#C4956A] text-xl mt-1 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-sm">Registered Office</p>
                <p className="text-white/80 text-sm mt-1">Imperial Buildings, 72 High Street, Belfast BT1 2BE</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiPhone className="text-[#C4956A] text-xl mt-1 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-sm">Telephone</p>
                <a href="tel:+442890243126" className="text-white/80 text-sm mt-1 block hover:text-white transition-colors">
                  +44 (0)28 9024 3126
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiMail className="text-[#C4956A] text-xl mt-1 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-sm">Email</p>
                <a href="mailto:info@sarahmichelle.com" className="text-white/80 text-sm mt-1 block hover:text-white transition-colors">
                  info@sarahmichelle.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Businesses