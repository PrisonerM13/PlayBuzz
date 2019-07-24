import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Quiz from '../../containers/Quiz';
import QuizList from '../QuizList';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
      </Switch>
    </div>
  );
};

export default App;
