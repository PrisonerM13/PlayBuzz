import React from 'react';
import IQuizHeader from '../models/IQuizHeader';

const QuizCard: React.FC<IQuizHeader & { onClick: () => void }> = ({
  title,
  createdBy,
  createdAt,
  imgSrc,
  onClick,
}) => (
  <section className="quiz-card" onClick={onClick}>
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
  </section>
);

export default QuizCard;
