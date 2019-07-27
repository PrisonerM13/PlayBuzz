import React, { useState } from 'react';
import Question from '../components/Question';
import withLoading from '../components/withLoading';
import Quiz from '../models/Quiz';

interface IProps {
  quiz: Quiz;
  onFinish: (totalScore: number) => void;
}

const QuizRunner: React.FC<IProps> = ({ quiz, onFinish }) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const { questions } = quiz;
  const activeQuestion = questions[activeQuestionIndex];
  const QuestionWithLoading = withLoading(Question);

  const onAnswer = (index: number) => {
    setTotalScore(totalScore + activeQuestion.options[index].score);
    if (activeQuestionIndex === questions.length - 1) {
      return onFinish(totalScore + activeQuestion.options[index].score);
    }
    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  return <QuestionWithLoading {...activeQuestion} onAnswer={onAnswer} />;
};

export default QuizRunner;
