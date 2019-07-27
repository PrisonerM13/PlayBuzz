import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import Loading from '../components/Loading';
import QuizIntro from '../components/QuizIntro';
import QuizSummary from '../components/QuizSummary';
import withLoading from '../components/withLoading';
import QuizModel from '../models/Quiz';
import { getQuiz } from '../server-mock';
import QuizRunner from './QuizRunner';

enum QuizView {
  intro,
  questions,
  summary,
}

const Quiz: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const [quiz, setQuiz] = useState<QuizModel>();
  const [activeView, setActiveView] = useState(QuizView.intro);
  const [totalScore, setTotalScore] = useState(0);

  const onStart = () => {
    setActiveView(QuizView.questions);
  };
  const onFinish = (score: number) => {
    setTotalScore(score);
    setActiveView(QuizView.summary);
  };

  async function load(id: string) {
    setQuiz(await getQuiz(id));
  }

  if (!quiz) {
    load(match.params.id);
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

export default Quiz;
