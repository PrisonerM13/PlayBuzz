import React, { useState } from 'react';
import QuizIntro from '../components/QuizIntro';
import QuizSummary from '../components/QuizSummary';
import QuizModel from '../models/Quiz';
import QuizRunner from './QuizRunner';

enum QuizView {
  intro,
  questions,
  summary,
}

interface IProps {
  quiz: QuizModel;
  onReturn: () => void;
}

const Quiz: React.FC<IProps> = ({ quiz, onReturn }) => {
  const [activeView, setActiveView] = useState(QuizView.intro);
  const [totalScore, setTotalScore] = useState(0);

  const onStart = () => {
    setActiveView(QuizView.questions);
  };
  const onFinish = (score: number) => {
    setTotalScore(score);
    setActiveView(QuizView.summary);
  };

  switch (activeView) {
    case QuizView.questions:
      return <QuizRunner quiz={quiz} onFinish={onFinish} />;
    case QuizView.summary:
      return <QuizSummary quiz={quiz} score={totalScore} onReturn={onReturn} />;
    default:
      return <QuizIntro quiz={quiz} onStart={onStart} />;
  }
};

export default Quiz;
