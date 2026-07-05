// pages/admin/BookManagement.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiBook, FiArrowLeft, FiUser } from 'react-icons/fi'
import { bookAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const BookManagement = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    price: '',
    author: 'Sarah Michelle',
    publishedYear: ''
  })
  const { isAdmin } = useAuth()

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/'
      return
    }
    fetchBooks()
  }, [isAdmin])

  const fetchBooks = async () => {
    try {
      const { data } = await bookAPI.getAll()
      setBooks(data.data || data.books || data || [])
    } catch (error) {
      toast.error('Failed to load books')
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
        price: parseFloat(formData.price),
        publishedYear: parseInt(formData.publishedYear)
      }

      if (editingBook) {
        await bookAPI.update(editingBook._id, payload)
        toast.success('Book updated successfully')
      } else {
        await bookAPI.create(payload)
        toast.success('Book created successfully')
      }
      
      setShowModal(false)
      resetForm()
      fetchBooks()
    } catch (error) {
      const message = error.response?.data?.message || 'Operation failed'
      toast.error(message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return
    try {
      await bookAPI.delete(id)
      toast.success('Book deleted successfully')
      fetchBooks()
    } catch (error) {
      toast.error('Failed to delete book')
    }
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setFormData({
      title: book.title || '',
      subtitle: book.subtitle || '',
      description: book.description || '',
      price: book.price?.toString() || '',
      author: book.author || 'Sarah Michelle',
      publishedYear: book.publishedYear?.toString() || ''
    })
    setShowModal(true)
  }

  const resetForm = () => {
    setEditingBook(null)
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      price: '',
      author: 'Sarah Michelle',
      publishedYear: ''
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
                Book Management
              </h1>
              <p className="text-gray-500 font-light">
                {books.length} books total
              </p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowModal(true)
              }}
              className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#333] transition-all"
            >
              <FiPlus /> Add New Book
            </button>
          </div>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div className="text-center py-16 bg-[#F8F6F3]">
            <FiBook className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-[#1a1a1a] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              No books yet
            </h3>
            <p className="text-gray-500 font-light">Click the button above to add your first book</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <div
                key={book._id}
                className="group border border-gray-200 hover:border-[#C4956A]/30 hover:bg-[#F8F6F3] transition-all duration-300 flex flex-col"
              >
                <div className="p-8 flex-grow">
                  {/* Book Icon & Actions */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-[#F8F6F3] flex items-center justify-center group-hover:bg-[#1a1a1a] transition-all">
                      <FiBook className="text-xl text-[#1a1a1a] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(book)}
                        className="p-2 border border-gray-200 text-gray-400 hover:text-[#C4956A] hover:border-[#C4956A] transition-all"
                      >
                        <FiEdit2 className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="p-2 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-all"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl text-[#1a1a1a] mb-2 group-hover:text-[#C4956A] transition-colors" 
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {book.title}
                  </h3>
                  
                  {/* Subtitle */}
                  {book.subtitle && (
                    <p className="text-[#C4956A] text-sm mb-3 italic">{book.subtitle}</p>
                  )}
                  
                  {/* Description */}
                  <p className="text-gray-500 text-sm font-light mb-6 line-clamp-2">
                    {book.description}
                  </p>
                  
                  {/* Author & Year */}
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-4">
                    <span className="flex items-center gap-1.5">
                      <FiUser className="text-[#C4956A]" />
                      {book.author}
                    </span>
                    {book.publishedYear && <span>• {book.publishedYear}</span>}
                  </div>
                </div>

                {/* Price Footer */}
                <div className="border-t border-gray-200 p-6 flex items-center justify-between">
                  <span className="text-2xl text-[#1a1a1a] font-light" 
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    ${book.price || '0.00'}
                  </span>
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
                {editingBook ? 'Edit Book' : 'Add New Book'}
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
                    placeholder="Book title"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className={inputClass}
                    placeholder="Book subtitle"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${inputClass} resize-none`}
                  rows="4"
                  placeholder="Book description"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                    Price *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={inputClass}
                    placeholder="29.99"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className={inputClass}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                    Published Year
                  </label>
                  <input
                    type="number"
                    value={formData.publishedYear}
                    onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })}
                    className={inputClass}
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1a1a1a] text-white text-sm tracking-wider uppercase hover:bg-[#333] transition-all"
                >
                  {editingBook ? 'Update Book' : 'Create Book'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookManagement