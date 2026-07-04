// pages/Home.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiPhone, FiShield, FiUsers, FiBriefcase, FiHome, FiStar, FiPhoneCall, FiMail } from 'react-icons/fi'
import { podcastAPI, bookAPI } from '../services/api'
import toast from 'react-hot-toast'

const Home = () => {
  const [podcasts, setPodcasts] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const testimonials = [
    {
      quote: "Sarah's guidance through my family law case was exceptional. She made a difficult time manageable with her compassion and expertise.",
      author: "Emily Richardson",
      role: "Family Law Client",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "As a business owner, I needed legal counsel I could trust. Sarah Michelle delivered beyond expectations with practical, strategic advice.",
      author: "James Thompson",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      quote: "Professional, responsive, and genuinely caring. Sarah took the time to understand my case and fought tirelessly for my rights.",
      author: "Maria Gonzalez",
      role: "Civil Litigation Client",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      toast.success('Welcome aboard! Check your inbox for our welcome email.')
      setEmail('')
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Full Screen with Background Image */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop"
            alt="Legal office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Hero Content */}
            <div className="animate-slide-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-chocolate/5 border border-chocolate/10 rounded-full mb-8">
                <span className="w-2 h-2 bg-chocolate rounded-full animate-pulse" />
                <span className="text-chocolate text-xs tracking-[0.2em] uppercase font-medium">
                  Trusted Legal Partner
                </span>
              </div>
              
              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-semibold text-chocolate leading-[1.1] mb-6">
                Your trusted
                <br />
                <span className="text-chocolate-dark">legal partner</span>
                <br />
                in every step
              </h1>
              
              <p className="text-taupe text-lg leading-relaxed mb-10 max-w-lg">
                Whether you're an individual seeking personal legal support or a business 
                navigating complex regulations, we provide clear, compassionate guidance 
                tailored to your unique situation.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-chocolate text-white rounded-lg text-sm font-medium hover:bg-chocolate-dark transition-all duration-300 shadow-lg shadow-chocolate/20 hover:shadow-xl hover:shadow-chocolate/30"
                >
                  Schedule Free Consultation
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-chocolate text-chocolate rounded-lg text-sm font-medium hover:bg-chocolate hover:text-white transition-all duration-300"
                >
                  <FiPhone />
                  Call Us Now
                </a>
              </div>

              {/* Google Review Badge */}
              <div className="flex items-center gap-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-border-light inline-flex">
                <img 
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                  alt="Google"
                  className="h-6"
                />
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="text-amber-500 fill-current" />
                    ))}
                  </div>
                  <span className="text-chocolate text-sm font-medium">4.9/5</span>
                  <span className="text-taupe text-sm">• 200+ reviews</span>
                </div>
              </div>
            </div>

            {/* Hero Card */}
            <div className="hidden lg:block animate-slide-right">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-border-light">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
                  alt="Legal consultation"
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <h3 className="font-display text-2xl text-chocolate mb-3">
                  Expert Legal Guidance
                </h3>
                <p className="text-taupe text-sm mb-6">
                  Over 15 years of experience providing trusted legal counsel to individuals and businesses.
                </p>
                <div className="flex items-center gap-4 p-4 bg-cream rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
                    alt="Sarah Michelle"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div>
                    <p className="font-semibold text-chocolate text-sm">Sarah Michelle</p>
                    <p className="text-taupe text-xs">Principal Attorney</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-chocolate text-sm tracking-[0.25em] uppercase font-medium mb-4">What We Do</p>
            <h2 className="font-display text-4xl lg:text-5xl text-chocolate mb-6">
              Legal services for everyone
            </h2>
            <p className="text-taupe max-w-2xl mx-auto text-lg">
              Whether you're an individual seeking justice or a business protecting your interests, 
              we have the expertise to guide you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* For Businesses */}
            <Link
              to="/businesses"
              className="group relative overflow-hidden rounded-2xl bg-cream p-12 hover:shadow-xl transition-all duration-500 animate-fade-up"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-chocolate/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-chocolate rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <FiBriefcase className="text-2xl text-white" />
                </div>
                <h3 className="font-display text-3xl text-chocolate mb-4">
                  For Businesses
                </h3>
                <p className="text-taupe mb-8 leading-relaxed max-w-md">
                  From startups to established enterprises, we provide comprehensive legal solutions 
                  including contracts, compliance, employment law, and dispute resolution.
                </p>
                <span className="inline-flex items-center gap-2 text-chocolate font-medium text-sm group-hover:gap-3 transition-all">
                  Learn More <FiArrowRight />
                </span>
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                alt="Business legal services"
                className="absolute bottom-0 right-0 w-64 h-48 object-cover rounded-tl-2xl opacity-20 group-hover:opacity-30 transition-opacity"
              />
            </Link>

            {/* For Individuals */}
            <Link
              to="/individuals"
              className="group relative overflow-hidden rounded-2xl bg-cream p-12 hover:shadow-xl transition-all duration-500 animate-fade-up"
              style={{ animationDelay: '0.15s' }}
            >
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-chocolate/5 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-chocolate rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <FiHome className="text-2xl text-white" />
                </div>
                <h3 className="font-display text-3xl text-chocolate mb-4">
                  For Individuals
                </h3>
                <p className="text-taupe mb-8 leading-relaxed max-w-md">
                  Personalized legal support for life's important moments - family law, estate planning, 
                  personal injury, criminal defense, and civil litigation.
                </p>
                <span className="inline-flex items-center gap-2 text-chocolate font-medium text-sm group-hover:gap-3 transition-all">
                  Learn More <FiArrowRight />
                </span>
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop"
                alt="Individual legal services"
                className="absolute bottom-0 right-0 w-64 h-48 object-cover rounded-tl-2xl opacity-20 group-hover:opacity-30 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-off-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-left">
              <img 
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop"
                alt="Lawyer at work"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="animate-slide-right">
              <p className="text-chocolate text-sm tracking-[0.25em] uppercase font-medium mb-4">Why Choose Us</p>
              <h2 className="font-display text-4xl lg:text-5xl text-chocolate mb-8">
                Dedicated to your success
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: FiShield,
                    title: 'Proven Track Record',
                    description: '15+ years of successful case resolutions with a 98% client satisfaction rate.'
                  },
                  {
                    icon: FiUsers,
                    title: 'Personal Approach',
                    description: 'Every case receives individual attention. We take time to understand your unique situation.'
                  },
                  {
                    icon: FiPhoneCall,
                    title: 'Always Accessible',
                    description: 'Direct communication with your attorney. Quick responses when you need them most.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 hover:bg-white rounded-lg transition-colors">
                    <div className="w-12 h-12 bg-chocolate/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-chocolate text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-chocolate mb-1">{item.title}</h4>
                      <p className="text-taupe text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-chocolate text-sm tracking-[0.25em] uppercase font-medium mb-4">Testimonials</p>
            <h2 className="font-display text-4xl lg:text-5xl text-chocolate mb-6">
              What our clients say
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="text-center">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-6 border-4 border-cream shadow-lg"
                      />
                      <div className="flex justify-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <FiStar key={i} className="text-amber-500 fill-current" />
                        ))}
                      </div>
                      <blockquote className="font-display text-2xl lg:text-3xl text-chocolate italic leading-relaxed mb-8">
                        "{testimonial.quote}"
                      </blockquote>
                      <p className="text-chocolate font-semibold">{testimonial.author}</p>
                      <p className="text-taupe text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    currentTestimonial === index 
                      ? 'bg-chocolate w-8' 
                      : 'bg-chocolate/20 w-2 hover:bg-chocolate/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-chocolate">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <FiMail className="text-white/60 text-4xl mx-auto mb-6" />
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
              Stay informed with legal insights
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Join our newsletter for practical legal tips, updates, and resources delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-lg focus:border-white/50 outline-none transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-chocolate rounded-lg font-medium hover:bg-cream transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-4xl lg:text-5xl text-chocolate mb-6">
            Ready to discuss your legal needs?
          </h2>
          <p className="text-taupe text-lg mb-12 max-w-xl mx-auto">
            Schedule your free, confidential consultation today. We're here to listen and help you find the best path forward.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-chocolate text-white rounded-lg text-sm font-medium hover:bg-chocolate-dark transition-all shadow-lg shadow-chocolate/20"
            >
              Book Your Consultation
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-3 px-10 py-5 border-2 border-chocolate text-chocolate rounded-lg text-sm font-medium hover:bg-chocolate hover:text-white transition-all"
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