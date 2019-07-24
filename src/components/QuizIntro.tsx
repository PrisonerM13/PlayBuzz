import React, { useState } from 'react';
import IQuizHeader from '../models/IQuizHeader';
import Loader from './Loader';

const QuizIntro: React.FC<IQuizHeader & { onStart: () => void }> = ({
  title,
  description,
  createdBy,
  createdAt,
  imgSrc,
  onStart,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const render = () => setIsLoading(false);
  return (
    <div>
      {isLoading && <Loader />}
      <section
        className="quiz-intro"
        onClick={onStart}
        style={isLoading ? { display: 'none' } : {}}
      >
        <header>{title}</header>
        <div>By: {createdBy}</div>
        <div>
          {new Date(createdAt).toLocaleDateString('default', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </div>
        {imgSrc ? <img src={imgSrc} alt={title} onLoad={render} /> : render()}
        <p>{description}</p>
        <button onClick={onStart}>Start</button>
      </section>
    </div>
  );
};

export default QuizIntro;
