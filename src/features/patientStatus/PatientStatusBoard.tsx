import React, { useState, useEffect, useRef } from 'react';

// Local storage key
const STORAGE_KEY = 'patientStatusBoardData';

export type PatientStatus = 'Waiting' | 'In Surgery' | 'Recovery' | 'Dismissed';
export interface Patient {
  id: string;
  number: number;
  name: string;
  status: PatientStatus;
}

// Status color mapping
const statusColors: Record<string, string> = {
  'Waiting': 'bg-yellow-100 text-yellow-800',
  'In Surgery': 'bg-blue-100 text-blue-800',
  'Recovery': 'bg-green-100 text-green-800',
  'Dismissed': 'bg-gray-200 text-gray-500',
};


const AUTO_REFRESH_INTERVAL = 10000; // 10 seconds
const VISIBLE_ROWS = 5; // Number of rows visible at a time before cycling

const getPatientsFromStorage = (): Patient[] => {
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

interface PatientStatusBoardProps {
  onEditPatient?: (patient: Patient) => void;
}

const PatientStatusBoard: React.FC<PatientStatusBoardProps> = ({ onEditPatient }) => {
  const [patients, setPatients] = useState<Patient[]>(getPatientsFromStorage());
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [startIdx, setStartIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    setPatients(getPatientsFromStorage());
  }, []);

  // Auto-refresh logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPatients(getPatientsFromStorage());
      setLastUpdated(new Date().toLocaleTimeString());
      // Cycle rows if more than visible
      if (patients.length > VISIBLE_ROWS) {
        setStartIdx(prev => (prev + VISIBLE_ROWS) % patients.length);
      }
    }, AUTO_REFRESH_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [patients.length]);

  const handleRefresh = () => {
    setPatients(getPatientsFromStorage());
    setLastUpdated(new Date().toLocaleTimeString());
    setStartIdx(0);
  };

  // Show only a slice if too many patients
  const visiblePatients = patients.length > VISIBLE_ROWS
    ? patients.slice(startIdx, startIdx + VISIBLE_ROWS)
    : patients;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Patient Status Board</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleRefresh}
        >
          Refresh
        </button>
      </div>
      {lastUpdated && (
        <div className="mb-2 text-sm text-gray-500">Latest updated at {lastUpdated}</div>
      )}
      <div className="overflow-x-auto max-h-80">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Patient #</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {visiblePatients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="px-4 py-2 font-mono">{patient.number}</td>
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[patient.status] || 'bg-gray-100'}`}>
                    {patient.status}
                  </span>
                  {onEditPatient && (
                    <button
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition"
                      onClick={() => onEditPatient(patient)}
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {patients.length > VISIBLE_ROWS && (
          <div className="text-xs text-gray-400 mt-2">Showing {startIdx + 1} - {Math.min(startIdx + VISIBLE_ROWS, patients.length)} of {patients.length} patients</div>
        )}
      </div>
    </div>
  );
};

export default PatientStatusBoard;
