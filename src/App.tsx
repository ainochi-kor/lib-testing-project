import React from 'react';
import logo from './logo.svg';
import './App.css';
import Modeler3D from './Pages/3D/Modeler3D';
import SortableIndx from './Pages/dnd-kit/sortable/SortableIndex';

function App() {
  return (
    <div className='App'>
      <Modeler3D />
      <SortableIndx />
    </div>
  );
}

export default App;
