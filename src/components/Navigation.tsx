import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li><Link to="/random-users">Random Users</Link></li>
        <li><Link to="/history">History</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation; 