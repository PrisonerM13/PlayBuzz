import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ProgressBar from '../components/ProgressBar';
import ProgressIndicator from '../components/ProgressIndicator';
import Question from '../components/Question';
import withLoading from '../components/withLoading';
import { IRootState } from '../reducers';
import {
  addScoreAction,
  advanceQuestionAction,
  IActiveQuiz,
  setViewAction,
} from '../reducers/activeQuiz';
import { QuizView } from './QuizView';

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
  const { questions } = quiz;
  const activeQuestion = questions[activeQuestionIndex];

  const onAnswer = (index: number) => {
    addScore(activeQuestion.options[index].score);
    if (activeQuestionIndex === questions.length - 1) {
      setView(QuizView.summary);
    }
    advanceQuestion();
  };

  const QuestionWithLoading = withLoading(Question);
  return (
    <section className="quiz-runner">
      <ProgressIndicator />
      <ProgressBar />
      <QuestionWithLoading {...activeQuestion} onAnswer={onAnswer} />
    </section>
  );
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
