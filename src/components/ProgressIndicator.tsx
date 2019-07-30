import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../reducers';

const ProgressIndicator: React.FC<{
  currentValue: number;
  maxValue: number;
}> = ({ maxValue, currentValue }) => {
  return (
    <section className="progress-indicator">
      {currentValue}/{maxValue}
    </section>
  );
};

const mapStateToProps = (state: IRootState) => ({
  currentValue: state.activeQuiz.activeQuestionIndex + 1,
  maxValue: state.activeQuiz.quiz.questions.length,
});

export default connect(mapStateToProps)(ProgressIndicator);
