import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AnalyticPage from './pages/AnalyticPage';
import StoryPage from './pages/StoryPage';
import DetailPage from './pages/DetailPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <header className="App-header">
            <ul>
              <li><Link to="/">HomePage</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/analytic">Analytic Report</Link></li>
              <li><Link to="/story">Story Report(Save report)</Link></li>
              <li><Link to="/detail/:id">Detail Page</Link></li>
            </ul>
          </header>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/analytic" component={AnalyticPage} />
          <Route exact path="/story" component={StoryPage} />
          <Route exact path="/detail/:id" component={DetailPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
