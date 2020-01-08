import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import WelcomePage from './components/welcomepage';
import Record from './components/record';
import TranslationPage from './components/translationpage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={WelcomePage} />
          <Route exact path='/translate' component={TranslationPage} />
          <Route exact path='/record' component={Record} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
