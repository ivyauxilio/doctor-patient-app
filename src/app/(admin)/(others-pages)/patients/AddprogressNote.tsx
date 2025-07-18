'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addProgressNote, fetchProgressNotesByPatient } from '@/store/slices/progressNoteSlice';

type Props = {
  patientId: number;
  doctorId: number;
};

const ProgressNoteForm: React.FC<Props> = ({ patientId,doctorId }) => {
  const dispatch = useAppDispatch();
  const [note, setNote] = useState('');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!note.trim()) return;

    await dispatch(
      addProgressNote({
        patient_id: patientId,
        doctor_id: doctorId,
        note,
        visit_date: visitDate || new Date().toISOString().split("T")[0],
      })
    );

    setNote('');
    setVisitDate('');
    dispatch(fetchProgressNotesByPatient(patientId)); // Refresh notes
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-xl bg-gray-50 mb-6">
      <h3 className="text-lg font-semibold">Add</h3>

      <div>
        <label className="block mb-1 text-sm font-medium">Visit Date</label>
        <input
          type="date"
          value={visitDate}
          onChange={(e) => setVisitDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Progress Note</label>
        <textarea
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Write note here..."
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Note
      </button>
    </form>
  );
};

export default ProgressNoteForm;
