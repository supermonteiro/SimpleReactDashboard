import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>            
            <li>
              <Link to="/dashboard/">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact />        
        <Route path="/dashboard/" component={Dashboard} />
      </div>
    </Router>
    </div>
  );
}

export default App;
