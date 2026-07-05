// pages/admin/UserManagement.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiEdit2, FiTrash2, FiX, FiUsers, FiArrowLeft, FiShield, FiUser, FiCheck, FiX as FiXIcon } from 'react-icons/fi'
import { adminAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    isActive: true
  })
  const { isAdmin } = useAuth()

  useEffect(() => {
    if (!isAdmin) {
      window.location.href = '/'
      return
    }
    fetchUsers()
  }, [isAdmin])

  const fetchUsers = async () => {
    try {
      const { data } = await adminAPI.getUsers()
      setUsers(data.data || data.users || data || [])
    } catch (error) {
      toast.error('Failed to load users')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await adminAPI.updateUser(editingUser._id, formData)
      toast.success('User updated successfully')
      setShowModal(false)
      fetchUsers()
    } catch (error) {
      const message = error.response?.data?.message || 'Operation failed'
      toast.error(message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return
    try {
      await adminAPI.deleteUser(id)
      toast.success('User deleted successfully')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name || '',
      email: user.email || '',
      role: user.role || 'user',
      isActive: user.isActive !== undefined ? user.isActive : true
    })
    setShowModal(true)
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
                User Management
              </h1>
              <p className="text-gray-500 font-light">
                {users.length} registered users
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 font-light">
                <span className="inline-flex items-center gap-1.5 mr-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  {users.filter(u => u.isActive).length} Active
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-gray-300 rounded-full" />
                  {users.filter(u => !u.isActive).length} Inactive
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        {users.length === 0 ? (
          <div className="text-center py-16 bg-[#F8F6F3]">
            <FiUsers className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-[#1a1a1a] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              No users found
            </h3>
            <p className="text-gray-500 font-light">Users will appear here after registration</p>
          </div>
        ) : (
          <div className="border border-gray-200">
            {/* Table Header */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-[#F8F6F3]">
              <div className="lg:col-span-3">
                <span className="text-xs tracking-wider uppercase text-gray-500 font-medium">User</span>
              </div>
              <div className="lg:col-span-3">
                <span className="text-xs tracking-wider uppercase text-gray-500 font-medium">Email</span>
              </div>
              <div className="lg:col-span-2">
                <span className="text-xs tracking-wider uppercase text-gray-500 font-medium">Role</span>
              </div>
              <div className="lg:col-span-2">
                <span className="text-xs tracking-wider uppercase text-gray-500 font-medium">Status</span>
              </div>
              <div className="lg:col-span-2">
                <span className="text-xs tracking-wider uppercase text-gray-500 font-medium">Actions</span>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <div
                  key={user._id}
                  className="grid lg:grid-cols-12 gap-4 p-6 items-center hover:bg-[#F8F6F3]/50 transition-colors"
                >
                  {/* User Info */}
                  <div className="lg:col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F8F6F3] rounded-full flex items-center justify-center flex-shrink-0">
                      <FiUser className="text-[#1a1a1a]" />
                    </div>
                    <div>
                      <p className="text-[#1a1a1a] font-medium text-sm">{user.name}</p>
                      <p className="text-gray-400 text-xs lg:hidden">{user.email}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="lg:col-span-3">
                    <p className="text-gray-500 text-sm font-light hidden lg:block">{user.email}</p>
                  </div>

                  {/* Role */}
                  <div className="lg:col-span-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-[#F8F6F3] text-[#C4956A]'
                        : 'bg-gray-50 text-gray-600'
                    }`}>
                      {user.role === 'admin' && <FiShield className="text-xs" />}
                      {user.role === 'admin' ? 'Admin' : 'User'}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="lg:col-span-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                      user.isActive
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}>
                      {user.isActive ? (
                        <FiCheck className="text-xs" />
                      ) : (
                        <FiXIcon className="text-xs" />
                      )}
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 border border-gray-200 text-gray-400 hover:text-[#C4956A] hover:border-[#C4956A] transition-all"
                      title="Edit user"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-all"
                      title="Delete user"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Cards (visible only on small screens) */}
        {users.length > 0 && (
          <div className="lg:hidden mt-6 space-y-4">
            {users.map((user) => (
              <div key={user._id} className="border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#F8F6F3] rounded-full flex items-center justify-center">
                      <FiUser className="text-[#1a1a1a]" />
                    </div>
                    <div>
                      <p className="text-[#1a1a1a] font-medium">{user.name}</p>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-2 border border-gray-200 text-gray-400 hover:text-[#C4956A]"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2 border border-gray-200 text-gray-400 hover:text-red-500"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-2 py-1 text-xs ${
                    user.role === 'admin' ? 'bg-[#F8F6F3] text-[#C4956A]' : 'bg-gray-50 text-gray-600'
                  }`}>
                    {user.role}
                  </span>
                  <span className={user.isActive ? 'text-green-600' : 'text-gray-400'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-8 border-b border-gray-200">
              <h3 className="text-2xl text-[#1a1a1a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Edit User
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
              {/* User Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-[#F8F6F3] rounded-full flex items-center justify-center">
                  <FiUser className="text-3xl text-[#1a1a1a]" />
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  placeholder="User's full name"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={inputClass}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 border-gray-300 text-[#C4956A] focus:ring-[#C4956A]"
                />
                <label htmlFor="isActive" className="text-sm text-gray-600 font-light cursor-pointer">
                  Active Account
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1a1a1a] text-white text-sm tracking-wider uppercase hover:bg-[#333] transition-all"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement