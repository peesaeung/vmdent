import React, { useState } from 'react';
import { useApplicants } from '../hooks/useApplicants';
import { applicantService } from '../services/api';
import ApplicantTable from './ApplicantTable';
import ApplicantForm from './ApplicantForm';
import FilterBar from './FilterBar';
import type { Applicant } from '../types/applicant';

const ApplicantManager: React.FC = () => {
  const {
    applicants,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    refresh
  } = useApplicants();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApplicant, setEditingApplicant] = useState<Applicant | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleCreate = () => {
    setEditingApplicant(null);
    setIsFormOpen(true);
  };

  const handleEdit = (applicant: Applicant) => {
    setEditingApplicant(applicant);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this applicant?')) return;
    
    setActionLoading(true);
    try {
      const res = await applicantService.delete(id);
      if (res.error) alert(res.error);
      else refresh();
    } catch (err) {
      alert('Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    setActionLoading(true);
    try {
      let res;
      if (editingApplicant) {
        res = await applicantService.update({ ...data, id: editingApplicant.id });
      } else {
        res = await applicantService.create(data);
      }

      if (res.error) {
        alert(res.error);
      } else {
        setIsFormOpen(false);
        refresh();
      }
    } catch (err) {
      alert('Save failed');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto p-8 max-sm:p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Job Applicant Management</h1>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          onClick={handleCreate}
        >
          + Add Applicant
        </button>
      </header>

      <FilterBar 
        search={search} 
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-xl text-slate-500">
          Loading applicants...
        </div>
      ) : (
        <>
          <ApplicantTable 
            applicants={applicants} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
          
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition-colors"
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            <span className="font-medium">Page {currentPage} of {totalPages || 1}</span>
            <button 
              className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition-colors"
              disabled={currentPage === totalPages || totalPages === 0} 
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {isFormOpen && (
        <ApplicantForm 
          applicant={editingApplicant} 
          onSave={handleSave} 
          onClose={() => setIsFormOpen(false)}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default ApplicantManager;
