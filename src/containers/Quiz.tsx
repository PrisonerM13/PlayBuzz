import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import Loading from '../components/Loading';
import QuizIntro from '../components/QuizIntro';
import QuizSummary from '../components/QuizSummary';
import withLoading from '../components/withLoading';
import { IRootState } from '../reducers';
import { IActiveQuiz, setQuizAction } from '../reducers/activeQuiz';
import { getQuiz as getQuizData } from '../server-mock';
import QuizRunner from './QuizRunner';
import { QuizView } from './QuizView';

interface IProps {
  getQuiz: (id: string) => Promise<void>;
}

const Quiz: React.FC<
  IProps & IActiveQuiz & RouteComponentProps<{ id: string }>
> = ({ quiz, activeView, getQuiz, match }) => {
  // get data on mount
  useEffect(() => {
    getQuiz(match.params.id);
  }, [getQuiz, match.params.id]);

  if (!quiz) {
    return <Loading />;
  }

  const QuizIntroWithLoading = withLoading(QuizIntro);
  const QuizSummaryWithLoading = withLoading(QuizSummary);

  switch (activeView) {
    case QuizView.questions:
      return <QuizRunner />;
    case QuizView.summary:
      return <QuizSummaryWithLoading />;
    default:
      return <QuizIntroWithLoading />;
  }
};

const mapStateToProps = (state: IRootState) => ({
  ...state.activeQuiz,
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
