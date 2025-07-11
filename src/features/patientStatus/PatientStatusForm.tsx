import React, { useState } from 'react';

export type PatientStatus = 'Waiting' | 'In Surgery' | 'Recovery' | 'Dismissed';

export interface Patient {
  id: string;
  number: number;
  name: string;
  status: PatientStatus;
}

interface PatientStatusFormProps {
  onSubmit: (patient: Patient) => void;
  existingPatient?: Patient;
  onNumberChange?: (num: number) => void;
}

const statusOptions: PatientStatus[] = ['Waiting', 'In Surgery', 'Recovery', 'Dismissed'];

const PatientStatusForm: React.FC<PatientStatusFormProps> = ({ onSubmit, existingPatient, onNumberChange }) => {
  const [number, setNumber] = useState(existingPatient?.number || 0);
  const [name, setName] = useState(existingPatient?.name || '');
  const [status, setStatus] = useState<PatientStatus>(existingPatient?.status || 'Waiting');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For new patients, require name. For existing, use existing name if field is disabled.
    const patientName = existingPatient ? existingPatient.name : name;
    if (!number || !patientName) return;
    const id = existingPatient?.id || Math.random().toString(36).substr(2, 6).toUpperCase();
    onSubmit({ id, number, name: patientName, status });
    setNumber(0);
    setName('');
    setStatus('Waiting');
  };

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setNumber(num);
    if (typeof onNumberChange === 'function') {
      onNumberChange(num);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4 p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">{existingPatient ? 'Update' : 'Add'} Patient Status</h2>
      <div className="mb-3">
        <label className="block mb-1">Patient Number</label>
        <input
          type="number"
          value={number}
          onChange={handleNumberInput}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Patient Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          disabled={!!existingPatient}
          required={!existingPatient}
        />
      </div>
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
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
        {existingPatient ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default PatientStatusForm;
