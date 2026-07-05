// pages/admin/PodcastManagement.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiHeadphones, FiArrowLeft, FiClock, FiTag } from 'react-icons/fi'
import { podcastAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const PodcastManagement = () => {
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPodcast, setEditingPodcast] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    legalTopic: '',
    duration: '',
    episodeNumber: '',
    keyTakeaways: ''
  })
  const { isAdmin } = useAuth()

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/'
      return
    }
    fetchPodcasts()
  }, [isAdmin])

  const fetchPodcasts = async () => {
    try {
      const { data } = await podcastAPI.getAll()
      setPodcasts(data.data || data.podcasts || data || [])
    } catch (error) {
      toast.error('Failed to load podcasts')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        episodeNumber: parseInt(formData.episodeNumber),
        keyTakeaways: formData.keyTakeaways.split(',').map(k => k.trim()).filter(k => k)
      }

      if (editingPodcast) {
        await podcastAPI.update(editingPodcast._id, payload)
        toast.success('Podcast updated successfully')
      } else {
        await podcastAPI.create(payload)
        toast.success('Podcast created successfully')
      }
      
      setShowModal(false)
      resetForm()
      fetchPodcasts()
    } catch (error) {
      const message = error.response?.data?.message || 'Operation failed'
      toast.error(message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this podcast?')) return
    try {
      await podcastAPI.delete(id)
      toast.success('Podcast deleted successfully')
      fetchPodcasts()
    } catch (error) {
      toast.error('Failed to delete podcast')
    }
  }

  const handleEdit = (podcast) => {
    setEditingPodcast(podcast)
    setFormData({
      title: podcast.title || '',
      description: podcast.description || '',
      legalTopic: podcast.legalTopic || '',
      duration: podcast.duration || '',
      episodeNumber: podcast.episodeNumber?.toString() || '',
      keyTakeaways: podcast.keyTakeaways?.join(', ') || ''
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setEditingPodcast(null)
    setFormData({
      title: '',
      description: '',
      legalTopic: '',
      duration: '',
      episodeNumber: '',
      keyTakeaways: ''
    })
  }

  const inputClass = "w-full px-4 py-3 bg-white border border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm"

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        
        {/* Header */}
        <div className="mb-12">
          <Link to="/admin" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#C4956A] transition-colors mb-6 text-sm">
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C4956A]" />
            <span className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">
              Admin Panel
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-2" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Podcast Management
              </h1>
              <p className="text-gray-500 font-light">
                {podcasts.length} episodes total
              </p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowModal(true)
              }}
              className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#333] transition-all"
            >
              <FiPlus /> Add New Episode
            </button>
          </div>
        </div>

        {/* Podcasts Grid */}
        {podcasts.length === 0 ? (
          <div className="text-center py-16 bg-[#F8F6F3]">
            <FiHeadphones className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-[#1a1a1a] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              No episodes yet
            </h3>
            <p className="text-gray-500 font-light">Click the button above to add your first episode</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast, index) => (
              <div
                key={podcast._id}
                className="group border border-gray-200 hover:border-[#C4956A]/30 hover:bg-[#F8F6F3] transition-all duration-300 flex flex-col"
              >
                <div className="p-8 flex-grow">
                  {/* Episode Number */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-[#F8F6F3] flex items-center justify-center group-hover:bg-[#1a1a1a] transition-all">
                      <span className="text-xl text-[#1a1a1a] group-hover:text-white transition-colors" 
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {podcast.episodeNumber || '—'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(podcast)}
                        className="p-2 border border-gray-200 text-gray-400 hover:text-[#C4956A] hover:border-[#C4956A] transition-all"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(podcast._id)}
                        className="p-2 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-all"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl text-[#1a1a1a] mb-3 group-hover:text-[#C4956A] transition-colors" 
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {podcast.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-500 text-sm font-light mb-6 line-clamp-2">
                    {podcast.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {podcast.legalTopic && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-[#8B7355] text-xs">
                        <FiTag className="text-xs" /> {podcast.legalTopic}
                      </span>
                    )}
                    {podcast.duration && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 text-gray-500 text-xs">
                        <FiClock className="text-xs" /> {podcast.duration}
                      </span>
                    )}
                  </div>

                  {/* Key Takeaways Preview */}
                  {podcast.keyTakeaways && podcast.keyTakeaways.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-400 tracking-wider uppercase mb-2">Key Takeaways</p>
                      <div className="space-y-1">
                        {podcast.keyTakeaways.slice(0, 3).map((takeaway, i) => (
                          <p key={i} className="text-xs text-gray-500 font-light flex items-start gap-2">
                            <span className="text-[#C4956A] mt-0.5">•</span>
                            {takeaway}
                          </p>
                        ))}
                        {podcast.keyTakeaways.length > 3 && (
                          <p className="text-xs text-gray-400 font-light">
                            +{podcast.keyTakeaways.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-8 border-b border-gray-200">
              <h3 className="text-2xl text-[#1a1a1a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {editingPodcast ? 'Edit Episode' : 'Add New Episode'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-[#1a1a1a] transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={inputClass}
                    placeholder="Episode title"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                    Legal Topic *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.legalTopic}
                    onChange={(e) => setFormData({ ...formData, legalTopic: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., Civil Law, Family Law"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${inputClass} resize-none`}
                  rows="3"
                  placeholder="Episode description"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., 32:15"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                    Episode Number
                  </label>
                  <input
                    type="number"
                    value={formData.episodeNumber}
                    onChange={(e) => setFormData({ ...formData, episodeNumber: e.target.value })}
                    className={inputClass}
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                  Key Takeaways (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.keyTakeaways}
                  onChange={(e) => setFormData({ ...formData, keyTakeaways: e.target.value })}
                  className={inputClass}
                  placeholder="Know your rights, File early, Consult immediately"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1a1a1a] text-white text-sm tracking-wider uppercase hover:bg-[#333] transition-all"
                >
                  {editingPodcast ? 'Update Episode' : 'Create Episode'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PodcastManagement