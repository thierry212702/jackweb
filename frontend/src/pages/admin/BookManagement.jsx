import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiBook } from 'react-icons/fi'
import { bookAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
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

  const fetchBooks = async () => {
    try {
      const { data } = await bookAPI.getAll()
      setBooks(data.data)
    } catch (error) {
      toast.error('Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

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
      toast.error(error.response?.data?.message || 'Operation failed')
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
      title: book.title,
      subtitle: book.subtitle || '',
      description: book.description,
      price: book.price?.toString(),
      author: book.author,
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

  const inputClass = "w-full px-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-primary-500 outline-none transition-all"

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Book Management</h1>
            <p className="text-dark-400">Add and manage your book collection</p>
          </div>
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
          >
            <FiPlus /> Add New Book
          </button>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FiBook className="text-6xl text-dark-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No books yet</h3>
              <p className="text-dark-400">Click the button above to add your first book</p>
            </div>
          ) : (
            books.map((book, index) => (
              <div
                key={book._id}
                className="bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                    <FiBook className="text-xl text-white" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="p-2 bg-dark-700/50 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-600/20 transition-all"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="p-2 bg-dark-700/50 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-600/20 transition-all"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">{book.title}</h3>
                {book.subtitle && (
                  <p className="text-primary-400 text-sm mb-2">{book.subtitle}</p>
                )}
                <p className="text-dark-400 text-sm mb-4 line-clamp-2">{book.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">${book.price}</span>
                  <span className="text-dark-500 text-sm">By {book.author}</span>
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
                {editingBook ? 'Edit Book' : 'Add New Book'}
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
                    placeholder="Book title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Subtitle</label>
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
                <label className="block text-sm font-medium text-dark-300 mb-2">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`${inputClass} resize-none`}
                  rows="4"
                  placeholder="Book description"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Price *</label>
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
                  <label className="block text-sm font-medium text-dark-300 mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className={inputClass}
                    placeholder="Author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Published Year</label>
                  <input
                    type="number"
                    value={formData.publishedYear}
                    onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })}
                    className={inputClass}
                    placeholder="2024"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
              >
                {editingBook ? 'Update Book' : 'Create Book'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookManagement