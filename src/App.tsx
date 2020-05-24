import React from 'react';
import './App.scss';

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
          Content
        </div>
      </div>
    </div>
  );
}

export default App;
