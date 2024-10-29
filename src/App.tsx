
import React from 'react';
import FileDrop from './components/FileDrop';
import GatorEntriesTable from './components/GatorEntriesTable';
import './css/styles.css'

const App: React.FC = () => {
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Gator DataBase</h1>
            <FileDrop/>
            <GatorEntriesTable/>
        </div>
    );
};

export default App;
