import React, { useState } from 'react';
import OptionModel from '../models/Option';

interface IProps {
  isTrueOrFalse: boolean;
  isPostAnswer: boolean;
  onSelected: () => void;
}

const Option: React.FC<OptionModel & IProps> = ({
  text,
  imgSrc,
  isCorrect,
  isTrueOrFalse,
  isPostAnswer,
  onSelected,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    setIsSelected(true);
    onSelected();
  };

  return (
    <section
      className="question-option"
      onClick={!isPostAnswer ? onClick : undefined}
      style={
        isPostAnswer && !(isSelected || isCorrect)
          ? { opacity: 0.3 }
          : isPostAnswer && !isSelected && isCorrect
          ? { backgroundColor: 'lightgreen' }
          : {}
      }
    >
      <div className="question-option-header">
        <header>{text}</header>
        {isTrueOrFalse && (
          <img
            className="question-option__header__result-indicator"
            src={isCorrect ? 'img/correct.svg' : 'img/incorrect.svg'}
            alt={isCorrect ? 'correct' : 'incorrect'}
            style={
              isPostAnswer && (isSelected || isCorrect)
                ? {}
                : { display: 'none' }
            }
          />
        )}
      </div>
      {imgSrc && <img src={imgSrc} alt={text} />}
    </section>
  );
};

export default Option;
