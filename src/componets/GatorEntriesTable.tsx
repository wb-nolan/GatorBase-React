import React, { ChangeEvent, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEntries, GatorEntry, selectEntries } from "../store/entriesSlice";
import "../css/GatorEntriesTable.css";
import axios from "axios";

type SearchColumn = 'mpm_number' | 'title_desc' | 'barcode' | 'title_no' | 'med_fmt' | 'ep_title' | 'episode_number' | 'title_no_episodic_mpm';


const columns = [
  { label: "Title", value: "title_desc" },
  { label: "MPM Number", value: "mpm_number" },
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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState<SearchColumn>(columns[0].value as SearchColumn); // Default to the first column
  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: boolean;
  }>({}); // Track visible columns

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


  const filteredEntries = entries.filter((entry) =>
    entry[searchColumn]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchColumnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchColumn(event.target.value);
  };

  const handleColumnToggle = (columnValue: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnValue]: !prev[columnValue],
    }));
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p> Error Fetching entries: {error}</p>
        <button onClick={() => dispatch(fetchEntries())}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Gator Entries</h2>

      <label htmlFor="searchColumn">Search By:</label>
      <select
        id="searchColumn"
        value={searchColumn}
        onChange={handleSearchColumnChange}
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
        onChange={handleSearchTermChange}
        placeholder={`Search by ${searchColumn}`}
        className="search-input" 
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
        <table className="entries-table">
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
