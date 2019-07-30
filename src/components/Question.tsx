import React from 'react';
import QuestionModel from '../models/Question';
import Option from './Option';
import { ILoading } from './withLoading';

interface IProps {
  onAnswer: (index: number) => void;
}

const Question: React.FC<QuestionModel & IProps & ILoading> = ({
  text,
  options,
  imgSrc,
  onAnswer,
  isLoading,
  onLoad,
}) => {
  return (
    <section className="question" style={isLoading ? { display: 'none' } : {}}>
      <header>{text}</header>
      {imgSrc ? (
        <img src={imgSrc} alt={text} onLoad={onLoad} />
      ) : (
        onLoad && onLoad()
      )}
      <section className="question-options">
        {options.map((option, index) => (
          <Option
            key={index}
            onClick={onAnswer.bind(null, index)}
            {...option}
          />
        ))}
      </section>
    </section>
  );
};

export default Question;
