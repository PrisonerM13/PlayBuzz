import React, { useState } from 'react';
import QuestionModel from '../models/Question';
import Option from './Option';
import { ILoading } from './withLoading';

const DELAY_TIME_BEFORE_MOVE_NEXT = 1000;

interface IProps {
  onAnswer: (index: number) => void;
}

const Question: React.FC<QuestionModel & IProps & ILoading> = ({
  text,
  options,
  imgSrc,
  isTrueOrFalse,
  onAnswer,
  isLoading,
  onLoad,
}) => {
  const [isPostAnswer, setIsPostAnswer] = useState(false);

  const onOptionSelected = (index: number) => {
    setIsPostAnswer(true);
    if (isTrueOrFalse) {
      setTimeout(() => {
        onAnswer(index);
      }, DELAY_TIME_BEFORE_MOVE_NEXT);
    } else {
      onAnswer(index);
    }
  };

  // If no image there's nothing to wait for
  if (!imgSrc && onLoad) {
    onLoad();
  }

  return (
    <section className="question" style={isLoading ? { display: 'none' } : {}}>
      <header>{text}</header>
      {imgSrc && <img src={imgSrc} alt={text} onLoad={onLoad} />}
      <section className="question-options">
        {options.map((option, index) => (
          <Option
            key={index}
            isTrueOrFalse={isTrueOrFalse}
            isPostAnswer={isPostAnswer}
            onSelected={onOptionSelected.bind(null, index)}
            {...option}
          />
        ))}
      </section>
    </section>
  );
};

export default Question;
