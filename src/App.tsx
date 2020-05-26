import React from 'react';
import './App.scss';
import InputsExample from './shared/components/_examples/InputsExample';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <p>
          React + Typescript template
        </p>
      </header>
      <div className="body">
        <div className="sidebar open-menu">
          Sidebar
        </div>
        <div className="content open-menu">
          <InputsExample />
        </div>
      </div>
    </div>
  );
}

export default App;
