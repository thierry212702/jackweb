import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiHeadphones } from 'react-icons/fi'
import { podcastAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
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

  const fetchPodcasts = async () => {
    try {
      const { data } = await podcastAPI.getAll()
      setPodcasts(data.data)
    } catch (error) {
      toast.error('Failed to load podcasts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPodcasts()
  }, [])

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
      toast.error(error.response?.data?.message || 'Operation failed')
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
      title: podcast.title,
      description: podcast.description,
      legalTopic: podcast.legalTopic,
      duration: podcast.duration,
      episodeNumber: podcast.episodeNumber?.toString(),
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

  const inputClass = "w-full px-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-primary-500 outline-none transition-all"

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Podcast Management</h1>
            <p className="text-dark-400">Add and manage podcast episodes</p>
          </div>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
          >
            <FiPlus /> Add New Episode
          </button>
        </div>

        {/* Podcasts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FiHeadphones className="text-6xl text-dark-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No episodes yet</h3>
              <p className="text-dark-400">Click the button above to add your first episode</p>
            </div>
          ) : (
            podcasts.map((podcast, index) => (
              <div
                key={podcast._id}
                className="bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold text-white">{podcast.episodeNumber}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(podcast)}
                      className="p-2 bg-dark-700/50 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-600/20 transition-all"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(podcast._id)}
                      className="p-2 bg-dark-700/50 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-600/20 transition-all"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{podcast.title}</h3>
                <p className="text-dark-400 text-sm mb-3 line-clamp-2">{podcast.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary-600/10 text-primary-400 rounded-lg text-xs">
                    {podcast.legalTopic}
                  </span>
                  <span className="px-3 py-1 bg-dark-700/50 text-dark-400 rounded-lg text-xs">
                    {podcast.duration}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-800 border border-primary-600/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {editingPodcast ? 'Edit Episode' : 'Add New Episode'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-dark-400 hover:text-white transition-colors"
              >
                <FiX className="text-2xl" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Title *</label>
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
                  <label className="block text-sm font-medium text-dark-300 mb-2">Legal Topic *</label>
                  <input
                    type="text"
                    required
                    value={formData.legalTopic}
                    onChange={(e) => setFormData({ ...formData, legalTopic: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., Civil Law"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${inputClass} resize-none`}
                  rows="3"
                  placeholder="Episode description"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className={inputClass}
                    placeholder="e.g., 32:15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Episode Number</label>
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
                <label className="block text-sm font-medium text-dark-300 mb-2">
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

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
              >
                {editingPodcast ? 'Update Episode' : 'Create Episode'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PodcastManagement