import IOption from './IOption';

export default class Option implements IOption {
  public text: string;
  public score: number;
  public imgSrc?: string;
  constructor(option: IOption) {
    this.text = option.text;
    this.score = option.score || 0;
    this.imgSrc = option.imgSrc;
  }
}
