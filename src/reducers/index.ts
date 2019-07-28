import { combineReducers } from 'redux';
import { QuizView } from '../containers/Quiz';
import IQuizHeader from '../models/IQuizHeader';
import Quiz from '../models/Quiz';
import activeQuiz from './activeQuiz';
import quizList from './quizList';

export interface IActiveQuiz {
  quiz: Quiz;
  activeView: QuizView;
  activeQuestion: number;
  score: number;
}

export interface IRootState {
  quizList: IQuizHeader[];
  activeQuiz: IActiveQuiz;
}

export default combineReducers({
  quizList,
  activeQuiz,
});
