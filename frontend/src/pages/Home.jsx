// pages/Home.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import { podcastAPI, bookAPI } from '../services/api'

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

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Maclaines Style */}
      <section className="relative min-h-screen flex items-center bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center py-20">
            {/* Hero Content */}
            <div className="animate-slide-left">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">
                Distinguished Legal Practice
              </p>
              
              <h1 className="font-display text-5xl lg:text-7xl font-light text-charcoal leading-[1.1] mb-8">
                Legal counsel
                <br />
                of <span className="italic text-gold">distinction</span>
              </h1>
              
              <p className="text-taupe text-lg leading-relaxed mb-12 max-w-lg font-light">
                Providing sophisticated legal solutions with unwavering commitment 
                to excellence, integrity, and client success.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-white tracking-wider uppercase text-sm hover:bg-gold-dark transition-all duration-500"
                >
                  Schedule Consultation
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
                <Link
                  to="/podcasts"
                  className="inline-flex items-center gap-3 px-10 py-4 border border-gold text-gold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-all duration-500"
                >
                  <FiPlay className="text-sm" />
                  Listen
                </Link>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="hidden lg:block animate-fade-in">
              <div className="relative">
                <div className="aspect-[4/5] bg-cream border border-border-light" />
                <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-gold/20" />
                <div className="absolute -top-8 -left-8 w-48 h-48 border border-gold/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      {!loading && (
        <>
          {/* Podcasts Section */}
          <section className="py-24 bg-cream">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
              <div className="text-center mb-16">
                <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Listen</p>
                <h2 className="font-display text-4xl lg:text-5xl text-charcoal mb-4">
                  Latest Podcasts
                </h2>
                <p className="text-taupe max-w-xl mx-auto">
                  Thoughtful conversations on legal matters that matter.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {podcasts.map((podcast, index) => (
                  <div
                    key={podcast._id}
                    className="group bg-white p-8 hover:shadow-elegant transition-all duration-500 animate-fade-up"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="mb-6">
                      <span className="text-gold text-xs tracking-[0.2em] uppercase">
                        Episode {podcast.episodeNumber}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-charcoal mb-4 group-hover:text-gold transition-colors">
                      {podcast.title}
                    </h3>
                    <p className="text-taupe text-sm leading-relaxed mb-6 line-clamp-2">
                      {podcast.description}
                    </p>
                    <Link
                      to={`/podcasts/${podcast._id}`}
                      className="inline-flex items-center gap-2 text-gold text-sm tracking-wider uppercase group/link"
                    >
                      Listen Now
                      <FiArrowRight className="group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Books Section */}
          <section className="py-24 bg-warm-white">
            <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
              <div className="text-center mb-16">
                <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Read</p>
                <h2 className="font-display text-4xl lg:text-5xl text-charcoal mb-4">
                  Books & Resources
                </h2>
                <p className="text-taupe max-w-xl mx-auto">
                  Comprehensive guides crafted with expertise and care.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book, index) => (
                  <div
                    key={book._id}
                    className="group bg-white p-8 border border-border-light hover:border-gold/30 hover:shadow-elegant transition-all duration-500 animate-fade-up"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <h3 className="font-display text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors">
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <p className="text-gold text-sm mb-4 italic">{book.subtitle}</p>
                    )}
                    <p className="text-taupe text-sm leading-relaxed mb-6 line-clamp-2">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl text-gold">${book.price}</span>
                      <Link
                        to="/books"
                        className="text-taupe hover:text-gold text-sm tracking-wider uppercase transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA Section */}
      <section className="py-32 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">Begin Your Journey</p>
          <h2 className="font-display text-4xl lg:text-6xl text-white font-light mb-8">
            Ready to discuss
            <br />
            your legal needs?
          </h2>
          <p className="text-taupe text-lg mb-12 max-w-xl mx-auto font-light">
            Schedule a confidential consultation with our experienced team.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 bg-gold text-white tracking-wider uppercase text-sm hover:bg-gold-light transition-all duration-500"
          >
            Enquire Now
            <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home