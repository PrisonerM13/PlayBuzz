import IResult from './IResult';

export default class Result implements IResult {
  constructor(
    public minScore = 0,
    public maxScore = 0,
    public title = '',
    public description = '',
    public imgSrc = '',
  ) {}
}
