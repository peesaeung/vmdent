import React from 'react';
import type { Applicant } from '../types/applicant';

interface Props {
  applicants: Applicant[];
  onEdit: (applicant: Applicant) => void;
  onDelete: (id: string) => void;
}

const ApplicantTable: React.FC<Props> = ({ applicants, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-slate-200">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-slate-50">
            <th className="p-4 font-semibold text-slate-700 border-b border-slate-200">Name</th>
            <th className="p-4 font-semibold text-slate-700 border-b border-slate-200">Email</th>
            <th className="p-4 font-semibold text-slate-700 border-b border-slate-200">Phone</th>
            <th className="p-4 font-semibold text-slate-700 border-b border-slate-200">Position</th>
            <th className="p-4 font-semibold text-slate-700 border-b border-slate-200">Status</th>
            <th className="p-4 font-semibold text-slate-700 border-b border-slate-200">Created At</th>
            <th className="p-4 font-semibold text-slate-700 border-b border-slate-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-8 text-center text-slate-500">No applicants found.</td>
            </tr>
          ) : (
            applicants.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 border-b border-slate-100">{a.name}</td>
                <td className="p-4 border-b border-slate-100">{a.email}</td>
                <td className="p-4 border-b border-slate-100">{a.phone}</td>
                <td className="p-4 border-b border-slate-100">{a.position}</td>
                <td className="p-4 border-b border-slate-100">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    a.status === 'Applied' ? 'bg-sky-100 text-sky-700' :
                    a.status === 'Interview' ? 'bg-amber-100 text-amber-700' :
                    a.status === 'Passed' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="p-4 border-b border-slate-100">{new Date(a.created_at).toLocaleDateString()}</td>
                <td className="p-4 border-b border-slate-100">
                  <div className="flex gap-2">
                    <button 
                      className="p-1 hover:bg-slate-200 rounded transition-colors" 
                      onClick={() => onEdit(a)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button 
                      className="p-1 hover:bg-red-100 rounded transition-colors" 
                      onClick={() => onDelete(a.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantTable;
