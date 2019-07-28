import IQuestion from './IQuestion';
import Option from './Option';

export default class Question {
  public id: number;
  public text: string;
  public options: Option[];
  public imgSrc?: string;
  constructor(question: IQuestion) {
    this.id = question.id;
    this.text = question.text;
    this.options = question.options.map(o => new Option(o));
    this.imgSrc = question.imgSrc;
  }
}
