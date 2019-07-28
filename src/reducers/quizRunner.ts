import IAction from '../models/IAction';

enum QuizView {
  start,
  questions,
  summary,
}

const initState = {
  activeQuestion: 0,
  activeView: QuizView.start,
};

const quizRunnerReducer = (state = initState, action: IAction) => {
  switch (action.type) {
    case 'ADVANCE_QUESTION':
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
      };
    case 'CHANGE_VIEW':
      return {
        ...state,
        activeView: action.payload,
        activeQuestion: 0,
      };
    case 'RESET_VIEW':
      return { ...initState };
    default:
      return state;
  }
};

export default quizRunnerReducer;
