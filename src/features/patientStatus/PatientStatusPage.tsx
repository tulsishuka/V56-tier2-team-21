import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import PatientStatusForm from './PatientStatusForm';
import PatientStatusModal from './PatientStatusModal';
import type { Patient } from './PatientStatusForm';
import PatientStatusBoard from './PatientStatusBoard';

const STORAGE_KEY = 'patientStatusBoardData';

const PatientStatusPage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // Add form state (independent)
  const [addNumber, setAddNumber] = useState('');
  const [addName, setAddName] = useState('');
  const [addError, setAddError] = useState('');
  // Search form state (independent)
  const [searchNumber, setSearchNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();

  // Get patients from localStorage
  const getPatients = (): Patient[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    }
    return [];
  };

  // Add patient only (no update)
  const handlePatientSubmit = (patient: Patient) => {
    let patients = getPatients();
    // Only add if patient number does not exist
    const exists = patients.some(p => p.number === patient.number);
    if (exists) {
      setAddError('Patient number already in use');
      return;
    }
    patients.push(patient);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    setAddNumber('');
    setAddName('');
    setAddError('');
  };

  // Search by number or name (independent state)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const patients = getPatients();
    let results = patients;
    if (searchNumber.trim() !== '') {
      results = results.filter(p => p.number === Number(searchNumber));
    }
    if (searchName.trim() !== '') {
      results = results.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase()));
    }
    setSearchResults(results.length > 0 ? results : []);
  };

  // Open modal for editing
  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setModalOpen(true);
  };

  // Update patient from modal
  const handleUpdatePatient = (updatedPatient: Patient) => {
    let patients = getPatients();
    const idx = patients.findIndex(p => p.id === updatedPatient.id);
    if (idx > -1) {
      patients[idx] = { ...patients[idx], ...updatedPatient };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    }
    setEditingPatient(null);
    setModalOpen(false);
  };

  return (
    <div>
      {!loggedIn ? (
        <LoginForm onLogin={() => setLoggedIn(true)} />
      ) : (
        <>
          <div className="flex items-start gap-8 max-w-5xl mx-auto mt-8 mb-2">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">Welcome Surgery Team</h1>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition mb-4"
                onClick={() => navigate('/')}
              >
                Home
              </button>
              <PatientStatusForm
                onSubmit={handlePatientSubmit}
                existingPatient={undefined}
                onNumberChange={num => {
                  setAddNumber(num.toString());
                  // Check for duplicate in real-time
                  const patients = getPatients();
                  const exists = patients.some(p => p.number === num);
                  setAddError(exists ? 'Patient number already in use' : '');
                }}
                addError={addError}
              />
              <PatientStatusBoard isGuest={false} />
              {editingPatient && (
                <PatientStatusModal
                  open={modalOpen}
                  onClose={() => { setModalOpen(false); setEditingPatient(null); }}
                  onSubmit={handleUpdatePatient}
                  existingPatient={editingPatient}
                />
              )}
            </div>
            {/* Search Bar and Results */}
            <div className="w-80">
              <form onSubmit={handleSearch} className="p-4 bg-white rounded-xl shadow mb-4">
                <h2 className="text-lg font-bold mb-4">Search Patient</h2>
                <div className="mb-3">
                  <label className="block mb-1">Patient Number</label>
                  <input
                    type="number"
                    value={searchNumber}
                    onChange={e => setSearchNumber(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter patient number"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Patient Name</label>
                  <input
                    type="text"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter patient name"
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Search</button>
              </form>
              {/* Search Results */}
              {searchResults && (
                <div className="bg-white rounded-xl shadow p-4">
                  <h3 className="text-md font-semibold mb-2">Search Results</h3>
                  {searchResults.length === 0 ? (
                    <div className="text-red-500">Result not found</div>
                  ) : (
                    <PatientStatusBoard isGuest={false} patients={searchResults} />
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientStatusPage;
