import React from 'react';
import IQuizHeader from '../models/IQuizHeader';
import { ILoading } from './withLoading';

interface IProps {
  onStart: () => void;
}

const QuizIntro: React.FC<IQuizHeader & ILoading & IProps> = ({
  title,
  description,
  createdBy,
  createdAt,
  imgSrc,
  onStart,
  isLoading,
  onLoad,
}) => {
  return (
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
      {imgSrc ? (
        <img src={imgSrc} alt={title} onLoad={onLoad} />
      ) : (
        onLoad && onLoad()
      )}
      <p>{description}</p>
      <button onClick={onStart}>Start</button>
    </section>
  );
};

export default QuizIntro;
