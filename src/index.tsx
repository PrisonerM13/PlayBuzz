import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import { getQuizList } from './server-mock';
import * as serviceWorker from './serviceWorker';

getQuizList().then(quizList => {
  ReactDOM.render(<App quizList={quizList} />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
