import React from 'react';
import Quiz from '../models/Quiz';
import Result from '../models/Result';
import { getMediaType, MediaType } from '../utils';

interface IProps {
  quiz: Quiz;
  score: number;
  onReturn: () => void;
}

const QuizSummary: React.FC<IProps> = ({
  quiz,
  score,
  onReturn,
}) => {
  const result = quiz.findResult(score) || quiz.genericResult;
  const { title, description, imgSrc } = result;
  const maxScore = Math.max(...quiz.results.map(r => r.maxScore));
  return (
    <section className="quiz-summary">
      {imgSrc && getScoreElement(score, maxScore, 'quiz-summary-score')}
      {title && <header>{title}</header>}
      {getMediaElement(result) ||
        getScoreElement(score, maxScore, 'quiz-summary-score--graphic')}
      {description && <p>{description}</p>}
      <button onClick={onReturn}>Return</button>
    </section>
  );
};

//#region Helper functions
function getMediaElement(result: Result): JSX.Element | undefined {
  const { title, imgSrc } = result;
  if (!imgSrc) {
    return;
  }
  return getMediaType(imgSrc) === MediaType.video ? (
    <video autoPlay={true} loop={true}>
      <source src={imgSrc} />
    </video>
  ) : (
    <img src={imgSrc} alt={title} />
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
