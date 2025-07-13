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
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [numberInput, setNumberInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [searchResults, setSearchResults] = useState<Patient[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  // Add or update patient
  const handlePatientSubmit = (patient: Patient) => {
    let patients = getPatients();
    // Check by patient number
    const idx = patients.findIndex(p => p.number === patient.number);
    if (idx > -1) {
      // Update existing patient
      patients[idx] = { ...patients[idx], ...patient };
    } else {
      patients.push(patient);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    setEditingPatient(null);
    setNumberInput(null);
    setModalOpen(false);
  };

  // When number input changes, check if patient exists and prefill
  const handleNumberChange = (num: number | string) => {
    setNumberInput(num.toString());
    const patients = getPatients();
    const found = patients.find(p => p.number === Number(num));
    if (found) {
      setEditingPatient(found);
    } else {
      setEditingPatient(null);
    }
  };

  // Search by number or name
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const patients = getPatients();
    let results = patients;
    if (numberInput.trim() !== '') {
      results = results.filter(p => p.number === Number(numberInput));
    }
    if (nameInput.trim() !== '') {
      results = results.filter(p => p.name.toLowerCase().includes(nameInput.toLowerCase()));
    }
    setSearchResults(results.length > 0 ? results : []);
  };

  // Open modal for editing
  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setModalOpen(true);
  };

  // Optionally, allow editing from board (not required for MVP)

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
                existingPatient={numberInput !== '' ? getPatients().find(p => p.number === Number(numberInput)) : undefined}
                onNumberChange={handleNumberChange}
              />
              <PatientStatusBoard isGuest={false} />
              {editingPatient && (
                <PatientStatusModal
                  open={modalOpen}
                  onClose={() => { setModalOpen(false); setEditingPatient(null); }}
                  onSubmit={handlePatientSubmit}
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
                    value={numberInput}
                    onChange={e => setNumberInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter patient number"
                  />
                </div>
                <div className="mb-3">
                  <label className="block mb-1">Patient Name</label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
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
