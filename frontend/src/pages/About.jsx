// pages/About.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiMapPin, FiMail } from 'react-icons/fi'

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
      image: '/images/team/frank.jpg',
      bio: 'Sara is a property law specialist who advises both commercial and individual clients. In addition to residential and commercial conveyancing, she also represents clients in matrimonial cases and advises on the areas of wills, administration of estates and trusts.',
      memberships: ['Law Society of Northern Ireland', 'Belfast Solicitors\' Association', 'Elder Law Group']
    },
    {
      name: 'Gary Patterson',
      role: 'Director',
      qualified: '1999',
      image: '/images/hero/jack1.jpg',
      bio: 'As a commercial and business adviser, Gary works with leading local and national companies across various sectors to provide exceptional legal insight and advice in the areas of real estate, landlord and tenant, corporate finance and restructuring.',
      memberships: ['Law Society of Northern Ireland', 'Belfast Solicitors\' Association', 'Society of Trust and Estate Practitioners']
    },
    {
      name: 'Amy Russell',
      role: 'Solicitor',
      qualified: '2023',
      image: '/images/hero/jack2.jpg',
      bio: 'Amy studied Law with Politics at Queen\'s University, Belfast and graduated with a 2:1 LLB Honours Degree. She advises individuals across a number of practice areas including residential conveyancing, wills and trusts, mental capacity and estate planning.',
      memberships: ['Law Society of Northern Ireland', 'Northern Ireland Young Solicitors Association']
    },
    {
      name: 'Abigail Wilson',
      role: 'Solicitor',
      qualified: '2023',
      image: '/images/hero/jack4.jpg',
      bio: 'Abigail studied Law at The Queen\'s University of Belfast before completing her training contract. Abigail has experience in Private Client matters including Wills, Enduring Powers of Attorney, Estate Planning and Administration of Estates.',
      memberships: ['Law Society of Northern Ireland', 'Northern Ireland Young Solicitors Association']
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-[#1a1a1a] text-white py-32 lg:py-40">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/about/jack4.jpg"
            alt="About MACJACK"
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
              Since our formation, we have provided an excellent standard of service, 
              with professional and expert legal advice delivered to thousands of clients.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
              As one of the region's oldest legal firms, we believe in a personal approach to 
              our services. Our dedicated, hand-picked team of legal experts place all their 
              focus on providing our clients with an exceptional level of service.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              We are so well known and trusted within our field that generations of clients 
              return to us time and time again. We welcome long-term relationships with our 
              clients and are able to provide an outstanding level of service.
            </p>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 lg:py-28 bg-[#F8F6F3]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-16 lg:mb-20" 
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Meet our team
          </h2>

          <div className="space-y-20 lg:space-y-28">
            {teamMembers.map((member, index) => (
              <div key={index} className="grid lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-4">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

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

      {/* Enquiry Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-6" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                How can we help?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                Send us your contact information and one of our team will be in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors" required />
              <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] focus:border-[#C4956A] outline-none transition-colors">
                <option value="">Administration of estates & trusts</option>
                <option value="property">Property Law</option>
                <option value="commercial">Commercial Law</option>
                <option value="family">Family Law</option>
                <option value="other">Other</option>
              </select>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telephone" className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors" />
              <button type="submit" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-[#333] transition-all duration-300 mt-4">
                Send Enquiry <FiArrowRight />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
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
                <a href="tel:+442890243126" className="text-white/80 text-sm mt-1 block hover:text-white transition-colors">+44 (0)28 9024 3126</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiMail className="text-[#C4956A] text-xl mt-1 flex-shrink-0" />
              <div>
                <p className="text-white/60 text-sm">Email</p>
                <a href="mailto:info@macjack.com" className="text-white/80 text-sm mt-1 block hover:text-white transition-colors">info@macjack.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About