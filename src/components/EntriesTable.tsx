import React from "react";
import { fetchEntries, GatorEntry } from "../store/entriesSlice.ts";
import { type Column } from "./GatorEntriesTable.tsx";

interface EntriesTableProps {
  filteredEntries: GatorEntry[];
  columns: Column[];
  visibleColumns: { [key: string]: boolean };
  hiddenColumns: { [key: string]: boolean };
}

const EntriesTable: React.FC<EntriesTableProps> = ({
  filteredEntries,
  columns,
  visibleColumns,
  hiddenColumns,
}) => {
  return (
    <div>
      <table className="entries-table">
        <thead>
          <tr>
            {columns.map((column, index) =>
              visibleColumns[column.value] && !hiddenColumns[column.value] ? (
                <th key={`${column.value}-${index}`}>{column.label}</th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <tr key={entry.id}>
              {columns.map((column, index) =>
                visibleColumns[column.value] && !hiddenColumns[column.value] ? (
                  <td key={`${column.value}-${index}`}>
                    {entry[column.value as keyof GatorEntry]}
                  </td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesTable;
