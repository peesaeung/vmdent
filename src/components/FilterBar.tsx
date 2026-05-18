import React from 'react';

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  sortBy: 'latest' | 'oldest';
  onSortByChange: (val: 'latest' | 'oldest') => void;
}

const FilterBar: React.FC<Props> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Search</label>
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="filter-group">
        <label>Status</label>
        <select value={statusFilter} onChange={(e) => onStatusFilterChange(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Passed">Passed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort By</label>
        <select value={sortBy} onChange={(e) => onSortByChange(e.target.value as any)}>
          <option value="latest">Latest Created</option>
          <option value="oldest">Oldest Created</option>
        </select>
      </div>

      <style jsx>{`
        .filter-bar {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          flex-wrap: wrap;
        }
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
          min-width: 200px;
        }
        label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #4b5563;
        }
        input, select {
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default FilterBar;
