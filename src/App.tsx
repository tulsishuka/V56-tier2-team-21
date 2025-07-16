import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Container from './features/container/Container'
import Login from './features/login/Login'
import { AuthProvider } from './features/auth/AuthContext'
import PrivateRoute from './features/auth/PrivateRoute'
// Placeholder components for protected pages
const AdminPage = () => <div>Admin Page (Protected)</div>;
const GuestPage = () => <div>Guest Page (Protected)</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Container />} /> {/* Public homepage */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/guest"
            element={
              <PrivateRoute>
                <GuestPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App