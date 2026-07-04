import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Podcasts from './pages/Podcasts'
import PodcastDetail from './pages/PodcastDetail'
import Books from './pages/Books'
import Resources from './pages/Resources'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/admin/Dashboard'
import ContactManagement from './pages/admin/ContactManagement'
import PodcastManagement from './pages/admin/PodcastManagement'
import BookManagement from './pages/admin/BookManagement'
import UserManagement from './pages/admin/UserManagement'
import ProtectedRoute from './components/ProtectedRoute'
import Businesses from './pages/Businesses'
import Individuals from './pages/Individuals'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          {/* Public Routes */}
          <Route path="/businesses" element={<Businesses />} />
<Route path="/individuals" element={<Individuals />} />
          <Route path="/" element={<Home />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcasts/:id" element={<PodcastDetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><ContactManagement /></ProtectedRoute>} />
          <Route path="/admin/podcasts" element={<ProtectedRoute><PodcastManagement /></ProtectedRoute>} />
          <Route path="/admin/books" element={<ProtectedRoute><BookManagement /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App