import IQuestion from './IQuestion';
import IQuizHeader from './IQuizHeader';
import Result from './Result';

export default interface IQuiz {
    header: IQuizHeader;
    questions: IQuestion[];
    results?: Result[];
}
