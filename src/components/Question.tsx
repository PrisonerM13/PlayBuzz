import React, { useState } from 'react';
import IQuestion from '../models/Question';
import Loader from './Loader';
import Option from './Option';

const Question: React.FC<IQuestion & { onAnswer: (index: number) => void }> = ({
  text,
  imgSrc,
  options,
  onAnswer,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const render = () => setIsLoading(false);
  return (
    <div>
      {isLoading && <Loader />}
      <section
        className="question"
        style={isLoading ? { display: 'none' } : {}}
      >
        <header>{text}</header>
        {imgSrc ? <img src={imgSrc} alt={text} onLoad={render} /> : render()}
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
    </div>
  );
};

export default Question;
