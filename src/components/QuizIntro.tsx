import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { QuizView } from '../containers/QuizView';
import IQuizHeader from '../models/IQuizHeader';
import { IRootState } from '../reducers';
import { setViewAction } from '../reducers/activeQuiz';
import { ILoading } from './withLoading';

interface IProps {
  setActiveView: (view: QuizView) => void;
}

const QuizIntro: React.FC<IQuizHeader & IProps & ILoading> = ({
  title,
  description,
  createdBy,
  createdAt,
  imgSrc,
  setActiveView,
  isLoading,
  onLoad,
}) => {
  const onStart = () => {
    setActiveView(QuizView.questions);
  };
  return (
    <section
      className="quiz-intro"
      onClick={onStart}
      style={isLoading ? { display: 'none' } : {}}
    >
      <header>{title}</header>
      <div>By: {createdBy}</div>
      <div>
        {new Date(createdAt).toLocaleDateString('default', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </div>
      {imgSrc ? (
        <img src={imgSrc} alt={title} onLoad={onLoad} />
      ) : (
        onLoad && onLoad()
      )}
      <p>{description}</p>
      <button onClick={onStart}>Start</button>
    </section>
  );
};

const mapStateToProps = (state: IRootState) => ({
  ...state.activeQuiz.quiz.header,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActiveView: (view: QuizView) => dispatch(setViewAction(view)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizIntro);
