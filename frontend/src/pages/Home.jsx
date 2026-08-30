// pages/Home.jsx
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
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
  const [textVisible, setTextVisible] = useState(true)

  const heroSlides = [
    {
      image: '/images/hero/jack4.jpg',
      alt: 'JACK GENTIL Legal Services',
      title: 'Emeritus',
      subtitle: 'Chief Justice Prof. RUGEGE Sam',
      description: 'Justice Sam Rugege retired in December of 2019, after serving eight years as Chief Justice and eight years as Deputy Chief Justice of the Supreme Court of Rwanda.'
    },
    {
      image: '/images/hero/jack2.jpg',
      alt: 'Professional Legal Consultation',
      title: '',
      subtitle: 'BERNADETTE UWICYEZA',
      description: 'Bernadette UWICYEZA is an ADR advisor to the Judiciary of Rwanda, responsible for the design and implementation of court-annexed mediation in the Rwandan court system.'
    },
    {
      image: '/images/hero/jack1.jpg',
      alt: 'Expert Legal Guidance',
      title: '',
      subtitle: 'HARRISON MUTABAZI',
      description: 'Harrison Mutabazi is a High Court Judge, who currently serves as an inspectorate of the Rwandan Supreme Court and as a judicial spokesperson for the Court.'
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

  // Auto-advance slides with 8-second delay
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setTextVisible(false)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setTextVisible(true)
      }, 1000)
    }, 8000)
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
  }

  const nextSlide = useCallback(() => {
    setTextVisible(false)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      setTextVisible(true)
    }, 1000)
  }, [])

  const prevSlide = useCallback(() => {
    setTextVisible(false)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
      setTextVisible(true)
    }, 1000)
  }, [])

  return (
    <div className="overflow-hidden bg-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <section 
        className="relative w-full overflow-hidden bg-[#1a1a1a]" 
        style={{ 
          height: '110vh', 
          minHeight: '110vh',
          marginTop: '-80px',
          paddingTop: '0',
          position: 'relative',
          paddingBottom: '10vh'
        }}
      >
        
        {/* Slideshow */}
        <div className="absolute inset-0" style={{ 
          height: '110vh',
          minHeight: '110vh',
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0 
        }}>
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
                currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ 
                height: '110vh',
                minHeight: '110vh',
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0 
              }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                  currentSlide === index ? 'scale-110' : 'scale-100'
                }`}
                loading="eager"
                style={{ 
                  height: '110vh',
                  minHeight: '110vh',
                  width: '100%', 
                  objectFit: 'cover' 
                }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40 z-20" style={{ 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            height: '110vh',
            minHeight: '110vh'
          }} />
        </div>

        {/* Slide Controls */}
        <div className="absolute right-10 z-30 flex items-center gap-3" style={{ bottom: '8vh' }}>
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white hover:border-white/50 transition-all duration-300"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="text-lg" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white hover:border-white/50 transition-all duration-300"
            aria-label="Next slide"
          >
            <FiChevronRight className="text-lg" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute left-10 z-30 flex gap-3" style={{ bottom: '8vh' }}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setTextVisible(false)
                setTimeout(() => {
                  setCurrentSlide(index)
                  setTextVisible(true)
                }, 1000)
              }}
              className={`h-[2px] transition-all duration-500 ${
                currentSlide === index 
                  ? 'w-12 bg-white' 
                  : 'w-6 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content - Text Only (No Buttons) */}
        <div className="relative z-30 h-full flex items-center justify-center" style={{ 
          height: '110vh',
          minHeight: '110vh'
        }}>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-3xl mx-auto text-center">
              <div className={`transition-all duration-1000 ease-in-out ${
                textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}>
                <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-6">
                  Welcome to JACK GENTIL
                </p>
                <h1 className="text-white text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6" 
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {heroSlides[currentSlide].title}<br />
                  <span className="italic font-light text-3xl lg:text-4xl xl:text-5xl">{heroSlides[currentSlide].subtitle}</span>
                </h1>
                <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-light">
                  {heroSlides[currentSlide].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== INTRODUCTION SECTION ==================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <p className="text-gray-600 text-lg lg:text-xl leading-relaxed mb-8 font-light">
              Situated in the historic Cathedral Quarter, we represent the interests of both 
              local and national clients. Over 200 years of dedicated service, legal expertise and 
              commitment to our clients have led to JACK GENTIL being regarded as one of the 
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
          <div className="mb-16">
            <p className="text-[#8B7355] text-sm tracking-[0.2em] uppercase mb-4">What we do</p>
            <h2 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-8 max-w-3xl leading-tight" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              We provide our clients with an exclusive, highly professional legal advice service.
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl font-light">
              With expertise across a wide range of practice areas, including property, commercial 
              matters, wills, trusts, family law and more, our highly trained and hand-picked team 
              of solicitors is ready to help you.
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
                At JACK GENTIL, we have specialised in providing pragmatic and appropriate 
                legal advice to commercial businesses for many years.
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
                src="/images/business/jack5.jpg"
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
                src="/images/individual/jack6.jpg"
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
                Our team is dedicated to providing sound and insightful advice to private 
                individuals across a range of different legal areas.
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
                Send us your contact information and one of our team will be in touch.
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