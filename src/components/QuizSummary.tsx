import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import Result from '../models/Result';
import { IRootState } from '../reducers';
import { IActiveQuiz, resetAction } from '../reducers/activeQuiz';
import { getMediaType, MediaType } from '../utils';
import { ILoading } from './withLoading';

interface IProps {
  reset: () => void;
}

const QuizSummary: React.FC<IProps & IActiveQuiz & ILoading> = ({
  quiz,
  score,
  isLoading,
  onLoad,
  reset,
}) => {
  const [isFinished, setIsFinished] = useState(false);
  const result = quiz.findResult(score) || quiz.genericResult;
  const { title, description, imgSrc } = result;
  const maxScore = Math.max(...quiz.results.map(r => r.maxScore));
  const onReturn = () => {
    setIsFinished(true);
  };

  if (isFinished) {
    reset();
    return <Redirect push={true} to={`/`} />;
  }

  if (!imgSrc && onLoad) {
    onLoad();
  }

  return (
    <section
      className="quiz-summary"
      style={isLoading ? { display: 'none' } : {}}
    >
      {imgSrc &&
        quiz.isTrueOrFalse &&
        getScoreElement(score, maxScore, 'quiz-summary-score')}
      {(title && <header>{title}</header>) ||
        (quiz.isTrueOrFalse && <header>{getTitle(score, maxScore)}</header>)}
      {(imgSrc && getMediaElement(result, onLoad)) ||
        getScoreElement(
          score,
          maxScore,
          'quiz-summary-score--no-media',
          quiz.isTrueOrFalse,
        )}
      {description && <p>{description}</p>}
      <button onClick={onReturn}>Return</button>
    </section>
  );
};

const mapStateToProps = (state: IRootState) => ({
  ...state.activeQuiz,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  reset: () => dispatch(resetAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizSummary);

//#region Helper functions
function getTitle(score: number, maxScore: number) {
  const relatedScore = score / maxScore;
  if (relatedScore <= 0.25) {
    return 'Not so good...';
  }
  if (relatedScore > 0.25 && relatedScore <= 0.5) {
    return 'Could be better...';
  }
  if (relatedScore > 0.5 && relatedScore <= 0.75) {
    return 'Pretty good!';
  }
  if (relatedScore > 0.75) {
    return 'Well done!!!';
  }
}

function getMediaElement(
  result: Result,
  onLoad?: () => void,
): JSX.Element | void {
  const { title, imgSrc } = result;
  return getMediaType(imgSrc) === MediaType.video ? (
    <video autoPlay={true} loop={true} onCanPlay={onLoad}>
      <source src={imgSrc} />
    </video>
  ) : (
    <img src={imgSrc} alt={title} onLoad={onLoad} />
  );
}

function getScoreElement(
  score: number,
  maxScore: number,
  className: string,
  isTrueOrFalse?: boolean,
) {
  return (
    <div className={className}>
      {isTrueOrFalse && (
        <span>
          {score}/{maxScore}
        </span>
      )}
    </div>
  );
}
//#endregion Helper functions
