import React from "react";

interface EntryTypeSelectorProps {
    entryType: "movies" | "episodics";
    onEntryTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EntryTypeSelector: React.FC<EntryTypeSelectorProps> =({
    entryType,
    onEntryTypeChange,
}) => {
    return (
        <div>
            <label htmlFor="entryType">Select Type:</label>
            <select id="entryType" value={entryType} onChange={onEntryTypeChange}>
                <option value="movies">Movies</option>
                <option value='episodics'>Episodics</option>
            </select>
        </div>
    );
};

export default EntryTypeSelector;