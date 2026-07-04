// pages/Home.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPhone, FiShield, FiUsers, FiAward, FiStar, FiChevronLeft, FiChevronRight, FiPause, FiPlay } from 'react-icons/fi'
import { podcastAPI, bookAPI } from '../services/api'
import useScrollReveal from '../hooks/useScrollReveal'
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

  // Refs for scroll reveal sections
  const heroRef = useScrollReveal({ threshold: 0.1 })
  const whoWeServeRef = useScrollReveal({ threshold: 0.15 })
  const statsRef = useScrollReveal({ threshold: 0.2 })
  const testimonialsRef = useScrollReveal({ threshold: 0.15 })
  const newsletterRef = useScrollReveal({ threshold: 0.2 })
  const ctaRef = useScrollReveal({ threshold: 0.15 })

  // Hero images for slideshow
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop',
      alt: 'Modern legal office interior'
    },
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop',
      alt: 'Professional legal consultation'
    },
    {
      url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=1080&fit=crop',
      alt: 'Legal documents and workspace'
    }
  ]

  // Testimonial images
  const testimonialImages = [
    {
      quote: "Sarah's expertise and genuine care transformed a difficult legal situation into a manageable journey. Her guidance was invaluable.",
      author: "Emily Richardson",
      role: "Family Law Client",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
    },
    {
      quote: "Professional, strategic, and always accessible. Sarah Michelle provided the legal foundation our growing business needed.",
      author: "James Thompson",
      role: "CEO, Thompson Enterprises",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    },
    {
      quote: "I felt heard and supported throughout my entire case. Sarah fought for me when I couldn't fight for myself.",
      author: "Maria Gonzalez",
      role: "Civil Rights Client",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [podcastRes, bookRes] = await Promise.all([
          podcastAPI.getAll(),
          bookAPI.getAll()
        ])
        setPodcasts(podcastRes.data.data.slice(0, 3))
        setBooks(bookRes.data.data.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch data:', error)
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
      setCurrentTestimonial((prev) => (prev + 1) % testimonialImages.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonialImages.length])

  // Mouse parallax effect
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth - 0.5) * 20
    const y = (clientY / window.innerHeight - 0.5) * 20
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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)

  return (
    <div className="overflow-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-warm-cream overflow-hidden reveal-on-scroll">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover object-center"
                style={{
                  transform: currentSlide === index 
                    ? `scale(1.05) translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    : 'scale(1)',
                  transition: 'transform 8s ease-out'
                }}
              />
            </div>
          ))}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/70" />
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-12 right-12 z-20 flex items-center gap-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-chocolate/10 flex items-center justify-center text-chocolate hover:bg-white transition-all"
            aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
          >
            {isPaused ? <FiPlay className="text-sm" /> : <FiPause className="text-sm" />}
          </button>
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-chocolate/10 flex items-center justify-center text-chocolate hover:bg-white transition-all"
            aria-label="Previous slide"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-chocolate/10 flex items-center justify-center text-chocolate hover:bg-white transition-all"
            aria-label="Next slide"
          >
            <FiChevronRight />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-12 z-20 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-[2px] transition-all duration-500 ${
                currentSlide === index 
                  ? 'w-12 bg-chocolate' 
                  : 'w-6 bg-chocolate/30 hover:bg-chocolate/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16 w-full py-32">
          <div className="max-w-3xl">
            {/* Small label */}
            <div className="flex items-center gap-3 mb-8 animate-fade-down">
              <div className="w-12 h-[1px] bg-chocolate/40" />
              <span className="text-chocolate/60 text-xs tracking-[0.3em] uppercase font-medium">
                Distinguished Legal Practice
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl text-chocolate leading-[1.05] mb-8 animate-fade-up">
              Legal counsel
              <br />
              of <span className="italic font-light">distinction</span>
            </h1>

            {/* Subtitle */}
            <p className="text-chocolate/60 text-lg lg:text-xl leading-relaxed mb-12 max-w-xl animate-fade-up delay-200 font-light">
              Providing sophisticated legal guidance with integrity, 
              precision, and an unwavering commitment to your success.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-5 animate-fade-up delay-400">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 px-10 py-5 bg-chocolate text-white text-sm tracking-wider uppercase hover:bg-chocolate-dark transition-all duration-500"
              >
                Schedule Consultation
                <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center gap-4 px-10 py-5 border border-chocolate/20 text-chocolate text-sm tracking-wider uppercase hover:border-chocolate hover:bg-chocolate/5 transition-all duration-500"
              >
                <FiPhone className="text-base" />
                (555) 123-4567
              </a>
            </div>

            {/* Review badge */}
            <div className="mt-16 flex flex-wrap items-center gap-8 animate-fade-up delay-600">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {testimonialImages.map((t, i) => (
                    <img
                      key={i}
                      src={t.image}
                      alt={t.author}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <span className="text-chocolate/60 text-sm">Trusted by 2000+ clients</span>
              </div>
              <div className="w-[1px] h-8 bg-chocolate/20 hidden sm:block" />
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-amber-500 fill-current text-sm" />
                  ))}
                </div>
                <span className="text-chocolate/60 text-sm">4.9 rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-chocolate/10 rounded-full animate-float hidden lg:block" 
          style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-40 right-60 w-20 h-20 border border-chocolate/5 rounded-full animate-float hidden lg:block"
          style={{ animationDelay: '2s' }} />
      </section>

      {/* ==================== WHO WE SERVE ==================== */}
      <section ref={whoWeServeRef} className="py-32 bg-white reveal-on-scroll">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-chocolate/30" />
              <span className="text-chocolate/50 text-xs tracking-[0.3em] uppercase font-medium">
                What We Do
              </span>
              <div className="w-12 h-[1px] bg-chocolate/30" />
            </div>
            <h2 className="font-display text-5xl lg:text-6xl text-chocolate mb-6">
              Legal services tailored to you
            </h2>
            <p className="text-chocolate/50 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Whether you're an individual seeking justice or a business protecting its future, 
              we provide the expertise and dedication your case deserves.
            </p>
          </div>

          {/* Two Cards */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Businesses Card */}
            <Link
              to="/businesses"
              className="group relative bg-warm-cream overflow-hidden"
            >
              <div className="grid lg:grid-cols-5 min-h-[500px]">
                <div className="lg:col-span-3 p-12 lg:p-16 flex flex-col justify-center relative z-10">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <FiShield className="text-2xl text-chocolate" />
                  </div>
                  <h3 className="font-display text-4xl lg:text-5xl text-chocolate mb-6 group-hover:text-chocolate-dark transition-colors">
                    For Businesses
                  </h3>
                  <p className="text-chocolate/50 leading-relaxed mb-8 font-light">
                    Comprehensive legal solutions for companies of all sizes. From formation 
                    to expansion, we protect what you've built.
                  </p>
                  <span className="inline-flex items-center gap-3 text-chocolate text-sm tracking-wider uppercase font-medium group-hover:gap-4 transition-all">
                    Explore Business Services
                    <FiArrowRight />
                  </span>
                </div>
                <div className="lg:col-span-2 relative overflow-hidden img-hover-zoom">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=1000&fit=crop"
                    alt="Business legal services"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-warm-cream lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                </div>
              </div>
            </Link>

            {/* Individuals Card */}
            <Link
              to="/individuals"
              className="group relative bg-warm-cream overflow-hidden"
            >
              <div className="grid lg:grid-cols-5 min-h-[500px]">
                <div className="lg:col-span-3 p-12 lg:p-16 flex flex-col justify-center relative z-10">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <FiUsers className="text-2xl text-chocolate" />
                  </div>
                  <h3 className="font-display text-4xl lg:text-5xl text-chocolate mb-6 group-hover:text-chocolate-dark transition-colors">
                    For Individuals
                  </h3>
                  <p className="text-chocolate/50 leading-relaxed mb-8 font-light">
                    Personal legal support for life's important moments. We listen, 
                    understand, and advocate passionately on your behalf.
                  </p>
                  <span className="inline-flex items-center gap-3 text-chocolate text-sm tracking-wider uppercase font-medium group-hover:gap-4 transition-all">
                    Explore Personal Services
                    <FiArrowRight />
                  </span>
                </div>
                <div className="lg:col-span-2 relative overflow-hidden img-hover-zoom">
                  <img
                    src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=1000&fit=crop"
                    alt="Individual legal services"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-warm-cream lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section ref={statsRef} className="py-20 bg-chocolate reveal-on-scroll">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: '15+', label: 'Years of Excellence' },
              { number: '2000+', label: 'Clients Represented' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '500+', label: 'Cases Resolved' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-5xl lg:text-6xl text-white mb-3 font-light">
                  {stat.number}
                </p>
                <p className="text-white/50 text-sm tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section ref={testimonialsRef} className="py-32 bg-white reveal-on-scroll">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left - Image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=1000&fit=crop"
                  alt="Attorney at work"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating testimonial card */}
              <div className="absolute -bottom-8 -right-8 bg-white p-8 shadow-2xl max-w-xs hidden md:block">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-amber-500 fill-current text-sm" />
                  ))}
                </div>
                <p className="text-chocolate text-sm leading-relaxed mb-3 font-light italic">
                  "Exceptional legal counsel that exceeded all our expectations."
                </p>
                <p className="text-chocolate text-xs font-medium">— Recent Client</p>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-chocolate/30" />
                <span className="text-chocolate/50 text-xs tracking-[0.3em] uppercase font-medium">
                  Client Stories
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-chocolate mb-8">
                What our clients 
                <span className="italic font-light"> say</span>
              </h2>
              
              {/* Testimonial Slides */}
              <div className="relative min-h-[200px]">
                {testimonialImages.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ${
                      currentTestimonial === index 
                        ? 'opacity-100 relative' 
                        : 'opacity-0 absolute inset-0'
                    }`}
                  >
                    <blockquote className="text-chocolate/70 text-xl leading-relaxed mb-8 font-light italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-14 h-14 rounded-full object-cover border-2 border-warm-cream"
                      />
                      <div>
                        <p className="text-chocolate font-medium">{testimonial.author}</p>
                        <p className="text-chocolate/40 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Navigation */}
              <div className="flex gap-3 mt-10">
                {testimonialImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-[2px] transition-all duration-500 ${
                      currentTestimonial === index 
                        ? 'w-12 bg-chocolate' 
                        : 'w-6 bg-chocolate/20 hover:bg-chocolate/40'
                    }`}
                    aria-label={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section ref={newsletterRef} className="py-24 bg-warm-cream reveal-on-scroll">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl lg:text-5xl text-chocolate mb-6">
              Stay <span className="italic font-light">informed</span>
            </h2>
            <p className="text-chocolate/50 text-lg mb-10 font-light leading-relaxed">
              Receive thoughtful legal insights, updates, and resources delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white border border-chocolate/10 text-chocolate placeholder-chocolate/30 focus:border-chocolate/40 outline-none transition-all text-sm"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-chocolate text-white text-sm tracking-wider uppercase hover:bg-chocolate-dark transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section ref={ctaRef} className="relative py-40 bg-chocolate overflow-hidden reveal-on-scroll">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 border border-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <h2 className="font-display text-4xl lg:text-6xl text-white mb-6">
            Ready to <span className="italic font-light">begin</span>?
          </h2>
          <p className="text-white/60 text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Your first consultation is confidential and without obligation. 
            Let's discuss how we can help.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-chocolate text-sm tracking-wider uppercase hover:bg-warm-cream transition-all"
            >
              Schedule Consultation
              <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-4 px-10 py-5 border border-white/30 text-white text-sm tracking-wider uppercase hover:bg-white/10 transition-all"
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