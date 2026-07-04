// pages/Home.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiShield, FiUsers, FiStar, FiChevronLeft, FiChevronRight, FiPause, FiPlay } from 'react-icons/fi'
import { podcastAPI, bookAPI } from '../services/api'
import toast from 'react-hot-toast'

const Home = () => {
  const [podcasts, setPodcasts] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [imageErrors, setImageErrors] = useState({})

  // Hero images with local fallback
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop&auto=format',
      alt: 'Modern legal office interior',
      fallback: '#F5F0EB'
    },
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop&auto=format',
      alt: 'Professional legal consultation',
      fallback: '#F5F0EB'
    },
    {
      url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=1080&fit=crop&auto=format',
      alt: 'Legal documents and workspace',
      fallback: '#F5F0EB'
    }
  ]

  const testimonials = [
    {
      quote: "Sarah's expertise and genuine care transformed a difficult legal situation into a manageable journey.",
      author: "Emily Richardson",
      role: "Family Law Client",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face&auto=format"
    },
    {
      quote: "Professional, strategic, and always accessible. The legal foundation our business needed.",
      author: "James Thompson",
      role: "CEO, Thompson Enterprises",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format"
    },
    {
      quote: "I felt heard and supported throughout my entire case. Sarah fought for me when I couldn't fight for myself.",
      author: "Maria Gonzalez",
      role: "Civil Rights Client",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format"
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [podcastRes, bookRes] = await Promise.allSettled([
          podcastAPI.getAll(),
          bookAPI.getAll()
        ])
        
        // Handle podcast response
        if (podcastRes.status === 'fulfilled') {
          const podcastData = podcastRes.value.data?.data || podcastRes.value.data || []
          setPodcasts(Array.isArray(podcastData) ? podcastData.slice(0, 3) : [])
        } else {
          console.log('Podcasts not available yet')
        }
        
        // Handle book response
        if (bookRes.status === 'fulfilled') {
          const bookData = bookRes.value.data?.data || bookRes.value.data || []
          setBooks(Array.isArray(bookData) ? bookData.slice(0, 3) : [])
        } else {
          console.log('Books not available yet')
        }
      } catch (error) {
        console.log('API not connected yet - showing demo content')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Auto-advance hero slides
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused, heroImages.length])

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  // Mouse parallax effect
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth - 0.5) * 15
    const y = (clientY / window.innerHeight - 0.5) * 15
    setMousePosition({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      toast.success('Thank you for subscribing! Check your inbox for a welcome message.')
      setEmail('')
    }
  }

  const handleImageError = (key) => {
    setImageErrors(prev => ({ ...prev, [key]: true }))
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)

  // Demo podcasts to show when API isn't connected
  const demoPodcasts = [
    {
      _id: '1',
      title: 'Understanding Your Legal Rights',
      description: 'A comprehensive guide to fundamental legal protections every citizen should know.',
      episodeNumber: 1,
      legalTopic: 'Civil Rights',
      duration: '32:15'
    },
    {
      _id: '2',
      title: 'Navigating Family Law',
      description: 'Expert insights on divorce, custody, and family legal matters.',
      episodeNumber: 2,
      legalTopic: 'Family Law',
      duration: '28:45'
    },
    {
      _id: '3',
      title: 'Business Law Essentials',
      description: 'Key legal considerations for entrepreneurs and business owners.',
      episodeNumber: 3,
      legalTopic: 'Business Law',
      duration: '35:20'
    }
  ]

  // Demo books to show when API isn't connected
  const demoBooks = [
    {
      _id: '1',
      title: 'Legal Rights Handbook',
      subtitle: 'A Practical Guide',
      description: 'Comprehensive guide to understanding and protecting your legal rights.',
      price: 29.99,
      author: 'Sarah Michelle'
    },
    {
      _id: '2',
      title: 'Family Law Compass',
      subtitle: 'Navigating Difficult Times',
      description: 'Essential resource for anyone dealing with family legal matters.',
      price: 34.99,
      author: 'Sarah Michelle'
    },
    {
      _id: '3',
      title: 'Business Legal Toolkit',
      subtitle: 'Protect Your Enterprise',
      description: 'Everything entrepreneurs need to know about business law.',
      price: 39.99,
      author: 'Sarah Michelle'
    }
  ]

  const displayPodcasts = podcasts.length > 0 ? podcasts : demoPodcasts
  const displayBooks = books.length > 0 ? books : demoBooks

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center bg-[#F5F0EB] overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                currentSlide === index ? 'opacity-30' : 'opacity-0'
              }`}
            >
              {!imageErrors[index] ? (
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center"
                  onError={() => handleImageError(index)}
                  style={{
                    transform: currentSlide === index 
                      ? `scale(1.02) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                      : 'scale(1)',
                    transition: 'transform 8s ease-out'
                  }}
                />
              ) : (
                <div 
                  className="w-full h-full"
                  style={{ backgroundColor: image.fallback }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16 w-full py-20">
          <div className="max-w-3xl">
            {/* Small label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-[#4A3728]/40" />
              <span className="text-[#4A3728]/60 text-xs tracking-[0.3em] uppercase font-medium">
                Distinguished Legal Practice
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl lg:text-7xl xl:text-8xl text-[#4A3728] leading-[1.05] mb-8" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Legal counsel
              <br />
              of <span className="italic font-light">distinction</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#4A3728]/60 text-lg lg:text-xl leading-relaxed mb-12 max-w-xl font-light">
              Providing sophisticated legal guidance with integrity, 
              precision, and an unwavering commitment to your success.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#4A3728] text-white text-sm tracking-wider uppercase hover:bg-[#3C2D20] transition-all duration-500"
              >
                Schedule Consultation
                <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-3 px-10 py-5 border border-[#4A3728]/20 text-[#4A3728] text-sm tracking-wider uppercase hover:border-[#4A3728] hover:bg-[#4A3728]/5 transition-all duration-500"
              >
                <FiPhone className="text-base" />
                (555) 123-4567
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {testimonials.map((t, i) => (
                    <img
                      key={i}
                      src={t.image}
                      alt={t.author}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ))}
                </div>
                <span className="text-[#4A3728]/60 text-sm">Trusted by 2000+ clients</span>
              </div>
              <div className="w-[1px] h-6 bg-[#4A3728]/20 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-amber-500 fill-current text-sm" />
                  ))}
                </div>
                <span className="text-[#4A3728]/60 text-sm">4.9 rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-8 lg:left-16 z-20 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[2px] transition-all duration-500 ${
                currentSlide === index 
                  ? 'w-12 bg-[#4A3728]' 
                  : 'w-6 bg-[#4A3728]/30 hover:bg-[#4A3728]/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ==================== WHO WE SERVE ==================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="text-center mb-16 lg:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-[#4A3728]/30" />
              <span className="text-[#4A3728]/50 text-xs tracking-[0.3em] uppercase font-medium">
                What We Do
              </span>
              <div className="w-12 h-[1px] bg-[#4A3728]/30" />
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl text-[#4A3728] mb-6" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Legal services tailored to you
            </h2>
            <p className="text-[#4A3728]/50 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're an individual seeking justice or a business protecting its future, 
              we provide the expertise and dedication your case deserves.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Businesses Card */}
            <Link
              to="/businesses"
              className="group relative bg-[#F5F0EB] overflow-hidden min-h-[400px] lg:min-h-[500px] flex flex-col lg:flex-row"
            >
              <div className="p-10 lg:p-16 flex flex-col justify-center flex-1 relative z-10">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center mb-6 lg:mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <FiShield className="text-xl lg:text-2xl text-[#4A3728]" />
                </div>
                <h3 className="text-3xl lg:text-4xl xl:text-5xl text-[#4A3728] mb-4 lg:mb-6" 
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  For Businesses
                </h3>
                <p className="text-[#4A3728]/50 leading-relaxed mb-6 lg:mb-8 font-light text-sm lg:text-base">
                  Comprehensive legal solutions for companies of all sizes. From formation 
                  to expansion, we protect what you've built.
                </p>
                <span className="inline-flex items-center gap-3 text-[#4A3728] text-sm tracking-wider uppercase font-medium group-hover:gap-4 transition-all">
                  Explore Business Services
                  <FiArrowRight />
                </span>
              </div>
              <div className="lg:w-2/5 h-48 lg:h-auto relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop&auto=format"
                  alt="Business legal services"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </Link>

            {/* Individuals Card */}
            <Link
              to="/individuals"
              className="group relative bg-[#F5F0EB] overflow-hidden min-h-[400px] lg:min-h-[500px] flex flex-col lg:flex-row"
            >
              <div className="p-10 lg:p-16 flex flex-col justify-center flex-1 relative z-10">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white rounded-full flex items-center justify-center mb-6 lg:mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <FiUsers className="text-xl lg:text-2xl text-[#4A3728]" />
                </div>
                <h3 className="text-3xl lg:text-4xl xl:text-5xl text-[#4A3728] mb-4 lg:mb-6" 
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  For Individuals
                </h3>
                <p className="text-[#4A3728]/50 leading-relaxed mb-6 lg:mb-8 font-light text-sm lg:text-base">
                  Personal legal support for life's important moments. We listen, 
                  understand, and advocate passionately on your behalf.
                </p>
                <span className="inline-flex items-center gap-3 text-[#4A3728] text-sm tracking-wider uppercase font-medium group-hover:gap-4 transition-all">
                  Explore Personal Services
                  <FiArrowRight />
                </span>
              </div>
              <div className="lg:w-2/5 h-48 lg:h-auto relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=1000&fit=crop&auto=format"
                  alt="Individual legal services"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="py-16 lg:py-20 bg-[#4A3728]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: '15+', label: 'Years of Excellence' },
              { number: '2000+', label: 'Clients Represented' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '500+', label: 'Cases Resolved' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl lg:text-5xl xl:text-6xl text-white mb-2 lg:mb-3 font-light" 
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {stat.number}
                </p>
                <p className="text-white/50 text-xs lg:text-sm tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="py-20 lg:py-24 bg-[#F5F0EB]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl text-[#4A3728] mb-4 lg:mb-6" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Stay <span className="italic font-light">informed</span>
            </h2>
            <p className="text-[#4A3728]/50 text-base lg:text-lg mb-8 lg:mb-10 font-light leading-relaxed">
              Receive thoughtful legal insights, updates, and resources delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white border border-[#4A3728]/10 text-[#4A3728] placeholder-[#4A3728]/30 focus:border-[#4A3728]/40 outline-none transition-all text-sm"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#4A3728] text-white text-sm tracking-wider uppercase hover:bg-[#3C2D20] transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative py-28 lg:py-40 bg-[#4A3728] overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl text-white mb-4 lg:mb-6" 
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Ready to <span className="italic font-light">begin</span>?
          </h2>
          <p className="text-white/60 text-lg lg:text-xl mb-10 lg:mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Your first consultation is confidential and without obligation. 
            Let's discuss how we can help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-[#4A3728] text-sm tracking-wider uppercase hover:bg-[#F5F0EB] transition-all"
            >
              Schedule Consultation
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-3 px-10 py-5 border border-white/30 text-white text-sm tracking-wider uppercase hover:bg-white/10 transition-all"
            >
              <FiPhone />
              (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home