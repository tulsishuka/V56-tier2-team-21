import React, { useState } from 'react';

// Mock patient data
const mockPatients = [
  { id: 'A1B2C3', number: 1, name: 'John Doe', status: 'Waiting' },
  { id: 'D4E5F6', number: 2, name: 'Jane Smith', status: 'In Surgery' },
  { id: 'G7H8I9', number: 3, name: 'Alice Brown', status: 'Recovery' },
  { id: 'J1K2L3', number: 4, name: 'Bob Lee', status: 'Dismissed' },
];

// Status color mapping
const statusColors: Record<string, string> = {
  'Waiting': 'bg-yellow-100 text-yellow-800',
  'In Surgery': 'bg-blue-100 text-blue-800',
  'Recovery': 'bg-green-100 text-green-800',
  'Dismissed': 'bg-gray-200 text-gray-500',
};

const PatientStatusBoard: React.FC = () => {
  const [patients, setPatients] = useState(mockPatients);

  const handleRefresh = () => {
    // For now, just re-set the same data (placeholder for real refresh logic)
    setPatients([...mockPatients]);
  };

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
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Patient #</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b">
                <td className="px-4 py-2 font-mono">{patient.number}</td>
                <td className="px-4 py-2">{patient.name}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[patient.status] || 'bg-gray-100'}`}>
                    {patient.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientStatusBoard;
