import React from 'react';
import IQuizHeader from '../models/IQuizHeader';
import QuizCard from './QuizCard';

interface IProps {
  quizList: IQuizHeader[];
  onSelect: (quizId: string) => void;
}

const QuizList: React.FC<IProps> = ({ quizList, onSelect }) => (
  <div className="quiz-list">
    {quizList.map(quiz => (
      <QuizCard
        key={quiz.id}
        onClick={onSelect.bind(null, quiz.id)}
        {...quiz}
      />
    ))}
  </div>
);

export default QuizList;
