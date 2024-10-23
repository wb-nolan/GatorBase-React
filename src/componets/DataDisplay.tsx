import React from "react";
import Input from "./Input"; // Import the Input component
import Button from "./Button"; // Import the Button component
import useFetch from "../hooks/useFetch"; // Import the custom hook
import "../css/DataDisplay.css"; // Import the CSS file for styling

type ApiData = {
  [key: string]: any; // Adjust type based on expected structure of your API data
};

const DataDisplay: React.FC<{ apiUrl: string }> = ({ apiUrl }) => {
  const { data, loading, error } = useFetch<ApiData>(apiUrl); // Use the custom hook to fetch data

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form className="flex-column-form">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="input-group">
            <div>
            <Input
              label={key}
              id={key}
              type="text"
              defaultValue={value} // Set the default value from the API response
            />
            <Button type="button" onClick={() => handleClick(key, value)}>
              SAVE
            </Button>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

// Example function to handle button click
const handleClick = (key: string, value: any) => {
  console.log(`Button clicked for ${key}: ${value}`);
};

export default DataDisplay;
