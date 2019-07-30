import { combineReducers } from 'redux';
import IQuizHeader from '../models/IQuizHeader';
import activeQuiz, { IActiveQuiz } from './activeQuiz';
import quizList from './quizList';

export interface IRootState {
  quizList: IQuizHeader[];
  activeQuiz: IActiveQuiz;
}

export default combineReducers({
  quizList,
  activeQuiz,
});
