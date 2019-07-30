import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../reducers';
import ProgressBarItem from './ProgressBarItem';

const ProgressBar: React.FC<{ length: number; value: number }> = ({
  length,
  value,
}) => {
  return (
    <section className="progress-bar">
      {Array.from({ length }, (val, index) => index).map(index => (
        <ProgressBarItem key={index} isActive={value === index} />
      ))}
    </section>
  );
};

const mapStateToProps = (state: IRootState) => ({
  length: state.activeQuiz.quiz.questions.length,
  value: state.activeQuiz.activeQuestionIndex,
});

export default connect(mapStateToProps)(ProgressBar);
