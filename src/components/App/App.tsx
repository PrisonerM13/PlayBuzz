import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Quiz from '../../containers/Quiz';
import QuizList from '../QuizList';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/:id" component={Quiz} />
          <Route path="/" component={QuizList} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
