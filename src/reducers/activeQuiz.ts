import { initialQuizState, QuizView } from '../containers/Quiz';
import IAction from '../models/IAction';
import Quiz from '../models/Quiz';

const ActionTypes = {
  SET_QUIZ: 'SET_QUIZ',
  SET_VIEW: 'SET_VIEW',
  SET_QUESTION_INDEX: 'SET_QUESTION_INDEX',
  ADVANCE_QUESTION: 'ADVANCE_QUESTION',
  SET_SCORE: 'SET_SCORE',
  ADD_SCORE: 'ADD_SCORE',
  RESET: 'RESET',
};

export const setQuizAction = (quiz?: Quiz): IAction => ({
  type: ActionTypes.SET_QUIZ,
  payload: quiz,
});

export const setViewAction = (view: QuizView): IAction => ({
  type: ActionTypes.SET_VIEW,
  payload: view,
});

export const setQuestionIndexAction = (index: number): IAction => ({
  type: ActionTypes.SET_QUESTION_INDEX,
  payload: index,
});

export const advanceQuestionAction = (): IAction => ({
  type: ActionTypes.ADVANCE_QUESTION,
});

export const setScoreAction = (score: number): IAction => ({
  type: ActionTypes.SET_SCORE,
  payload: score,
});

export const addScoreAction = (score: number): IAction => ({
  type: ActionTypes.ADD_SCORE,
  payload: score,
});

export const resetAction = (): IAction => ({
  type: ActionTypes.RESET,
});

// const initialState: IActiveQuiz = {
//   activeView: QuizView.intro,
//   activeQuestionIndex: 0,
//   score: 0,
// };

const activeQuizReducer = (state = initialQuizState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.SET_QUIZ:
      return { ...state, quiz: action.payload };
    case ActionTypes.SET_VIEW:
      return { ...state, activeView: action.payload };
    case ActionTypes.SET_QUESTION_INDEX:
      return { ...state, activeQuestionIndex: action.payload };
    case ActionTypes.ADVANCE_QUESTION:
      return { ...state, activeQuestionIndex: state.activeQuestionIndex + 1 };
    case ActionTypes.SET_SCORE:
      return { ...state, score: action.payload };
    case ActionTypes.ADD_SCORE:
      return { ...state, score: state.score + action.payload };
    case ActionTypes.RESET:
      return initialQuizState;
    default:
      return state;
  }
};

export default activeQuizReducer;
