import { useState, useEffect } from 'react'
import { FiBook, FiDollarSign, FiUser } from 'react-icons/fi'
import { bookAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const Books = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await bookAPI.getAll()
      setBooks(data.data)
    } catch (error) {
      setError('Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={fetchBooks} />

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4 animate-fade-in-up">
            Legal Books & Resources
          </h1>
          <p className="text-dark-400 text-lg animate-fade-in-up max-w-2xl mx-auto">
            Comprehensive guides and workbooks to help you understand your legal rights
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {books.length === 0 ? (
            <div className="text-center py-12">
              <FiBook className="text-6xl text-dark-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No books available yet</h3>
              <p className="text-dark-400">Check back soon for new resources</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <div
                  key={book._id}
                  className="group bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-8 hover:border-primary-600/30 hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FiBook className="text-3xl text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {book.title}
                  </h3>
                  
                  {book.subtitle && (
                    <p className="text-primary-400 text-sm mb-3">{book.subtitle}</p>
                  )}
                  
                  <p className="text-dark-400 mb-6 leading-relaxed line-clamp-3">
                    {book.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-dark-500 mb-6">
                    <FiUser className="text-sm" />
                    <span className="text-sm">By {book.author}</span>
                    {book.publishedYear && (
                      <span className="text-sm">• {book.publishedYear}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-dark-700">
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      ${book.price}
                    </span>
                    <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                      Purchase Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Books