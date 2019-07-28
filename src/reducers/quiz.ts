import IAction from '../models/IAction';
import Quiz from '../models/Quiz';

const ActionTypes = {
  SET_QUIZ: 'SET_QUIZ',
};

export const setQuiz = (quiz?: Quiz): IAction => ({
  type: ActionTypes.SET_QUIZ,
  payload: quiz,
});

const quizReducer = (state = {}, action: IAction) => {
  switch (action.type) {
    case ActionTypes.SET_QUIZ:
      return action.payload;
    default:
      return state;
  }
};

export default quizReducer;
