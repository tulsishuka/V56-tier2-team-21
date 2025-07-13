import Footer from './components/Footer';
import Header from './components/Header';
import Container from './features/container/Container';
import PatientStatusBoard from './features/patientStatus/PatientStatusBoard';
import PatientStatusPage from './features/patientStatus/PatientStatusPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/status" element={<PatientStatusBoard isGuest={true} />} />
        <Route path="/surgery-team" element={<PatientStatusPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
