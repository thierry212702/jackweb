// pages/Home.jsx
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { podcastAPI, bookAPI } from '../services/api'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [enquiryType, setEnquiryType] = useState('')
  const [podcasts, setPodcasts] = useState([])
  const [books, setBooks] = useState([])

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=900&fit=crop',
      alt: 'Historic legal building'
    },
    {
      image: 'https://images.unsplash.com/photo-1577415124269-f5d3f0cc0a4e?w=1920&h=900&fit=crop',
      alt: 'Legal consultation room'
    },
    {
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=900&fit=crop',
      alt: 'Professional legal office'
    }
  ]

  const newsItems = [
    {
      date: 'July 2, 2024',
      title: 'New requirements for smoke, heat and carbon monoxide alarms in private rental properties',
      description: 'We provide a brief overview of The Smoke, Heat and Carbon Monoxide Alarms for Private Tenancies Regulations (Northern Ireland) 2024.',
      category: 'News'
    },
    {
      date: 'March 6, 2024',
      title: 'Amy Russell Admitted to the Roll of Solicitors NI',
      description: 'We are delighted to announce that our former Trainee Solicitor Amy Russell has now been admitted to the Roll of Solicitors NI.',
      category: 'Announcements'
    }
  ]

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isPaused, heroSlides.length])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [podcastRes, bookRes] = await Promise.allSettled([
          podcastAPI.getAll(),
          bookAPI.getAll()
        ])
        if (podcastRes.status === 'fulfilled') {
          setPodcasts(podcastRes.value.data?.data || podcastRes.value.data || [])
        }
        if (bookRes.status === 'fulfilled') {
          setBooks(bookRes.value.data?.data || bookRes.value.data || [])
        }
      } catch (error) {
        console.log('Using demo content')
      }
    }
    fetchData()
  }, [])

  const handleEnquiry = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="overflow-hidden bg-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-screen min-h-[700px]">
        {/* Slideshow */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <FiChevronRight />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-8 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[2px] transition-all duration-500 ${
                currentSlide === index 
                  ? 'w-10 bg-white' 
                  : 'w-5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-2xl">
              <h1 className="text-white text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Belfast's law<br />
                firm of choice<br />
                for over 200 years
              </h1>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-white border border-white/40 px-8 py-3 text-sm tracking-wider uppercase hover:bg-white hover:text-gray-900 transition-all duration-300 mt-4"
              >
                More details
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== INTRODUCTION SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-8 font-light">
              Situated in Belfast's historic Cathedral Quarter, we represent the interests of both 
              local and national clients. Over 200 years of dedicated service, legal expertise and 
              commitment to our clients have led to Sarah Michelle being regarded as one of the 
              region's most reputable and well respected law firms.
            </p>
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-light">
              We have been providing exemplary service to our clients since our formation. As one 
              of the longest-established firms of solicitors, we have decades of knowledge and 
              generations of unique experience, which allow us to support our clients to the 
              highest standards.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== WHAT WE DO SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-[#F8F6F3]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-[#8B7355] text-sm tracking-[0.2em] uppercase mb-4">What we do</p>
            <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-8 max-w-3xl leading-tight" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              We provide our clients with an exclusive, highly professional legal advice service.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl font-light">
              With expertise across a wide range of practice areas, including property, commercial 
              matters, wills, trusts, family law and more, our highly trained and hand-picked team 
              of solicitors is ready to help you. Our focus on long-term client loyalty, personal 
              service and attention to detail in all we do sets us apart from our competitors.
            </p>
            <Link
              to="/what-we-do"
              className="inline-flex items-center gap-2 text-[#1a1a1a] border border-[#1a1a1a]/30 px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 mt-8"
            >
              More details
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FOR BUSINESS SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[#8B7355] text-sm tracking-[0.2em] uppercase mb-4">For business</p>
              <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-6 leading-tight" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Expert commercial legal advice
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                At Sarah Michelle, we have specialised in providing pragmatic and appropriate 
                legal advice to commercial businesses for many years. Our expertise in commercial 
                legal matters makes us the ideal choice for anything from starting a new business 
                venture to commercial contracts and restructuring.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                With many of our clients returning to us time and time again for expert legal 
                advice, we are ideally placed to support their business needs.
              </p>
              <Link
                to="/businesses"
                className="inline-flex items-center gap-2 text-[#1a1a1a] border border-[#1a1a1a]/30 px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
              >
                More details
                <FiArrowRight />
              </Link>
            </div>
            <div className="h-[400px] lg:h-[500px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop"
                alt="Business legal services"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOR INDIVIDUALS SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-[#F8F6F3]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="h-[400px] lg:h-[500px] overflow-hidden order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=1000&fit=crop"
                alt="Individual legal services"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-[#8B7355] text-sm tracking-[0.2em] uppercase mb-4">For individuals</p>
              <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-6 leading-tight" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Personal legal services with care
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                Alongside our professional commercial services, our team is also dedicated to 
                providing sound and insightful advice to private individuals across a range of 
                different legal areas.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                We handle each case with personalised service, empathy and professional care, 
                from moving home to making a will, through to matrimonial and litigation matters. 
                If you are looking for a client-focused and approachable legal team which adopts 
                a common-sense approach, make us your first choice.
              </p>
              <Link
                to="/individuals"
                className="inline-flex items-center gap-2 text-[#1a1a1a] border border-[#1a1a1a]/30 px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
              >
                More details
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LATEST NEWS SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[#8B7355] text-sm tracking-[0.2em] uppercase mb-4">Latest news</p>
          
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {newsItems.map((item, index) => (
              <article key={index} className="group cursor-pointer">
                <span className="text-[#8B7355] text-xs tracking-[0.2em] uppercase mb-3 block">
                  {item.category}
                </span>
                <h3 className="text-2xl lg:text-3xl text-[#1a1a1a] mb-3 group-hover:text-[#8B7355] transition-colors" 
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {item.title}
                </h3>
                <p className="text-[#8B7355] text-sm mb-3">{item.date}</p>
                <p className="text-gray-600 leading-relaxed font-light">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ENQUIRY FORM SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-[#F8F6F3]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-6 leading-tight" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                How can we help?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed font-light">
                Send us your contact information and one of our team will be in touch to discuss 
                your requirements.
              </p>
            </div>

            <form onSubmit={handleEnquiry} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#8B7355] outline-none transition-colors"
                  required
                />
              </div>
              
              <div>
                <select
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] focus:border-[#8B7355] outline-none transition-colors"
                >
                  <option value="">Administration of estates & trusts</option>
                  <option value="business">For business</option>
                  <option value="individual">For individuals</option>
                </select>
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#8B7355] outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telephone"
                  className="w-full px-0 py-3 bg-transparent border-b border-gray-300 text-[#1a1a1a] placeholder-gray-400 focus:border-[#8B7355] outline-none transition-colors"
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

    </div>
  )
}

export default Home