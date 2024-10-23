// Example usage in another component
import React from 'react';
import DataDisplay from './componets/DataDisplay';

const App: React.FC = () => {
    const apiUrl = 'http://3.11.151.236/api/wb_projects/66'; // Replace with your desired API URL

    return (
        <div>
            <DataDisplay apiUrl={apiUrl} />
        </div>
    );
};

export default App;
