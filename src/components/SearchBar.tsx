import React from "react";

interface SearchBarProps {
  searchTerm: string;
  searchColumn: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchColumnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  columns: { label: string; value: string }[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  searchColumn,
  onSearchTermChange,
  onSearchColumnChange,
  columns,
}) => {
  return (
    <div>
      <label htmlFor="searchColumn">Search By:</label>
      <select
        id="searchColumn"
        value={searchColumn}
        onChange={onSearchColumnChange}
      >
        {columns.map((column) => (
          <option key={column.value} value={column.value}>
            {column.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchTermChange}
        placeholder={`Search by ${searchColumn}`}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
