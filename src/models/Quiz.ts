import IQuiz from './IQuiz';
import IQuizHeader from './IQuizHeader';
import Question from './Question';
import Result from './Result';

export default class Quiz implements IQuiz {
  public static Empty = new Quiz({
    header: {} as IQuizHeader,
    questions: [] as Question[],
  });
  public header: IQuizHeader;
  public questions: Question[];
  public results: Result[];
  public isTrueOrFalse: boolean;
  private _genericResult: Result | undefined;

  constructor({ header, questions, results }: IQuiz) {
    this.header = header;
    this.questions = questions.map(q => new Question(q));
    this.results = results || [this.genericResult];
    this.isTrueOrFalse = this.questions.every(question => question.isTrueOrFalse);
  }

  public get genericResult(): Result {
    return this._genericResult || this.getGenericResult();
  }

  public findResult(score: number) {
    return this.results.find(r => score >= r.minScore && score <= r.maxScore);
  }

  private getGenericResult(): Result {
    const result = new Result();
    let maxScore = 0;
    this.questions.forEach(q => {
      const scores = q.options.map(o => o.score);
      maxScore += Math.max(...scores);
    });
    result.maxScore = maxScore;
    this._genericResult = result;
    return result;
  }
}
