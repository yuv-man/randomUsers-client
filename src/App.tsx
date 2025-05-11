import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
            <Route path="/" element={<UserList isRandom={true} />} />
            <Route path="/random-users" element={<UserList isRandom={true} />} />
            <Route path="/history" element={<UserList isRandom={false} />} />
          <Route path="/user/:id" element={<div>User Details Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 