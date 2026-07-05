// pages/admin/ContactManagement.jsx
import { useState, useEffect } from 'react'
import { FiSearch, FiX, FiCheck, FiClock, FiMessageSquare, FiPhone, FiMail, FiArrowLeft } from 'react-icons/fi'
import { contactAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ContactManagement = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedContact, setSelectedContact] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { isAdmin } = useAuth()

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/'
      return
    }
    fetchContacts()
  }, [filter, isAdmin])

  const fetchContacts = async () => {
    try {
      const params = {}
      if (filter !== 'all') params.status = filter
      const { data } = await contactAPI.getAll(params)
      setContacts(data.data || data.contacts || data || [])
    } catch (error) {
      console.error('Failed to load contacts:', error)
      toast.error('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await contactAPI.update(id, { status })
      toast.success('Status updated')
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
      toast.success('Note added')
      setNoteText('')
      setShowNoteModal(false)
      fetchContacts()
    } catch (error) {
      toast.error('Failed to add note')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-700',
      'in-review': 'bg-amber-100 text-amber-700',
      'contacted': 'bg-green-100 text-green-700',
      'closed': 'bg-gray-100 text-gray-700',
    }
    return colors[status] || colors['new']
  }

  const filteredContacts = contacts.filter(contact => 
    contact.name?.toLowerCase().includes(search.toLowerCase()) ||
    contact.email?.toLowerCase().includes(search.toLowerCase())
  )

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
                Contact Management
              </h1>
              <p className="text-gray-500 font-light">
                {contacts.length} total enquiries
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex-grow relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 text-[#1a1a1a] focus:border-[#C4956A] outline-none transition-colors text-sm"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in-review">In Review</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-16 bg-[#F8F6F3]">
              <FiMessageSquare className="text-4xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-[#1a1a1a] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                No contacts found
              </h3>
              <p className="text-gray-500 font-light">Try adjusting your search or filter</p>
            </div>
          ) : (
            filteredContacts.map((contact, index) => (
              <div
                key={contact._id}
                className="border border-gray-200 p-6 hover:border-[#C4956A]/30 hover:bg-[#F8F6F3] transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-lg text-[#1a1a1a] font-medium">{contact.name}</h3>
                      <span className={`px-3 py-1 text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3 font-light">
                      <span className="flex items-center gap-1.5">
                        <FiMail className="text-[#C4956A]" /> {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1.5">
                          <FiPhone className="text-[#C4956A]" /> {contact.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <FiClock className="text-[#C4956A]" /> 
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 bg-[#F8F6F3] p-4 text-sm font-light">
                      {contact.message}
                    </p>
                  </div>

                  <div className="flex lg:flex-col gap-2">
                    <button
                      onClick={() => {
                        setSelectedContact(contact)
                        setShowModal(true)
                      }}
                      className="px-4 py-2 bg-[#1a1a1a] text-white text-sm hover:bg-[#333] transition-all"
                    >
                      Update Status
                    </button>
                    <button
                      onClick={() => {
                        setSelectedContact(contact)
                        setShowNoteModal(true)
                      }}
                      className="px-4 py-2 border border-gray-200 text-[#1a1a1a] text-sm hover:bg-[#F8F6F3] transition-all"
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
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl text-[#1a1a1a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Update Status
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-[#1a1a1a]">
                <FiX className="text-xl" />
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mb-4">Contact: <span className="text-[#1a1a1a]">{selectedContact.name}</span></p>
            
            <select
              defaultValue={selectedContact.status}
              onChange={(e) => handleStatusUpdate(selectedContact._id, e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-[#1a1a1a] focus:border-[#C4956A] outline-none text-sm"
            >
              <option value="new">New</option>
              <option value="in-review">In Review</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && selectedContact && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl text-[#1a1a1a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Add Note
              </h3>
              <button onClick={() => setShowNoteModal(false)} className="text-gray-400 hover:text-[#1a1a1a]">
                <FiX className="text-xl" />
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mb-4">Contact: <span className="text-[#1a1a1a]">{selectedContact.name}</span></p>
            
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none text-sm resize-none"
              rows="4"
              placeholder="Add your note here..."
            />

            <button
              onClick={handleAddNote}
              disabled={!noteText.trim()}
              className="w-full mt-4 py-3 bg-[#1a1a1a] text-white text-sm tracking-wider uppercase hover:bg-[#333] disabled:opacity-50 transition-all"
            >
              Add Note
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactManagement