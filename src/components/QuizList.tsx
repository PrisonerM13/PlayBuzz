import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import IQuizHeader from '../models/IQuizHeader';
import { IRootState } from '../reducers';
import { setQuizListAction } from '../reducers/quizList';
import { getQuizList as getQuizListData } from '../server-mock';
import Loading from './Loading';
import QuizCard from './QuizCard';

interface IProps {
  quizList: IQuizHeader[];
  getQuizList: () => Promise<void>;
}

const QuizList: React.FC<IProps> = ({ quizList, getQuizList }) => {
  // get data on mount
  useEffect(() => {
    getQuizList();
  }, [getQuizList]);

  if (!quizList) {
    return <Loading />;
  }

  return (
    <section className="quiz-list">
      <header>Pick a Quiz</header>
      <div className="quiz-list list">
        {quizList.map(quiz => (
          <QuizCard key={quiz.id} {...quiz} />
        ))}
      </div>
    </section>
  );
};

const mapStateToProps = (state: IRootState) => ({
  quizList: state.quizList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getQuizList: async () => {
    dispatch(setQuizListAction(await getQuizListData()));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizList);
