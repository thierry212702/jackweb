// pages/About.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiMail, FiMapPin, FiLinkedin } from 'react-icons/fi'

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    enquiryType: '',
    email: '',
    phone: ''
  })

  const teamMembers = [
    {
      name: 'Sara Patterson',
      role: 'Director',
      qualified: '1995',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face',
      bio: 'Sara is a property law specialist who advises both commercial and individual clients. In addition to residential and commercial conveyancing, she also represents clients in matrimonial cases and advises on the areas of wills, administration of estates and trusts including niche areas such as mental capacity and contested estates. Sara has tutored trainee solicitors for many years at the Institute of Professional Legal Studies.',
      memberships: [
        'Law Society of Northern Ireland',
        'Belfast Solicitors\' Association',
        'Elder Law Group'
      ]
    },
    {
      name: 'Gary Patterson',
      role: 'Director',
      qualified: '1999',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face',
      bio: 'As a commercial and business adviser, Gary works with leading local and national companies across various sectors to provide exceptional legal insight and advice in the areas of real estate, landlord and tenant, corporate finance and restructuring. He also has many years of experience of advising private individuals in relation to estates, trusts and family wealth protection.',
      memberships: [
        'Law Society of Northern Ireland',
        'Belfast Solicitors\' Association',
        'NI Commercial Property Lawyers\' Association',
        'Society of Trust and Estate Practitioners'
      ]
    },
    {
      name: 'Amy Russell',
      role: 'Solicitor',
      qualified: '2023',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face',
      bio: 'Amy studied Law with Politics at Queen\'s University, Belfast and graduated with a 2:1 LLB Honours Degree. She joined the firm in September 2021 as a Trainee Solicitor and was admitted to the Roll of Solicitors in Northern Ireland in October 2023. Amy advises individuals across a number of practice areas including residential conveyancing, the administration of wills and trusts, mental capacity and estate planning.',
      memberships: [
        'Law Society of Northern Ireland',
        'Northern Ireland Young Solicitors Association'
      ]
    },
    {
      name: 'Abigail Wilson',
      role: 'Solicitor',
      qualified: '2023',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face',
      bio: 'Abigail studied Law at The Queen\'s University of Belfast before completing her training contract and being admitted to the Roll of Solicitors in 2023. Abigail has experience in a wide variety of Private Client matters including Wills, Enduring Powers of Attorney, Estate Planning and Administration of Estates. Abigail also has experience with residential conveyancing matters.',
      memberships: [
        'Law Society of Northern Ireland',
        'Northern Ireland Young Solicitors Association'
      ]
    }
  ]

  const historyTimeline = [
    {
      year: '1822',
      title: 'Our Origin',
      description: 'James Andrews, a Belfast-based solicitor, establishes the practice that would become Maclaine & Co. His vision for exceptional legal service lays the foundation for generations to come.'
    },
    {
      year: '1880s',
      title: 'The Maclaine Partnership',
      description: 'George L. Maclaine joins James Andrews\' son, forming Andrews, Son & Maclaine. The Maclaine name becomes synonymous with legal excellence in Belfast.'
    },
    {
      year: '1915',
      title: 'Continuing the Legacy',
      description: 'Following George Maclaine\'s passing, Omar C. Nelson and his son William H.N. Nelson take over the practice, maintaining the Maclaine name and its reputation for quality.'
    },
    {
      year: '1919',
      title: 'The Hamilton Era',
      description: 'Robert Victor Hamilton joins the firm, followed by his son John Victor Hamilton, who makes significant contributions with his forward-thinking and progressive approach to business.'
    },
    {
      year: '2019',
      title: 'Modern Rebranding',
      description: 'The firm rebrands from Geo. L. Maclaine & Co to Maclaine & Co, reflecting a modern, forward-thinking legal practice while remaining proud of its heritage.'
    },
    {
      year: '2024',
      title: 'Incorporation',
      description: 'Maclaine & Co becomes Maclaine & Co Ltd, a limited liability company. The practice continues to deliver the rounded, high-calibre legal service that has become its trademark.'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="bg-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-[#1a1a1a] text-white py-32 lg:py-40">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=600&fit=crop"
            alt="Historic legal office"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[#C4956A] text-sm tracking-[0.2em] uppercase mb-4">About us</p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Providing exemplary legal advice for over 200 years
            </h1>
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed font-light max-w-2xl">
              Since our formation in 1822, we have provided an excellent standard of service, 
              with professional and expert legal advice delivered to thousands of individual 
              and commercial clients over the years.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== INTRODUCTION ==================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
              As one of the region's oldest legal firms, we believe in a personal approach to 
              our services. Our dedicated, hand-picked team of legal experts and support staff 
              place all their focus on providing our clients with an exceptional level of service. 
              For high-end, professional legal advice and care, make us your first choice.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              We are so well known and trusted within our field that generations of clients 
              return to us time and time again. We welcome long-term relationships with our 
              clients and, through our unique history and established reputation, we are able 
              to provide an outstanding level of service to our clients.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== MEET OUR TEAM ==================== */}
      <section className="py-20 lg:py-28 bg-[#F8F6F3]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-16 lg:mb-20" 
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Meet our team
          </h2>

          <div className="space-y-20 lg:space-y-28">
            {teamMembers.map((member, index) => (
              <div key={index} className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                {/* Image */}
                <div className="lg:col-span-4">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.style.backgroundColor = '#e5e0d8'
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <div className="mb-6">
                    <p className="text-[#C4956A] text-sm tracking-[0.2em] uppercase mb-2">
                      {member.role}
                    </p>
                    <h3 className="text-3xl lg:text-4xl text-[#1a1a1a] mb-1" 
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-sm">Qualified: {member.qualified}</p>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8 font-light">
                    {member.bio}
                  </p>

                  <div>
                    <h4 className="text-sm font-medium text-[#1a1a1a] mb-3 uppercase tracking-wider">
                      Memberships
                    </h4>
                    <ul className="space-y-2">
                      {member.memberships.map((membership, i) => (
                        <li key={i} className="text-gray-500 text-sm font-light flex items-start gap-2">
                          <span className="text-[#C4956A] mt-1">•</span>
                          {membership}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HISTORY SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-8" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Why history is important to us
              </h2>
              <p className="text-[#C4956A] text-sm tracking-[0.2em] uppercase mb-6">
                Steeped in local history
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
                The firm has been forged over decades of hard work and commitment to our clients. 
                That is why it is crucial for us to honour and understand the lengthy and 
                fascinating history that brought us to our modern-day reputation.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                As one of the region's oldest legal firms, with client relationships spanning 
                decades and generations, our history is still a huge part of who we are. Through 
                the expertise and reputation of partners past and present, the firm has grown 
                to be the highly regarded and exclusive legal firm it is today.
              </p>
            </div>

            <div>
              <h3 className="text-3xl lg:text-4xl text-[#1a1a1a] mb-10" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Our origin
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 font-light">
                It may surprise you that the founding father of our legal company was not, in 
                fact, a Maclaine himself. James Andrews, a Belfast-based solicitor, was the 
                initial mind behind the solicitor business. However, it was his partnership years 
                later with George L. Maclaine that led to the name Andrews, Son & Maclaine – 
                later adjusted to Andrews & Maclaine, following the death of James's son.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                After the death of James Andrews, the name of the solicitors was again amended – 
                this time to the more familiar Geo. L. Maclaine & Co. While the name of the firm 
                would adjust and change slightly, the reputation and history attached to the 
                Maclaine brand became a mark of quality for the legal advice and services provided.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-24 lg:mt-32">
            <h3 className="text-3xl lg:text-4xl text-[#1a1a1a] mb-16" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Continuing the Maclaine name
            </h3>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-[1px] bg-[#C4956A]/30 transform lg:-translate-x-1/2" />

              <div className="space-y-16 lg:space-y-24">
                {historyTimeline.map((event, index) => (
                  <div key={index} className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-start ${
                    index % 2 === 0 ? '' : 'lg:[direction:rtl]'
                  }`}>
                    {/* Timeline dot */}
                    <div className="absolute left-0 lg:left-1/2 top-2 w-3 h-3 bg-[#C4956A] rounded-full transform -translate-x-[5px] lg:-translate-x-1/2 z-10" />

                    {/* Content */}
                    <div className={`pl-8 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                      <p className="text-[#C4956A] text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {event.year}
                      </p>
                      <h4 className="text-2xl text-[#1a1a1a] mb-3" 
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {event.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed font-light">
                        {event.description}
                      </p>
                    </div>

                    {/* Empty column for alternating layout */}
                    <div className="hidden lg:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modern Era */}
          <div className="mt-16 lg:mt-24 max-w-3xl">
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
              Through the diligent work of excellent legal minds and dedicated partners, the 
              practice has withstood the test of time. It has evolved and adapted where necessary 
              to align with the needs of its clients and to take account of socio-economic 
              demographics.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
              In June 2019, Geo. L. Maclaine & Co rebranded and became Maclaine & Co. In 
              January 2024, Maclaine & Co was incorporated. Maclaine & Co Solicitors has become 
              the trading name of Maclaine & Co Ltd, a limited liability company.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              The company continues to be a modern, forward-thinking legal practice which remains 
              proud of its history. Our experience spanning decades ensures that we appreciate 
              the value of long-term client relationships and allows us to deliver the rounded, 
              high-calibre legal service that has become our trademark.
            </p>
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
                  <option value="">Administration of estates & trusts</option>
                  <option value="property">Property Law</option>
                  <option value="commercial">Commercial Law</option>
                  <option value="family">Family Law</option>
                  <option value="wills">Wills & Estates</option>
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

      {/* ==================== CONTACT INFO BAR ==================== */}
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

export default About