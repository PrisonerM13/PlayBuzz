import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import Quiz from '../../containers/Quiz';
import rootReducer from '../../reducers';
import QuizList from '../QuizList';
import './App.scss';

const store = createStore(rootReducer);

const App: React.FC = () => (
  <div className="App">
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/:id" component={Quiz} />
          <Route path="/" component={QuizList} />
        </Switch>
      </Router>
    </Provider>
  </div>
);

export default App;
