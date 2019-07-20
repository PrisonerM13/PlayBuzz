import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getQuizList } from './server-mock';

it('renders without crashing', () => {
  const div = document.createElement('div');
  getQuizList().then(quizList => {
    ReactDOM.render(<App quizList={quizList} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
