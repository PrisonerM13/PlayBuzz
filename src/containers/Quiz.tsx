import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import Loading from '../components/Loading';
import QuizIntro from '../components/QuizIntro';
import QuizSummary from '../components/QuizSummary';
import withLoading from '../components/withLoading';
import { IActiveQuiz, IRootState } from '../reducers';
import { setQuizAction } from '../reducers/activeQuiz';
import { getQuiz as getQuizData } from '../server-mock';
import QuizRunner from './QuizRunner';

export enum QuizView {
  intro,
  questions,
  summary,
}

interface IProps {
  getQuiz: (id: string) => Promise<void>;
}

const Quiz: React.FC<IProps & IActiveQuiz & RouteComponentProps<{ id: string }>> = ({
  quiz,
  getQuiz,
  match,
}) => {
  const [activeView, setActiveView] = useState(QuizView.intro);
  const [totalScore, setTotalScore] = useState(0);

  // get data on mount
  useEffect(() => {
    getQuiz(match.params.id);
  });

  const onStart = () => {
    setActiveView(QuizView.questions);
  };
  const onFinish = (score: number) => {
    setTotalScore(score);
    setActiveView(QuizView.summary);
  };

  if (!quiz) {
    return <Loading />;
  }

  const QuizIntroWithLoading = withLoading(QuizIntro);
  const QuizSummaryWithLoading = withLoading(QuizSummary);

  switch (activeView) {
    case QuizView.questions:
      return <QuizRunner quiz={quiz} onFinish={onFinish} />;
    case QuizView.summary:
      return <QuizSummaryWithLoading quiz={quiz} score={totalScore} />;
    default:
      return <QuizIntroWithLoading {...quiz.header} onStart={onStart} />;
  }
};

const mapStateToProps = (state: IRootState) => ({
  quiz: state.activeQuiz.quiz,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getQuiz: async (id: string) => {
    dispatch(setQuizAction(await getQuizData(id)));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz);
