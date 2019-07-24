import React, { useState } from 'react';
import IQuizHeader from '../models/IQuizHeader';
import { getQuizList } from '../server-mock';
import Loader from './Loader';
import QuizCard from './QuizCard';

const QuizList: React.FC = () => {
  const [quizList, setQuizList] = useState<IQuizHeader[]>();

  async function load() {
    setQuizList(await getQuizList());
  }

  if (!quizList) {
    load();
    return <Loader />;
  }

  return (
    <section>
      <header>Pick a Quiz</header>
      <div className="quiz-list">
        {quizList.map(quiz => (
          <QuizCard key={quiz.id} {...quiz} />
        ))}
      </div>
    </section>
  );
};

export default QuizList;
