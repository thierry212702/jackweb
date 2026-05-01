import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiClock, FiTag, FiCalendar, FiHeadphones, FiPlay } from 'react-icons/fi'
import { podcastAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const PodcastDetail = () => {
  const { id } = useParams()
  const [podcast, setPodcast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const { data } = await podcastAPI.getById(id)
        setPodcast(data.data)
      } catch (error) {
        setError('Failed to load podcast episode')
      } finally {
        setLoading(false)
      }
    }
    fetchPodcast()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!podcast) return <ErrorMessage message="Podcast not found" />

  return (
    <div>
      {/* Back Navigation */}
      <div className="bg-dark-900 border-b border-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/podcasts"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors"
          >
            <FiArrowLeft /> Back to Podcasts
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-fade-in-up">
          {/* Episode Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 border border-primary-600/30 rounded-full mb-6">
              <FiTag className="text-primary-400" />
              <span className="text-primary-400 text-sm font-medium">Episode {podcast.episodeNumber}</span>
            </div>
            
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              {podcast.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-dark-400">
              <span className="flex items-center gap-2">
                <FiTag className="text-primary-400" /> {podcast.legalTopic}
              </span>
              <span className="flex items-center gap-2">
                <FiClock className="text-primary-400" /> {podcast.duration}
              </span>
              <span className="flex items-center gap-2">
                <FiCalendar className="text-primary-400" /> 
                {new Date(podcast.releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-2">
                <FiHeadphones className="text-primary-400" /> 
                {podcast.listenCount || 0} listens
              </span>
            </div>
          </div>

          {/* Audio Player */}
          <div className="bg-gradient-to-r from-dark-800 to-dark-900 border border-primary-600/20 rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center">
                <FiPlay className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Audio Player</h3>
                <p className="text-dark-400 text-sm">Listen to this episode</p>
              </div>
            </div>
            {podcast.audioUrl ? (
              <audio controls className="w-full mt-4">
                <source src={podcast.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="bg-dark-950/50 rounded-xl p-6 text-center">
                <p className="text-dark-400">Audio will be available soon</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-dark-800/30 border border-primary-600/10 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">About This Episode</h2>
                <p className="text-dark-300 leading-relaxed text-lg">
                  {podcast.description}
                </p>
              </div>
            </div>

            <div>
              {podcast.keyTakeaways && podcast.keyTakeaways.length > 0 && (
                <div className="bg-dark-800/30 border border-primary-600/10 rounded-2xl p-8 sticky top-24">
                  <h2 className="text-xl font-bold text-white mb-6">Key Takeaways</h2>
                  <ul className="space-y-4">
                    {podcast.keyTakeaways.map((takeaway, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <span className="w-6 h-6 bg-primary-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="w-2 h-2 bg-primary-400 rounded-full" />
                        </span>
                        <span className="text-dark-300">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Transcript */}
          {podcast.transcript && (
            <div className="mt-8 bg-dark-800/30 border border-primary-600/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Transcript</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-dark-300 leading-relaxed whitespace-pre-wrap">
                  {podcast.transcript}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PodcastDetail