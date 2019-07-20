import IQuiz from './IQuiz';
import IQuizHeader from './IQuizHeader';
import Question from './Question';
import Result from './Result';

export default class Quiz implements IQuiz {
  public header: IQuizHeader;
  public questions: Question[];
  public results: Result[];
  private _genericResult: Result | undefined;

  constructor({ header, questions, results }: Quiz) {
    this.header = header;
    this.questions = questions.map(q => new Question(q));
    this.results = results || [this.genericResult];
  }

  public get genericResult(): Result {
    return this._genericResult || this.getGenericResult();
  }

  public findResult(score: number) {
    return this.results.find(r => score >= r.minScore && score <= r.maxScore);
  }

  private getGenericResult(): Result {
    const result = Result.Empty;
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
