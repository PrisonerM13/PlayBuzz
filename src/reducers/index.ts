import { combineReducers } from 'redux';
import IQuizHeader from '../models/IQuizHeader';
import Quiz from '../models/Quiz';
import quiz from './quiz';
import quizList from './quizList';

export interface IRootState {
  quizList: IQuizHeader[];
  quiz: Quiz;
}

export default combineReducers({
  quizList,
  quiz,
});
