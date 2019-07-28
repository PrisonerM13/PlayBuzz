import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import IQuizHeader from '../models/IQuizHeader';

const QuizCard: React.FC<IQuizHeader> = ({
  id,
  title,
  createdBy,
  createdAt,
  imgSrc,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    setIsSelected(true);
  };
  if (isSelected) {
    return <Redirect push={true} to={`/${id}`} />;
  }
  return (
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
};

export default QuizCard;
