import React, { useState, useEffect } from 'react';
import type { Applicant, ApplicantStatus } from '../types/applicant';

interface Props {
  applicant: Applicant | null;
  onSave: (data: any) => void;
  onClose: () => void;
  loading: boolean;
}

const ApplicantForm: React.FC<Props> = ({ applicant, onSave, onClose, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    status: 'Applied' as ApplicantStatus,
    note: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (applicant) {
      setFormData({
        name: applicant.name,
        email: applicant.email,
        phone: applicant.phone,
        position: applicant.position,
        status: applicant.status,
        note: applicant.note || '',
      });
    }
  }, [applicant]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.phone) newErrors.phone = 'Phone is required';
    else if (!/^\d+$/.test(formData.phone)) newErrors.phone = 'Phone must be numbers only';
    
    if (!formData.position) newErrors.position = 'Position is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{applicant ? 'Edit Applicant' : 'Add New Applicant'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Position *</label>
              <input 
                type="text" 
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
              {errors.position && <span className="error">{errors.position}</span>}
            </div>
            {applicant && (
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ApplicantStatus })}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Passed">Passed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Note</label>
            <textarea 
              rows={3}
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Applicant'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        h2 { margin-top: 0; margin-bottom: 1.5rem; }
        .form-group { margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.25rem; }
        .form-row { display: flex; gap: 1rem; }
        .form-row .form-group { flex: 1; }
        label { font-weight: 600; font-size: 0.875rem; color: #4b5563; }
        input, select, textarea {
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 1rem;
        }
        .error { color: #dc2626; font-size: 0.75rem; }
        .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .btn { padding: 0.5rem 1.5rem; border-radius: 0.375rem; cursor: pointer; border: none; font-weight: 500; }
        .btn-secondary { background: #e5e7eb; color: #374151; }
        .btn-primary { background: #2563eb; color: white; }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

export default ApplicantForm;
