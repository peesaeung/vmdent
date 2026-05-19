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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-[600px] shadow-xl max-sm:p-6">
        <h2 className="text-xl font-bold mb-6 text-slate-800">{applicant ? 'Edit Applicant' : 'Add New Applicant'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-600">Full Name *</label>
            <input 
              type="text" 
              className={`p-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <span className="text-xs text-red-600 font-medium">{errors.name}</span>}
          </div>

          <div className="flex gap-4 max-sm:flex-col max-sm:gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-semibold text-slate-600">Email *</label>
              <input 
                type="email" 
                className={`p-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <span className="text-xs text-red-600 font-medium">{errors.email}</span>}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-semibold text-slate-600">Phone *</label>
              <input 
                type="text" 
                className={`p-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <span className="text-xs text-red-600 font-medium">{errors.phone}</span>}
            </div>
          </div>

          <div className="flex gap-4 max-sm:flex-col max-sm:gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-semibold text-slate-600">Position *</label>
              <input 
                type="text" 
                className={`p-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${errors.position ? 'border-red-500' : 'border-slate-300'}`}
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
              {errors.position && <span className="text-xs text-red-600 font-medium">{errors.position}</span>}
            </div>
            {applicant && (
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-semibold text-slate-600">Status</label>
                <select 
                  className="p-2 border border-slate-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-slate-600">Note</label>
            <textarea 
              rows={3}
              className="p-2 border border-slate-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button 
              type="button" 
              className="px-6 py-2 bg-slate-200 text-slate-700 rounded-md font-medium hover:bg-slate-300 transition-colors"
              onClick={onClose} 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Applicant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicantForm;
