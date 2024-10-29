import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEntries, GatorEntry, selectEntries } from "../store/entriesSlice";
import ColumnToggle from "./ColumnToggle";
import EntriesTable from "./EntriesTable";
import "../css/GatorEntriesTable.css";
import { stat } from "fs";

export type Column = {
  label: string;
  value: string;
};

export const columns: Column[] = [
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
  const [searchColumn, setSearchColumn] = useState<string>(columns[0].value);
  const [secondSearchTerm, setSecondSearchTerm] = useState("");
  const [secondSearchColumn, setSecondSearchColumn] = useState<string>(
    columns[1].value
  );

  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: boolean;
  }>({});
  const [entryType, setEntryType] = useState<"movies" | "episodics" | "all">(
    "all"
  );

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch]);

  useEffect(() => {
    const initialVisibleColumns = columns.reduce((acc, column) => {
      acc[column.value] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setVisibleColumns(initialVisibleColumns);
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const isEpisodic = Boolean(entry.title_no_episodic_mpm);

    const matchSearch = entry[searchColumn as keyof GatorEntry]
      .toString()
      .toLowerCase()
      .includes(searchTerm.toLocaleLowerCase());

    const matchSecondFilter = entry[secondSearchColumn as keyof GatorEntry]
      .toString()
      .toLowerCase()
      .includes(secondSearchTerm.toLowerCase());

    const matchType =
      entryType === "all" ||
      (entryType === "movies" && !isEpisodic) ||
      (entryType === "episodics" && isEpisodic);
    return matchSearch && matchSecondFilter && matchType;
  });

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchColumnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchColumn(event.target.value);
  };

  const handleColumnToggle = (columnValue: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnValue]: !prev[columnValue],
    }));
  };

  const handleEntryTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setEntryType(event.target.value as "movies" | "episodics" | "all");
  };

  const hiddenColumns = columns.reduce((acc, column) => {
    const isHidden =
      entryType === "movies" &&
      (column.value === "ep_title" ||
        column.value === "episode_number" ||
        column.value === "title_no_episodic_mpm");
    if (isHidden) {
      acc[column.value] = true;
    }
    return acc;
  }, {} as { [key: string]: boolean });

  if (loading) return <div className="spinner"> Loading</div>;
  if (error)
    return (
      <div>
        <p>Error Fetching entries: {error}</p>
      </div>
    );

  return (
    <div>

      <div className="selector-container">
        <div>
          <label htmlFor="searchColumn">Search By:</label>
          <select
            id="searchColumn"
            value={searchColumn}
            onChange={handleSearchColumnChange}
          >
            {columns.filter(column => !hiddenColumns[column.value]).map(column => (
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
        </div>

        <div>
          <label htmlFor="entryType"> Select Type:</label>
          <select
            id="entryType"
            value={entryType}
            onChange={handleEntryTypeChange}
          >
            <option value="all">All</option>
            <option value="movies">Movies</option>
            <option value="episodics">Episodics</option>
          </select>
        </div>

        <div>
          <label htmlFor="secondSearchColumn"> Filter By:</label>
          <select
            id="secondSearchColumn"
            value={secondSearchColumn}
            onChange={(e) => setSecondSearchColumn(e.target.value)}
          >
            {columns.filter(column => !hiddenColumns[column.value]).map(column => (
              <option key={column.value} value={column.value}>
                {column.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={secondSearchTerm}
            onChange={(e) => setSecondSearchTerm(e.target.value)}
            placeholder={`Filter by ${secondSearchColumn}`}
            className="search-input"
          />
        </div>

        
      </div>


      <ColumnToggle
        columns={columns}
        visibleColumns={visibleColumns}
        hiddenColumns={hiddenColumns}
        onColumnToggle={handleColumnToggle}
      />
        <h2> Gator Entries</h2>
      {filteredEntries.length > 0 ? (
        <EntriesTable
          filteredEntries={filteredEntries}
          columns={columns}
          visibleColumns={visibleColumns}
          hiddenColumns={hiddenColumns}
        />
      ) : (
        <div> No results</div>
      )}
    </div>
  );
};

export default GatorEntriesTable;
