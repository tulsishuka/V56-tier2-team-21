import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Container from './features/container/Container'
import Login from './features/login/Login'

function App() {

  return (
    <Router>
      <Routes>
        <Route />
        <Route path="/" element={<Container />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
