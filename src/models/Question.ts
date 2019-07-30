import IQuestion from './IQuestion';
import Option from './Option';

export default class Question {
  public id: number;
  public text: string;
  public options: Option[];
  public isTrueOrFalse: boolean;
  public imgSrc?: string;
  constructor(question: IQuestion) {
    // if one of the options has no score or score=0 => isTrueOrFalse=true
    this.isTrueOrFalse = question.options.some(o => !o.score);
    this.id = question.id;
    this.text = question.text;
    this.options = question.options.map(
      o => new Option(o, this.isTrueOrFalse && o.score ? true : false),
    );
    this.imgSrc = question.imgSrc;
  }
}
