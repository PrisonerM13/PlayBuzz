import React, { useState } from 'react';
import Quiz from '../../containers/Quiz';
import IQuizHeader from '../../models/IQuizHeader';
import { getQuiz } from '../../server-mock';
import QuizList from '../QuizList';
import './App.scss';

const App: React.FC<{quizList: IQuizHeader[]}> = ({ quizList }) => {
  const [activeQuiz, setActiveQuiz] = useState();
  const onQuizReturn = () => setActiveQuiz(null);
  const onQuizSelect = async (quizId: string) => setActiveQuiz(await getQuiz(quizId));
  return (
    <div className="App">
      {!activeQuiz && <header>Pick a Quiz</header>}
      {/* <section className="content"> */}
        {activeQuiz ? (
          <Quiz quiz={activeQuiz} onReturn={onQuizReturn} />
        ) : (
          <QuizList quizList={quizList} onSelect={onQuizSelect} />
        )}
      {/* </section> */}
    </div>
  );
};

export default App;
