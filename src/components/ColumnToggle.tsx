import React from "react";
import { type Column } from "./GatorEntriesTable";

interface ColumnToggleProps {
  columns: Column[];
  visibleColumns: { [key: string]: boolean };
  hiddenColumns: { [key: string]: boolean };
  onColumnToggle: (columnValue: string) => void;
}

const ColumnToggle: React.FC<ColumnToggleProps> = ({
  columns,
  visibleColumns,
  hiddenColumns,
  onColumnToggle,
}) => {
  return (
    <div>
      <h3>Toggle Columns:</h3>
      {columns.map(
        (column) =>
          !hiddenColumns[column.value] && (
            <label key={column.value}>
              <input
                type="checkbox"
                checked={
                  visibleColumns[column.value] && !hiddenColumns[column.value]
                }
                onChange={() => onColumnToggle(column.value)}
              />
              {column.label}
            </label>
          )
      )}
    </div>
  );
};

export default ColumnToggle;
