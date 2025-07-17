import React, { useState } from 'react';
import type { Patient, PatientStatus } from './PatientStatusForm';

interface PatientStatusModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (patient: Patient) => void;
  existingPatient: Patient;
}

const statusOptions: PatientStatus[] = ["Checked In", "Pre-Procedure", "In-progress", "Closing", "Recovery", "Complete", "Dismissal"];

const PatientStatusModal: React.FC<PatientStatusModalProps> = ({ open, onClose, onSubmit, existingPatient }) => {
  const [status, setStatus] = useState<PatientStatus>(existingPatient.status);
  if (!open) return null;
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...existingPatient, status });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <form onSubmit={handleUpdate}>
          <h2 className="text-lg font-bold mb-4">Update Status</h2>
          <div className="mb-3">
            <label className="block mb-1">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as PatientStatus)}
              className="w-full px-3 py-2 border rounded"
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientStatusModal;
