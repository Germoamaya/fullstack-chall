import React from 'react';
import './App.css';
import ProjectList from './components/ProjectList';

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1>PJM Project Explorer</h1>
        <p>Browse, filter, and bookmark renewable energy projects.</p>
      </header>
      <ProjectList />
    </main>
  );
}

export default App;
