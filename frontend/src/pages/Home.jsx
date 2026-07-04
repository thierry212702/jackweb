// pages/Home.jsx (Enhanced Version)
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiBook, FiPhone, FiMail, FiDownload, FiStar, FiUsers, FiAward, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { podcastAPI, bookAPI } from '../services/api'
import toast from 'react-hot-toast'

const Home = () => {
  const [podcasts, setPodcasts] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [email, setEmail] = useState('')
  const testimonialRef = useRef(null)

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

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    {
      quote: "Sarah's expertise and compassionate approach made all the difference during my family law case. She truly cares about her clients.",
      author: "Emily Richardson",
      role: "Family Law Client",
      rating: 5
    },
    {
      quote: "Professional, thorough, and always available. Sarah Michelle provided exceptional legal counsel that exceeded all my expectations.",
      author: "James Thompson",
      role: "Corporate Client",
      rating: 5
    },
    {
      quote: "I was nervous about my case, but Sarah's clear communication and strategic approach gave me complete confidence throughout the process.",
      author: "Maria Gonzalez",
      role: "Civil Litigation Client",
      rating: 5
    }
  ]

  const achievements = [
    { icon: FiAward, number: '15+', label: 'Years of Excellence' },
    { icon: FiUsers, number: '2000+', label: 'Clients Represented' },
    { icon: FiStar, number: '98%', label: 'Success Rate' },
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      toast.success('Thank you for subscribing! We\'ll keep you informed.')
      setEmail('')
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center bg-warm-white">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-repeat" 
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} 
        />
        
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center py-20">
            {/* Hero Content */}
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-cream border border-border-light mb-8">
                <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                <span className="text-taupe text-xs tracking-[0.2em] uppercase">
                  Accepting New Clients
                </span>
              </div>
              
              <h1 className="font-display text-5xl lg:text-7xl font-light text-charcoal leading-[1.1] mb-8">
                Your story
                <br />
                <span className="italic text-gold">matters</span> to us
              </h1>
              
              <p className="text-taupe text-lg leading-relaxed mb-12 max-w-lg font-light">
                Every case is unique. Every client deserves personalized attention. 
                We listen, understand, and advocate with dedication and expertise.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-12">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-gold text-white tracking-wider uppercase text-sm hover:bg-gold-dark transition-all duration-500"
                >
                  Start Your Journey
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center gap-3 px-10 py-5 border border-gold text-gold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-all duration-500"
                >
                  <FiPhone className="text-sm" />
                  Call Us
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-8 text-taupe text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-cream border-2 border-white" />
                    ))}
                  </div>
                  <span>Trusted by 2000+ clients</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-gold fill-current text-sm" />
                  ))}
                  <span className="ml-1">5.0 rating</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block animate-fade-in">
              <div className="relative">
                <div className="aspect-[4/5] bg-cream relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-8 left-8 right-8 bottom-8 border border-gold/20" />
                  <div className="absolute top-12 left-12 right-12 bottom-12 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-display text-6xl text-gold italic mb-4">Excellence</p>
                      <p className="text-taupe text-sm tracking-[0.3em] uppercase">in Practice</p>
                    </div>
                  </div>
                </div>
                {/* Floating decorative boxes */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-gold/20 bg-warm-white p-6 flex flex-col justify-center">
                  <p className="font-display text-4xl text-gold">15+</p>
                  <p className="text-taupe text-xs tracking-wider mt-2">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-gold/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Achievements Bar */}
      <section className="py-12 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((item, index) => (
              <div key={index} className="flex items-center gap-6 justify-center md:justify-start animate-fade-up"
                style={{ animationDelay: `${index * 0.2}s` }}>
                <item.icon className="text-gold text-3xl" />
                <div>
                  <p className="font-display text-3xl text-white">{item.number}</p>
                  <p className="text-taupe text-sm tracking-wider">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Our Approach</p>
            <h2 className="font-display text-4xl lg:text-5xl text-charcoal mb-6">
              How we can help you
            </h2>
            <p className="text-taupe max-w-2xl mx-auto font-light leading-relaxed">
              Every legal journey begins with understanding. We take time to listen to your story, 
              assess your needs, and craft a strategy that works for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell Us Your Story',
                description: 'Share your situation in a confidential, judgment-free consultation. We listen carefully to understand your unique circumstances.'
              },
              {
                step: '02',
                title: 'Strategic Planning',
                description: 'Together, we develop a clear, practical strategy tailored to your goals, timeline, and resources.'
              },
              {
                step: '03',
                title: 'Achieve Resolution',
                description: 'With expert advocacy and steady guidance, we work tirelessly to achieve the best possible outcome for you.'
              }
            ].map((item, index) => (
              <div key={index} className="group p-8 border border-border-light hover:border-gold/30 transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${index * 0.2}s` }}>
                <p className="font-display text-4xl text-gold/30 group-hover:text-gold/50 transition-colors mb-6">
                  {item.step}
                </p>
                <h3 className="font-display text-2xl text-charcoal mb-4 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-taupe text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-cream" ref={testimonialRef}>
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Testimonials</p>
            <h2 className="font-display text-4xl lg:text-5xl text-charcoal mb-6">
              What our clients say
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="text-center">
                      <div className="flex justify-center gap-1 mb-8">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FiStar key={i} className="text-gold fill-current" />
                        ))}
                      </div>
                      <blockquote className="font-display text-2xl lg:text-3xl text-charcoal italic leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </blockquote>
                      <p className="text-gold font-medium">{testimonial.author}</p>
                      <p className="text-taupe text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    currentSlide === index ? 'bg-gold w-8' : 'bg-gold/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Resources CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="bg-cream p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 border border-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 border border-gold/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Free Download</p>
              <h2 className="font-display text-3xl lg:text-4xl text-charcoal mb-4">
                Legal Preparation Checklist
              </h2>
              <p className="text-taupe max-w-lg mx-auto mb-8 font-light">
                Everything you need to prepare before your first consultation. 
                Download our comprehensive guide at no cost.
              </p>
              <button className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-white tracking-wider uppercase text-sm hover:bg-gold-dark transition-all duration-500">
                <FiDownload />
                Download Free Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Stay Informed</p>
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
              Join our newsletter
            </h2>
            <p className="text-taupe mb-8 font-light">
              Receive thoughtful insights on legal matters, new podcast episodes, and updates.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-transparent border border-white/20 text-white placeholder-taupe focus:border-gold outline-none transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gold text-white tracking-wider uppercase text-sm hover:bg-gold-dark transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <p className="font-display text-4xl lg:text-5xl text-charcoal mb-6 font-light">
            Ready to begin?
          </p>
          <p className="text-taupe text-lg mb-12 max-w-xl mx-auto font-light">
            Your first consultation is confidential and without obligation. 
            Let's discuss how we can help you move forward.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-12 py-5 bg-gold text-white tracking-wider uppercase text-sm hover:bg-gold-dark transition-all duration-500"
            >
              Schedule Consultation
              <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-3 px-12 py-5 border border-gold text-gold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-all duration-500"
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