import React, { useEffect, useRef, useState } from 'react';
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
  const [isRendered, setIsRendered] = useState(false);
  // Use isMounted to prevent "Warning: Can't perform a React state update on an unmounted component".
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    // Use setTimeout to change rendering AFTER first render (used for animation here)
    setTimeout(() => {
      if (isMounted.current && !isRendered) {
        setIsRendered(true);
      }
    }, 0);
    return () => {
      isMounted.current = false;
    };
  });

  const onReturn = () => {
    setIsFinished(true);
  };

  if (isFinished) {
    reset();
    return <Redirect push={true} to={`/`} />;
  }

  const result = quiz.findResult(score) || quiz.genericResult;
  const { title, description, imgSrc } = result;
  const maxScore = Math.max(...quiz.results.map(r => r.maxScore));

  // If no image there's nothing to wait for
  if (!imgSrc && onLoad) {
    onLoad();
  }

  const getScoreElementBound = getScoreElement.bind(
    null,
    score,
    maxScore,
    quiz.isTrueOrFalse,
    isRendered,
  );

  return (
    <section
      className="quiz-summary"
      style={isLoading ? { display: 'none' } : {}}
    >
      {imgSrc &&
        quiz.isTrueOrFalse &&
        getScoreElementBound('quiz-summary-score')}
      {(title && <header>{title}</header>) ||
        (quiz.isTrueOrFalse && <header>{getTitle(score, maxScore)}</header>)}
      {(imgSrc && getMediaElement(result, onLoad)) ||
        getScoreElementBound('quiz-summary-score--graphic')}
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
  isTrueOrFalse: boolean,
  isRendered: boolean,
  className: string,
) {
  return (
    <div className={className}>
      <span className={isRendered ? 'growing-element' : ''}>
        {isTrueOrFalse ? `${score}/${maxScore}` : 'The End'}
      </span>
    </div>
  );
}
//#endregion Helper functions
