
import React from 'react';
import FileDrop from './componets/FileDrop';
import GatorEntriesTable from './componets/GatorEntriesTable';

const App: React.FC = () => {
    return (
        <div>
            <FileDrop/>
            <GatorEntriesTable/>
        </div>
    );
};

export default App;
