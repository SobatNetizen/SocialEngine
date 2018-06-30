import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import NavbarBoot from './components/NavbarBoot';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AnalyticPage from './pages/AnalyticPage';
import StoryPage from './pages/StoryPage';
import DetailPage from './pages/DetailPage';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavbarBoot />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/analytic" component={AnalyticPage} />
            <Route path="/story" component={StoryPage} />
            <Route path="/detail" component={DetailPage} />
            <Route path="*" component={ NotFound } />
          </Switch>
          <div id="footer">
              <div className="container text-center">
                <p className="footer-block">© 2018 SobatNetizen. All Rights Reserved.</p>
              </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
