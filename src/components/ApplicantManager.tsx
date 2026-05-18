import React, { useState } from 'react';
import { useApplicants } from '../hooks/useApplicants';
import { applicantService } from '../services/api';
import ApplicantTable from './ApplicantTable';
import ApplicantForm from './ApplicantForm';
import FilterBar from './FilterBar';
import type { Applicant, ApplicantStatus } from '../types/applicant';

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
    <div className="container">
      <header>
        <h1>Job Applicant Management</h1>
        <button className="btn btn-primary" onClick={handleCreate}>+ Add Applicant</button>
      </header>

      <FilterBar 
        search={search} 
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading applicants...</div>
      ) : (
        <>
          <ApplicantTable 
            applicants={applicants} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
          
          <div className="pagination">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages || 1}</span>
            <button 
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

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.2rem;
          color: #666;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .alert-error {
          background: #fee2e2;
          color: #dc2626;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }
        .btn {
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          cursor: pointer;
          font-weight: 500;
          border: none;
        }
        .btn-primary {
          background: #2563eb;
          color: white;
        }
        .btn-primary:hover {
          background: #1d4ed8;
        }
      `}</style>
    </div>
  );
};

export default ApplicantManager;
