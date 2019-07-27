import React, { useState } from 'react';
import IQuizHeader from '../models/IQuizHeader';
import { getQuizList } from '../server-mock';
import Loading from './Loading';
import QuizCard from './QuizCard';

const QuizList: React.FC = () => {
  const [quizList, setQuizList] = useState<IQuizHeader[]>();

  async function load() {
    setQuizList(await getQuizList());
  }

  if (!quizList) {
    load();
    return <Loading />;
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
