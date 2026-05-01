import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlay, FiClock, FiTag, FiHeadphones } from 'react-icons/fi'
import { podcastAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPodcasts = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await podcastAPI.getAll()
      setPodcasts(data.data)
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to load podcasts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPodcasts()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={fetchPodcasts} />

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4 animate-fade-in-up">
            Legal Podcasts
          </h1>
          <p className="text-dark-400 text-lg animate-fade-in-up">
            Expert insights and practical advice on various legal topics
          </p>
        </div>
      </section>

      {/* Podcasts List */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {podcasts.length === 0 ? (
            <div className="text-center py-12">
              <FiHeadphones className="text-6xl text-dark-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No episodes yet</h3>
              <p className="text-dark-400">Check back soon for new content</p>
            </div>
          ) : (
            <div className="space-y-4">
              {podcasts.map((podcast, index) => (
                <div
                  key={podcast._id}
                  className="group bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">EP {podcast.episodeNumber}</span>
                      </div>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-600/10 text-primary-400 rounded-lg text-sm">
                          <FiTag className="text-sm" /> {podcast.legalTopic}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-dark-700/50 text-dark-400 rounded-lg text-sm">
                          <FiClock className="text-sm" /> {podcast.duration}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {podcast.title}
                      </h3>
                      <p className="text-dark-400 line-clamp-2">{podcast.description}</p>
                      {podcast.keyTakeaways && podcast.keyTakeaways.length > 0 && (
                        <div className="mt-4 p-4 bg-dark-900/50 rounded-xl border-l-2 border-primary-600">
                          <p className="text-sm font-semibold text-primary-400 mb-2">Key Takeaways:</p>
                          <ul className="space-y-1">
                            {podcast.keyTakeaways.map((takeaway, i) => (
                              <li key={i} className="text-sm text-dark-300 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                                {takeaway}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <Link
                      to={`/podcasts/${podcast._id}`}
                      className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl text-white font-semibold transition-all"
                    >
                      <FiPlay /> Listen
                    </Link>
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

export default Podcasts