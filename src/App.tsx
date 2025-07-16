// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// import Footer from './components/Footer'
// import Container from './features/container/Container'
// import Login from './features/login/Login'

// function App() {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Container />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>

//       <Footer />
//     </Router>
//   )
// }

// export default App
import Footer from './components/Footer'
import Header from './components/Header'
import Container from './features/container/Container'

function App() {

  return (
    <>
      <Header />
      <Container />
      <Footer />
    </>
  )
}

export default App
