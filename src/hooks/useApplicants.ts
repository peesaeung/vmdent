import { useState, useEffect, useMemo } from 'react';
import { applicantService } from '../services/api';
import type { Applicant } from '../types/applicant';

export function useApplicants() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const data = await applicantService.getAll();
      setApplicants(data);
      setError(null);
    } catch (err) {
      setError('Failed to load applicants. Please check your API URL.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const filteredApplicants = useMemo(() => {
    let result = [...applicants];

    // Search by name
    if (search) {
      result = result.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Filter by status
    if (statusFilter !== 'All') {
      result = result.filter(a => a.status === statusFilter);
    }

    // Sort by latest created date
    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortBy === 'latest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [applicants, search, statusFilter, sortBy]);

  const paginatedApplicants = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredApplicants.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredApplicants, currentPage]);

  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);

  return {
    applicants: paginatedApplicants,
    allApplicants: applicants,
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
    refresh: fetchApplicants,
  };
}
