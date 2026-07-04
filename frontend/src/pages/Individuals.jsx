// pages/Individuals.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiMapPin, FiMail, FiHome, FiHeart, FiUsers, FiFileText, FiShield, FiAlertCircle } from 'react-icons/fi'

const Individuals = () => {
  const [hoveredService, setHoveredService] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    enquiryType: '',
    email: '',
    phone: ''
  })

  const services = [
    {
      id: 'residential-conveyancing',
      icon: FiHome,
      title: 'Residential conveyancing',
      description: 'Are you considering buying, selling or remortgaging a residential property? Our firm has been helping clients with property transactions for nearly two centuries. This solid foundation ensures that our experienced team has the technical knowledge and the practical know-how to take the stress out of your property move. Whether you\'re a first-time buyer or an experienced property investor, our invaluable insight will keep you on the right track and guide you through the process.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop'
    },
    {
      id: 'wills-trusts',
      icon: FiFileText,
      title: 'Wills, trusts and estate planning',
      description: 'Do you want peace of mind and to ensure that your family and loved ones are provided for? Are you concerned about protecting family wealth? Do you worry that your affairs are not in order? We can help put your mind at rest by putting in place appropriate legal measures to allow you plan for the future. Our professional, empathetic and personalised approach has benefited generations of families for almost 200 years. Book a call and take the first step in organising your affairs.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop'
    },
    {
      id: 'mental-capacity',
      icon: FiHeart,
      title: 'Mental capacity',
      description: 'A loved one losing mental capacity can be a stressful and harrowing experience for a family. Our highly trained team deals with the issues surrounding a loss of capacity with sensitivity, empathy and professionalism. Whether you are setting up a power of attorney or dealing with the Office of Care and Protection, we are well equipped to give practical legal advice on the process of dealing with property, assets and finances in the event of a person no longer being able to make decisions about their affairs. With discretion, compassion and professional care, we aim to make an emotional and challenging process as straightforward as possible.',
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=500&fit=crop'
    },
    {
      id: 'administration-estates',
      icon: FiUsers,
      title: 'Administration of estates and trusts',
      description: 'Helping families deal with a relative\'s finances and affairs following a bereavement is an area of law in which our team has decades of experience. With generations of clients having been supported through this difficult time, we have all of the necessary knowledge and skills. Our sensitive and empathetic approach ensures peace of mind for clients, who can rest assured that everything is being taken care of.',
      image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=500&fit=crop'
    },
    {
      id: 'matrimonial',
      icon: FiAlertCircle,
      title: 'Matrimonial',
      description: 'We advise on a broad range of issues when a relationship breaks down, from filing for a divorce to reaching a binding financial settlement with your partner. We place great emphasis on understanding and appreciating the issues that you are facing. We will provide sound and robust legal advice to protect your interests and achieve the best-possible outcome for you. Our focus, as always, is on providing exceptional, one-to-one client care to help you through this challenging time.',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=500&fit=crop'
    },
    {
      id: 'dispute-resolution',
      icon: FiShield,
      title: 'Dispute resolution and litigation',
      description: 'Resolving disputes at the earliest-possible opportunity is the best way to avoid lengthy litigation in the courts. We pride ourselves on our ability to quickly identify the issues in any dispute, so as to avoid unnecessary delay and expense. Our communication skills and excellent reputation within the profession mean we are well placed to negotiate on your behalf to secure the outcome you are looking for. If you need to take a matter to court, our team has the necessary experience in the High Court and County Court to keep you right.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop'
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
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1920&h=600&fit=crop"
            alt="Individual legal services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[#C4956A] text-sm tracking-[0.2em] uppercase mb-4">For individuals</p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The highest-possible standard of legal advice
            </h1>
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
              As well as a full range of commercial legal advice, we have earned an enviable 
              reputation for providing a high-quality professional service to individual clients.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== INTRODUCTION ==================== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                Our dedicated team prides itself on being friendly, approachable and diligent. 
                We understand how much trust our clients put in us and approach every case with 
                a high level of commitment, focus and empathy.
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                We appreciate the importance of good communication, and endeavour to ensure 
                that we are accessible, so that clients are kept fully informed throughout 
                their legal journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES WITH HOVER EFFECT ==================== */}
      <section className="pb-20 lg:pb-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl lg:text-4xl text-[#1a1a1a] mb-14" 
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            We provide the following services<br />
            to our individual clients:
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
                      to={`/individuals/${service.id}`}
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

      {/* ==================== VALUES SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-[#F8F6F3]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div>
              <div className="w-12 h-[2px] bg-[#C4956A] mb-6" />
              <h3 className="text-2xl lg:text-3xl text-[#1a1a1a] mb-4" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Friendly & Approachable
              </h3>
              <p className="text-gray-500 font-light leading-relaxed">
                We pride ourselves on being accessible and easy to talk to. Our clients 
                appreciate our down-to-earth approach combined with professional expertise.
              </p>
            </div>
            <div>
              <div className="w-12 h-[2px] bg-[#C4956A] mb-6" />
              <h3 className="text-2xl lg:text-3xl text-[#1a1a1a] mb-4" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Empathetic & Understanding
              </h3>
              <p className="text-gray-500 font-light leading-relaxed">
                We understand that legal matters can be stressful. Our team approaches every 
                case with genuine care, compassion, and emotional intelligence.
              </p>
            </div>
            <div>
              <div className="w-12 h-[2px] bg-[#C4956A] mb-6" />
              <h3 className="text-2xl lg:text-3xl text-[#1a1a1a] mb-4" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Dedicated & Committed
              </h3>
              <p className="text-gray-500 font-light leading-relaxed">
                With nearly two centuries of experience, our commitment to achieving the best 
                outcomes for our clients remains unwavering and absolute.
              </p>
            </div>
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
                  <option value="">Select service area</option>
                  <option value="conveyancing">Residential Conveyancing</option>
                  <option value="wills">Wills, Trusts & Estate Planning</option>
                  <option value="mental-capacity">Mental Capacity</option>
                  <option value="estates">Administration of Estates</option>
                  <option value="matrimonial">Matrimonial</option>
                  <option value="dispute">Dispute Resolution & Litigation</option>
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
                  Imperial Buildings,<br />
                  72 High Street, Belfast BT1 2BE
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

export default Individuals