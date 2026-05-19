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
    <div className="flex flex-wrap gap-6 mb-8 bg-slate-100 p-4 rounded-lg max-sm:flex-col max-sm:gap-4">
      <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
        <label className="text-sm font-semibold text-slate-600">Search</label>
        <input 
          type="text" 
          placeholder="Search by name..." 
          className="p-2 border border-slate-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
        <label className="text-sm font-semibold text-slate-600">Status</label>
        <select 
          className="p-2 border border-slate-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={statusFilter} 
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Passed">Passed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
        <label className="text-sm font-semibold text-slate-600">Sort By</label>
        <select 
          className="p-2 border border-slate-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={sortBy} 
          onChange={(e) => onSortByChange(e.target.value as any)}
        >
          <option value="latest">Latest Created</option>
          <option value="oldest">Oldest Created</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
