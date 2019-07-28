import { QuizView } from '../containers/Quiz';
import IAction from '../models/IAction';
import Quiz from '../models/Quiz';

const ActionTypes = {
  SET_QUIZ: 'SET_QUIZ',
  SET_ACTIVE_VIEW: 'SET_ACTIVE_VIEW',
  SET_ACTIVE_QUESTION: 'SET_ACTIVE_QUESTION',
  SET_SCORE: 'SET_SCORE',
};

export const setQuizAction = (quiz?: Quiz): IAction => ({
  type: ActionTypes.SET_QUIZ,
  payload: quiz,
});

export const setActiveView = (view: QuizView): IAction => ({
  type: ActionTypes.SET_ACTIVE_VIEW,
  payload: view,
});

export const setActiveQuestion = (index: number): IAction => ({
  type: ActionTypes.SET_ACTIVE_VIEW,
  payload: index,
});

export const setScore = (score: number): IAction => ({
  type: ActionTypes.SET_ACTIVE_VIEW,
  payload: score,
});

const activeQuizReducer = (state = {}, action: IAction) => {
  switch (action.type) {
    case ActionTypes.SET_QUIZ:
      return { ...state, quiz: action.payload };
    case ActionTypes.SET_ACTIVE_VIEW:
      return { ...state, activeView: action.payload };
    case ActionTypes.SET_ACTIVE_QUESTION:
      return { ...state, activeQuestion: action.payload };
    case ActionTypes.SET_SCORE:
      return { ...state, score: action.payload };
    default:
      return state;
  }
};

export default activeQuizReducer;
