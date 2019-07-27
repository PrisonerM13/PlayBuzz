import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Quiz from '../models/Quiz';
import Result from '../models/Result';
import { getMediaType, MediaType } from '../utils';
import { ILoading } from './withLoading';

interface IProps {
  quiz: Quiz;
  score: number;
}

const QuizSummary: React.FC<ILoading & IProps> = ({
  quiz,
  score,
  isLoading,
  onLoad,
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const result = quiz.findResult(score) || quiz.genericResult;
  const { title, description, imgSrc } = result;
  const maxScore = Math.max(...quiz.results.map(r => r.maxScore));
  const onReturn = () => {
    setIsFinished(true);
  };
  if (isFinished) {
    return <Redirect push={true} to={`/`} />;
  }
  return (
    <section
      className="quiz-summary"
      style={isLoading ? { display: 'none' } : {}}
    >
      {imgSrc && getScoreElement(score, maxScore, 'quiz-summary-score')}
      {title && <header>{title}</header>}
      {getMediaElement(result, onLoad) ||
        getScoreElement(score, maxScore, 'quiz-summary-score--graphic')}
      {description && <p>{description}</p>}
      <button onClick={onReturn}>Return</button>
    </section>
  );
};

//#region Helper functions
function getMediaElement(
  result: Result,
  onLoad?: () => void,
): JSX.Element | undefined {
  const { title, imgSrc } = result;
  if (!imgSrc) {
    if (onLoad) {
      onLoad();
    }
    return;
  }
  return getMediaType(imgSrc) === MediaType.video ? (
    <video autoPlay={true} loop={true} onCanPlay={onLoad}>
      <source src={imgSrc} />
    </video>
  ) : (
    <img src={imgSrc} alt={title} onLoad={onLoad} />
  );
}

function getScoreElement(score: number, maxScore: number, className: string) {
  return (
    <div className={className}>
      <span>
        {score}/{maxScore}
      </span>
    </div>
  );
}
//#endregion Helper functions

export default QuizSummary;
