import React from 'react';
import IQuestion from '../models/Question';
import Option from './Option';

const Question: React.FC<IQuestion & { onAnswer: (index: number) => void }> = ({
  text,
  imgSrc,
  options,
  onAnswer,
}) => (
  <section className="question">
    <header>{text}</header>
    {imgSrc && <img src={imgSrc} alt={text} />}
    <section className="question-options">
      {options.map((option, index) => (
        <Option
          key={index}
          isSingleInRow={isSingleInRow(options.length, index)}
          onClick={onAnswer.bind(null, index)}
          {...option}
        />
      ))}
    </section>
  </section>
);

// is option is placed alone in row
function isSingleInRow(optionsCount: number, index: number) {
  return index === optionsCount - 1 && optionsCount % 2 !== 0;
}

export default Question;
