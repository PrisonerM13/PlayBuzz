import React from 'react';
import Quiz from '../models/Quiz';

interface IProps {
  quiz: Quiz;
  onStart: () => void;
}

const QuizIntro: React.FC<IProps> = ({ quiz, onStart }) => {
  const { title, description, createdBy, createdAt, imgSrc } = quiz.header;
  return (
    <section className="quiz-intro" onClick={onStart}>
      <header>{title}</header>
      <div>By: {createdBy}</div>
      <div>
        {new Date(createdAt).toLocaleDateString('default', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </div>
      {imgSrc && <img src={imgSrc} alt={title} />}
      <p>{description}</p>
      <button onClick={onStart}>Start</button>
    </section>
  );
};

export default QuizIntro;
