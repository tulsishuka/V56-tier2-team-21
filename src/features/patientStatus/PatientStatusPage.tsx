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
  const [numberInput, setNumberInput] = useState<number | null>(null);
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
  const handleNumberChange = (num: number) => {
    setNumberInput(num);
    const patients = getPatients();
    const found = patients.find(p => p.number === num);
    if (found) {
      setEditingPatient(found);
    } else {
      setEditingPatient(null);
    }
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
          <div className="flex items-center justify-between max-w-2xl mx-auto mt-8 mb-2">
            <h1 className="text-2xl font-bold">Welcome Surgery Team</h1>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              onClick={() => navigate('/')}
            >
              Home
            </button>
          </div>
          <PatientStatusForm
            onSubmit={handlePatientSubmit}
            existingPatient={numberInput !== null ? getPatients().find(p => p.number === numberInput) : undefined}
            onNumberChange={handleNumberChange}
          />
          <PatientStatusBoard isGuest={!loggedIn} />
          {editingPatient && (
            <PatientStatusModal
              open={modalOpen}
              onClose={() => { setModalOpen(false); setEditingPatient(null); }}
              onSubmit={handlePatientSubmit}
              existingPatient={editingPatient}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PatientStatusPage;
