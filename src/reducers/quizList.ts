import IAction from '../models/IAction';
import IQuizHeader from '../models/IQuizHeader';

const ActionTypes = {
  SET_QUIZ_LIST: 'SET_QUIZ_LIST',
};

export const setQuizListAction = (quizList: IQuizHeader[]) => ({
  type: ActionTypes.SET_QUIZ_LIST,
  payload: quizList,
});

const quizListReducer = (state: IQuizHeader[] = [], action: IAction) => {
  switch (action.type) {
    case ActionTypes.SET_QUIZ_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default quizListReducer;
