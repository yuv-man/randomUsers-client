import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import Navigation from './components/Navigation';
import './App.css';
import UserProfilePage from './components/UserProfilePage';
function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
            <Route path="/" element={<UserList isRandom={true} />} />
            <Route path="/random-users" element={<UserList isRandom={true} />} />
            <Route path="/history" element={<UserList isRandom={false} />} />
          <Route path="/user/:id" element={<UserProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 