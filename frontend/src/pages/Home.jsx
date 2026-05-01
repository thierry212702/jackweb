import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlay, FiBook, FiArrowRight, FiShield, FiUsers, FiAward, FiStar, FiChevronRight } from 'react-icons/fi'
import { podcastAPI, bookAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const Home = () => {
  const [podcasts, setPodcasts] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

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

  const stats = [
    { icon: FiShield, number: '15+', label: 'Years Experience' },
    { icon: FiUsers, number: '2000+', label: 'Clients Served' },
    { icon: FiAward, number: '98%', label: 'Success Rate' },
    { icon: FiStar, number: '500+', label: '5-Star Reviews' },
  ]

  if (loading) return <LoadingSpinner />

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-dark-950 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-600/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary-900/20 to-transparent" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-1 h-1 bg-primary-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-10px',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/10 border border-primary-600/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                <span className="text-sm text-primary-400 font-medium">Free Consultation Available</span>
              </div>
              
              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                Expert Legal{' '}
                <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                  Guidance
                </span>
                <br />
                For Your Peace of Mind
              </h1>
              
              <p className="text-lg text-dark-400 mb-8 max-w-lg leading-relaxed">
                Navigate complex legal challenges with confidence. 
                Professional legal services tailored to your unique needs.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary-600/25 transform hover:-translate-y-0.5 transition-all"
                >
                  Get Free Consultation
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/podcasts"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-dark-800/50 border border-primary-600/30 rounded-xl text-white font-semibold hover:bg-primary-600/10 hover:border-primary-500 transition-all"
                >
                  <FiPlay /> Listen to Podcast
                </Link>
              </div>
            </div>

            {/* Hero Card */}
            <div className="animate-slide-in-right hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 to-primary-400/20 rounded-3xl blur-2xl animate-pulse-slow" />
                <div className="relative bg-dark-800/50 backdrop-blur-xl border border-primary-600/30 rounded-2xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-600/25">
                      <FiShield className="text-3xl text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">
                      Book a Consultation
                    </h3>
                    <p className="text-dark-400 mb-6">
                      Get expert legal advice tailored to your situation
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
                    >
                      Schedule Now <FiChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-dark-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-dark-800/50 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-8 text-center hover:border-primary-600/30 hover:bg-dark-800/80 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="text-3xl text-primary-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-dark-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts Section */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Latest Podcast Episodes
            </h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto mb-8">
              Expert legal insights and practical advice in every episode
            </p>
            <Link
              to="/podcasts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800/50 border border-primary-600/30 rounded-xl text-white hover:bg-primary-600/10 transition-all"
            >
              View All Episodes <FiArrowRight />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast, index) => (
              <div
                key={podcast._id}
                className="group bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full text-xs font-semibold">
                    EP {podcast.episodeNumber}
                  </span>
                  <span className="text-sm text-primary-400">{podcast.legalTopic}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {podcast.title}
                </h3>
                <p className="text-dark-400 mb-6 line-clamp-2">{podcast.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary-400">{podcast.duration}</span>
                  <Link
                    to={`/podcasts/${podcast._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 text-primary-400 rounded-lg hover:bg-primary-600 hover:text-white transition-all text-sm font-medium"
                  >
                    <FiPlay className="text-sm" /> Listen Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Legal Books & Resources
            </h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto mb-8">
              Comprehensive guides to help you understand your rights
            </p>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 px-6 py-3 bg-dark-800/50 border border-primary-600/30 rounded-xl text-white hover:bg-primary-600/10 transition-all"
            >
              Browse All Books <FiBook />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <div
                key={book._id}
                className="group bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FiBook className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{book.title}</h3>
                {book.subtitle && (
                  <p className="text-sm text-primary-400 mb-2">{book.subtitle}</p>
                )}
                <p className="text-dark-400 mb-6 line-clamp-2">{book.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary-400">${book.price}</span>
                  <button className="px-4 py-2 bg-primary-600/20 text-primary-400 rounded-lg hover:bg-primary-600 hover:text-white transition-all text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIj48L2NpcmNsZT48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-scale-in">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule your free consultation today and take the first step towards resolving your legal matters.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-white/20 transform hover:-translate-y-0.5 transition-all"
          >
            Free Consultation <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home