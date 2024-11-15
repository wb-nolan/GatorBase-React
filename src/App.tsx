
import React from 'react';
import FileDrop from './components/FileDrop';
import GatorEntriesTable from './components/GatorEntriesTable';
import './css/styles.css'

const App: React.FC = () => {
    return (
        <div className='app-container'>
            <h1>Dev Alfred (GatorBase)</h1>
            <FileDrop/>
            <GatorEntriesTable/>
        </div>
    );
};

export default App;
