// pages/WhatWeDo.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiMapPin, FiMail, FiBriefcase, FiUsers, FiHome, FiFileText, FiShield } from 'react-icons/fi'

const WhatWeDo = () => {
  const [formData, setFormData] = useState({
    name: '',
    enquiryType: '',
    email: '',
    phone: ''
  })

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
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=600&fit=crop"
            alt="Legal expertise"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[#C4956A] text-sm tracking-[0.2em] uppercase mb-4">What we do</p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              A progressive & forward-thinking law firm.
            </h1>
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
              If you need legal advice that you can trust from a friendly and approachable 
              professional, we are confident that we can help.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== INTRODUCTION ==================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
                Our long history, excellent reputation and convenient location make us the ideal 
                choice for hundreds of clients – many of whom come back to us time and time again. 
                Our outstanding level of service delivered by recognised subject experts in a 
                personable and open manner sets us apart from our competitors.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                If you are considering seeking legal advice, whether in Belfast or beyond, our 
                team is highly trained, experienced and uniquely positioned to help you. Our 
                various areas of expertise cover many different aspects of law, ensuring 
                high-quality advice on anything from property law to dispute resolution.
              </p>
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl text-[#1a1a1a] mb-6" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                One-to-one personalised service
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
                We are committed to acting for each and every one of our clients with integrity, 
                professionalism and openness. Much of our business is built on recommendations 
                and referrals, which is testament to the excellent standard of client care we 
                provide time and time again.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                We are always accessible and we take care to offer every client a bespoke service 
                with a dedicated solicitor from start to finish. We pride ourselves on our 
                personalised approach and at all times will strive to help you achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EXPERTISE SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-[#F8F6F3]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-8" 
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Expertise across commercial and private sectors
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-16 max-w-3xl font-light">
            With a wide range of legal services and specialisations, we are your ideal choice. 
            From personal legal matters to business and property-based enquiries, our team has 
            the knowledge and expertise to help you reach the best possible outcome. Get in touch 
            with us today to find out more.
          </p>

          {/* Service Cards */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* For Business Card */}
            <Link
              to="/businesses"
              className="group bg-white p-10 lg:p-14 hover:bg-[#1a1a1a] transition-all duration-500"
            >
              <div className="w-16 h-16 bg-[#F8F6F3] rounded-full flex items-center justify-center mb-8 group-hover:bg-[#C4956A]/20 transition-all">
                <FiBriefcase className="text-2xl text-[#1a1a1a] group-hover:text-[#C4956A] transition-colors" />
              </div>
              <h3 className="text-3xl lg:text-4xl text-[#1a1a1a] mb-4 group-hover:text-white transition-colors" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                For business
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8 font-light group-hover:text-white/60 transition-colors">
                We have specialised in providing pragmatic and appropriate legal advice to 
                commercial businesses for many years. Our expertise in commercial legal matters 
                makes us the ideal choice.
              </p>
              <span className="inline-flex items-center gap-2 text-[#1a1a1a] text-sm tracking-wider uppercase font-medium group-hover:text-[#C4956A] transition-colors">
                More details
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>

            {/* For Individuals Card */}
            <Link
              to="/individuals"
              className="group bg-white p-10 lg:p-14 hover:bg-[#1a1a1a] transition-all duration-500"
            >
              <div className="w-16 h-16 bg-[#F8F6F3] rounded-full flex items-center justify-center mb-8 group-hover:bg-[#C4956A]/20 transition-all">
                <FiUsers className="text-2xl text-[#1a1a1a] group-hover:text-[#C4956A] transition-colors" />
              </div>
              <h3 className="text-3xl lg:text-4xl text-[#1a1a1a] mb-4 group-hover:text-white transition-colors" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                For individuals
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8 font-light group-hover:text-white/60 transition-colors">
                Our team is dedicated to providing sound and insightful advice to private 
                individuals across a range of different legal areas with personalised service.
              </p>
              <span className="inline-flex items-center gap-2 text-[#1a1a1a] text-sm tracking-wider uppercase font-medium group-hover:text-[#C4956A] transition-colors">
                More details
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== ENQUIRY FORM ==================== */}
      <section className="py-20 lg:py-28 bg-white">
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
                  <option value="">Administration of estates & trusts</option>
                  <option value="property">Property Law</option>
                  <option value="commercial">Commercial Law</option>
                  <option value="family">Family Law</option>
                  <option value="other">Other</option>
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
                <p className="text-white/80 text-sm mt-1">
                  Imperial Buildings, 72 High Street, Belfast BT1 2BE
                </p>
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

export default WhatWeDo