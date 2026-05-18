import React from 'react';
import type { Applicant } from '../types/applicant';

interface Props {
  applicants: Applicant[];
  onEdit: (applicant: Applicant) => void;
  onDelete: (id: string) => void;
}

const ApplicantTable: React.FC<Props> = ({ applicants, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="applicant-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applicants.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>No applicants found.</td>
            </tr>
          ) : (
            applicants.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td>{a.position}</td>
                <td>
                  <span className={`status-badge status-${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </td>
                <td>{new Date(a.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="actions">
                    <button className="btn-icon" onClick={() => onEdit(a)}>✏️</button>
                    <button className="btn-icon btn-delete" onClick={() => onDelete(a.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <style jsx>{`
        .table-responsive {
          overflow-x: auto;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .applicant-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        th, td {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }
        th {
          background: #f9fafb;
          font-weight: 600;
          color: #374151;
        }
        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        .status-applied { background: #e0f2fe; color: #0369a1; }
        .status-interview { background: #fef3c7; color: #92400e; }
        .status-passed { background: #dcfce7; color: #166534; }
        .status-rejected { background: #fee2e2; color: #991b1b; }
        .actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn-icon {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0.25rem;
          border-radius: 0.25rem;
        }
        .btn-icon:hover {
          background: #f3f4f6;
        }
        .btn-delete:hover {
          background: #fee2e2;
        }
      `}</style>
    </div>
  );
};

export default ApplicantTable;
