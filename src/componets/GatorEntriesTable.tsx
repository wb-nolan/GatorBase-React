import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEntries, GatorEntry, selectEntries } from "../store/entriesSlice";
import "../css/GatorEntriesTable.css";

const columns = [
  { label: "MPM Number", value: "mpm_number" },
  { label: "Title", value: "title_desc" },
  { label: "Barcode", value: "barcode" },
  { label: "Title No", value: "title_no" },
  { label: "Medium Format", value: "med_fmt" },
  { label: "Ep Title", value: "ep_title" },
  { label: "Episode Number", value: "episode_number" },
  { label: "Title Episodic MPM", value: "title_no_episodic_mpm" },
];

const GatorEntriesTable: React.FC = () => {
    const dispatch = useDispatch();
    const entries = useSelector(selectEntries);
    const loading = useSelector((state: any) => state.entries.loading);
    const error = useSelector((state: any) => state.entries.error);
  
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState(columns[0].value); // Default to the first column
    const [visibleColumns, setVisibleColumns] = useState<{ [key: string]: boolean }>({}); // Track visible columns
  
    useEffect(() => {
      dispatch(fetchEntries());
    }, [dispatch]);
  
    useEffect(() => {
      // Initialize all columns to be visible by default
      const initialVisibleColumns = columns.reduce((acc, column) => {
        acc[column.value] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setVisibleColumns(initialVisibleColumns);
    }, []);
  
    // Filter entries based on search term and selected column
    const filteredEntries = entries.filter((entry) =>
      entry[searchColumn]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  
    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSearchColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchColumn(event.target.value);
    };
  
    const handleColumnToggle = (columnValue: string) => {
      setVisibleColumns((prev) => ({
        ...prev,
        [columnValue]: !prev[columnValue],
      }));
    };
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <h2>Gator Entries</h2>
  
        <label htmlFor="searchColumn">Search By:</label>
        <select id="searchColumn" value={searchColumn} onChange={handleSearchColumnChange}>
          {columns.map((column) => (
            <option key={column.value} value={column.value}>
              {column.label}
            </option>
          ))}
        </select>
  
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder={`Search by ${searchColumn}`}
          className="search-input" // Apply your CSS class
        />
  
        {/* Checkboxes for column visibility */}
        <div>
          <h3>Toggle Columns:</h3>
          {columns.map((column) => (
            <label key={column.value}>
              <input
                type="checkbox"
                checked={visibleColumns[column.value]}
                onChange={() => handleColumnToggle(column.value)}
              />
              {column.label}
            </label>
          ))}
        </div>
  
        {entries.length > 0 ? (
          <table className="entries-table"> {/* Apply your CSS class */}
            <thead>
              <tr>
                {columns.map(
                  (column) =>
                    visibleColumns[column.value] && (
                      <th key={column.value}>{column.label}</th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {(searchTerm ? filteredEntries : entries).map((entry) => (
                <tr key={entry.id}>
                  {columns.map(
                    (column) =>
                      visibleColumns[column.value] && (
                        <td key={column.value}>{entry[column.value]}</td>
                      )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No results</div>
        )}
      </div>
    );
  };
  
  export default GatorEntriesTable;