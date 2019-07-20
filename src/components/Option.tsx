import React from 'react';
import OptionModel from '../models/Option';

const Option: React.FC<
  OptionModel & { onClick: () => void } & { isSingleInRow: boolean }
> = ({ isSingleInRow, text, imgSrc, onClick }) => {
  const onOptionClick = () => onClick();
  return (
    <section
      className={
        'question-option' + (isSingleInRow ? ' question-option--single' : '')
      }
      onClick={onOptionClick}
    >
      <header>{text}</header>
      {imgSrc && <img src={imgSrc} alt={text} />}
    </section>
  );
};

export default Option;
