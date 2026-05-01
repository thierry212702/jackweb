import { useState, useEffect } from 'react'
import { FiSearch, FiFilter, FiEdit2, FiTrash2, FiMessageSquare, FiX, FiCheck, FiClock, FiPhone, FiMail } from 'react-icons/fi'
import { contactAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'

const ContactManagement = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteText, setNoteText] = useState('')

  const fetchContacts = async () => {
    try {
      const params = {}
      if (filter !== 'all') params.status = filter
      const { data } = await contactAPI.getAll(params)
      setContacts(data.data)
    } catch (error) {
      toast.error('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [filter])

  const handleStatusUpdate = async (id, status) => {
    try {
      await contactAPI.update(id, { status })
      toast.success('Status updated successfully')
      fetchContacts()
      setShowModal(false)
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleAddNote = async () => {
    if (!noteText.trim()) return
    try {
      await contactAPI.addNote(selectedContact._id, { text: noteText })
      toast.success('Note added successfully')
      setNoteText('')
      setShowNoteModal(false)
      fetchContacts()
    } catch (error) {
      toast.error('Failed to add note')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'in-review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'contacted': 'bg-green-500/20 text-green-400 border-green-500/30',
      'closed': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    }
    return colors[status] || colors['new']
  }

  const getUrgencyColor = (urgency) => {
    const colors = {
      'low': 'bg-gray-500/20 text-gray-400',
      'medium': 'bg-blue-500/20 text-blue-400',
      'high': 'bg-orange-500/20 text-orange-400',
      'urgent': 'bg-red-500/20 text-red-400',
    }
    return colors[urgency] || colors['medium']
  }

  const filteredContacts = contacts.filter(contact => 
    contact.name?.toLowerCase().includes(search.toLowerCase()) ||
    contact.email?.toLowerCase().includes(search.toLowerCase()) ||
    contact.caseType?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Contact Management</h1>
            <p className="text-dark-400">Manage client inquiries and messages</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-dark-800/50 border border-primary-600/20 rounded-xl text-primary-400 font-semibold">
              {contacts.length} Total
            </span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-primary-500 outline-none transition-all"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white focus:border-primary-500 outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in-review">In Review</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12 bg-dark-800/20 rounded-2xl">
              <FiMessageSquare className="text-6xl text-dark-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No contacts found</h3>
              <p className="text-dark-400">Try adjusting your search or filter</p>
            </div>
          ) : (
            filteredContacts.map((contact, index) => (
              <div
                key={contact._id}
                className="bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-white">{contact.name}</h3>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getUrgencyColor(contact.urgency)}`}>
                        {contact.urgency}
                      </span>
                      {contact.caseType && (
                        <span className="px-3 py-1 bg-dark-700/50 text-dark-400 rounded-lg text-xs">
                          {contact.caseType}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-dark-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <FiMail className="text-primary-400" /> {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1.5">
                          <FiPhone className="text-primary-400" /> {contact.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <FiClock className="text-primary-400" /> 
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-dark-300 bg-dark-900/50 p-4 rounded-xl border border-dark-700">
                      {contact.message}
                    </p>

                    {contact.notes?.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-semibold text-primary-400">Notes:</h4>
                        {contact.notes.map((note, i) => (
                          <div key={i} className="bg-dark-900/30 p-3 rounded-lg border border-dark-700 text-sm text-dark-400">
                            <p>{note.text}</p>
                            <span className="text-xs text-dark-500 mt-1 block">
                              {new Date(note.createdAt).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedContact(contact)
                        setShowModal(true)
                      }}
                      className="px-4 py-2 bg-primary-600/20 text-primary-400 rounded-xl hover:bg-primary-600 hover:text-white transition-all text-sm font-medium"
                    >
                      Update Status
                    </button>
                    <button
                      onClick={() => {
                        setSelectedContact(contact)
                        setShowNoteModal(true)
                      }}
                      className="px-4 py-2 bg-dark-700/50 text-dark-300 rounded-xl hover:bg-dark-600 transition-all text-sm font-medium"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Status Update Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-800 border border-primary-600/20 rounded-2xl p-8 max-w-md w-full animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Update Status</h3>
              <button onClick={() => setShowModal(false)} className="text-dark-400 hover:text-white">
                <FiX className="text-2xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-dark-400">Contact: <span className="text-white">{selectedContact.name}</span></p>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Status</label>
                <select
                  defaultValue={selectedContact.status}
                  onChange={(e) => handleStatusUpdate(selectedContact._id, e.target.value)}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white focus:border-primary-500 outline-none"
                >
                  <option value="new">New</option>
                  <option value="in-review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-800 border border-primary-600/20 rounded-2xl p-8 max-w-md w-full animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Add Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-dark-400 hover:text-white">
                <FiX className="text-2xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-dark-400">Contact: <span className="text-white">{selectedContact.name}</span></p>
              
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Note</label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-primary-500 outline-none resize-none"
                  rows="4"
                  placeholder="Add your note here..."
                />
              </div>

              <button
                onClick={handleAddNote}
                disabled={!noteText.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg disabled:opacity-50 transition-all"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactManagement