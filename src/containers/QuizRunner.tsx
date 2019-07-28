import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Question from '../components/Question';
import withLoading from '../components/withLoading';
import Quiz from '../models/Quiz';
import { IActiveQuiz, IRootState } from '../reducers';
import {
  addScoreAction,
  advanceQuestionAction,
  setViewAction,
} from '../reducers/activeQuiz';
import { QuizView } from './Quiz';

interface IProps {
  addScore: (score: number) => void;
  advanceQuestion: () => void;
  setView: (view: QuizView) => void;
}

const QuizRunner: React.FC<IProps & IActiveQuiz> = ({
  quiz,
  activeQuestionIndex,
  addScore,
  advanceQuestion,
  setView,
}) => {
  const { questions } = quiz as Quiz;
  const activeQuestion = questions[activeQuestionIndex];

  const onAnswer = (index: number) => {
    addScore(activeQuestion.options[index].score);
    if (activeQuestionIndex === questions.length - 1) {
      setView(QuizView.summary);
    }
    advanceQuestion();
  };

  const QuestionWithLoading = withLoading(Question);
  return <QuestionWithLoading {...activeQuestion} onAnswer={onAnswer} />;
};

const mapStateToProps = (state: IRootState) => ({
  ...state.activeQuiz,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setView: (view: QuizView) => dispatch(setViewAction(view)),
  addScore: (score: number) => dispatch(addScoreAction(score)),
  advanceQuestion: () => dispatch(advanceQuestionAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizRunner);
