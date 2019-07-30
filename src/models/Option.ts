import IOption from './IOption';

export default class Option implements IOption {
  public text: string;
  public score: number;
  public imgSrc?: string;
  public isCorrect?: boolean;
  constructor(option: IOption, isCorrect?: boolean) {
    this.text = option.text;
    this.score = option.score || 0;
    this.imgSrc = option.imgSrc;
    if (isCorrect) {
      this.isCorrect = isCorrect;
    }
  }
}
