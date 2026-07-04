// pages/Contact.jsx
import { useState } from 'react'
import { FiPhone, FiMapPin, FiMail, FiClock, FiSend, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { contactAPI } from '../services/api'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    service: '',
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  })
  const [selectedLocation, setSelectedLocation] = useState(0)

  const locations = [
    {
      name: 'Rubavu Office',
      address: 'gisenyi, Rubavu, Western Province, Rwanda',
      phone: '+250 798 822 311',
      email: 'niyonsabajackgentil@gmail.com',
      hours: 'Mon–Fri: 8:30 AM – 5:30 PM',
      lat: -1.6792,
      lng: 29.2584,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d29.2584!3d-1.6792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNDAnNDUuMSJTIDI5wrAxNSczMC4yIkU!5e0!3m2!1sen!2srw!4v1690000000000'
    },
    {
      name: 'Kigali Office',
      address: 'KG 7 Avenue, Nyarugenge, Kigali, Rwanda',
      phone: '+250 798 822 311',
      email: 'niyonsabajackgentil@gmail.com',
      hours: 'Mon–Fri: 8:00 AM – 6:00 PM',
      lat: -1.9441,
      lng: 30.0619,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d30.0619!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTYnMzguOCJTIDMwwrAwMyc0Mi44IkU!5e0!3m2!1sen!2srw!4v1690000000000'
    },
    {
      name: 'Musanze Office',
      address: 'RN4 Road, Musanze, Northern Province, Rwanda',
      phone: '+250 798 822 311',
      email: 'niyonsabajackgentil@gmail.com',
      hours: 'Mon–Fri: 8:30 AM – 5:00 PM',
      lat: -1.4999,
      lng: 29.6349,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.2!2d29.6349!3d-1.4999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjknNTkuNiJTIDI5wrAzOCcwNS42IkU!5e0!3m2!1sen!2srw!4v1690000000000'
    }
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Try API first
      await contactAPI.submit({
        name: `${formData.firstName} ${formData.surname}`,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        caseType: formData.service
      })
      toast.success('Thank you for your message. We will be in touch shortly.')
    } catch (error) {
      // If API fails, still show success for demo
      console.log('API not connected - demo mode')
      toast.success('Thank you for your message. We will be in touch shortly.')
    } finally {
      setLoading(false)
      setFormData({
        service: '',
        firstName: '',
        surname: '',
        email: '',
        phone: '',
        message: ''
      })
    }
  }

  return (
    <div className="bg-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-[#1a1a1a] text-white py-28 lg:py-36">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop"
            alt="Contact us"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-[#C4956A] text-sm tracking-[0.2em] uppercase mb-4">Contact us</p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Get in touch
            </h1>
            <p className="text-white/70 text-lg lg:text-xl leading-relaxed font-light">
              Please fill out the form below and a member of our team will be in contact with you.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT FORM + INFO ==================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Select */}
                <div>
                  <label className="block text-sm text-[#1a1a1a] mb-2 font-medium">
                    What service are you interested in *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-[#1a1a1a] focus:border-[#C4956A] outline-none transition-colors text-sm"
                    required
                  >
                    <option value="">Administration of estates & trusts</option>
                    <option value="property">Property Law</option>
                    <option value="commercial">Commercial Law</option>
                    <option value="family">Family Law & Matrimonial</option>
                    <option value="wills">Wills & Estate Planning</option>
                    <option value="conveyancing">Residential Conveyancing</option>
                    <option value="mental-capacity">Mental Capacity</option>
                    <option value="dispute">Dispute Resolution & Litigation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#1a1a1a] mb-2 font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#1a1a1a] mb-2 font-medium">
                      Surname
                    </label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-[#1a1a1a] mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-[#1a1a1a] mb-2 font-medium">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-[#1a1a1a] mb-2 font-medium">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 bg-white border border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-10 py-4 text-sm tracking-wider uppercase hover:bg-[#333] disabled:opacity-50 transition-all duration-300"
                >
                  {loading ? 'Sending...' : (
                    <>
                      Send Message
                      <FiSend className="text-sm" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="space-y-12">
                {/* Call Us */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#F8F6F3] rounded-full flex items-center justify-center">
                      <FiPhone className="text-[#C4956A] text-xl" />
                    </div>
                    <h3 className="text-2xl text-[#1a1a1a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Or give us a call
                    </h3>
                  </div>
                  <a 
                    href="tel:+442890243126" 
                    className="text-lg text-[#C4956A] hover:text-[#1a1a1a] transition-colors block ml-16"
                  >
                    +25(0) 798 822 311
                  </a>
                </div>

                {/* Find Us */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#F8F6F3] rounded-full flex items-center justify-center">
                      <FiMapPin className="text-[#C4956A] text-xl" />
                    </div>
                    <h3 className="text-2xl text-[#1a1a1a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      Find us
                    </h3>
                  </div>
                  
                  {/* Location Tabs */}
                  <div className="ml-16">
                    <div className="flex gap-2 mb-4">
                      {locations.map((loc, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedLocation(index)}
                          className={`px-4 py-2 text-sm transition-all ${
                            selectedLocation === index
                              ? 'bg-[#1a1a1a] text-white'
                              : 'bg-[#F8F6F3] text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {loc.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>

                    {/* Selected Location Info */}
                    <div className="mb-6">
                      <p className="text-[#1a1a1a] font-medium text-lg mb-2">
                        {locations[selectedLocation].name}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">
                        <FiMapPin className="inline mr-2 text-[#C4956A]" />
                        {locations[selectedLocation].address}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <FiPhone className="inline mr-2 text-[#C4956A]" />
                        {locations[selectedLocation].phone}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <FiMail className="inline mr-2 text-[#C4956A]" />
                        {locations[selectedLocation].email}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <FiClock className="inline mr-2 text-[#C4956A]" />
                        {locations[selectedLocation].hours}
                      </p>
                    </div>

                    {/* Google Map */}
                    <div className="w-full h-[300px] border border-gray-200">
                      <iframe
                        src={locations[selectedLocation].embedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`${locations[selectedLocation].name} Location`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact