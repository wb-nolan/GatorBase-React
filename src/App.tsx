
import React from 'react';
import FileDrop from './components/FileDrop';
import GatorEntriesTable from './components/GatorEntriesTable';

const App: React.FC = () => {
    return (
        <div>
            <FileDrop/>
            <GatorEntriesTable/>
        </div>
    );
};

export default App;
