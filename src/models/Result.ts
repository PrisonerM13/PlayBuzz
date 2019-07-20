export default class Result {
  public static Empty = new Result();

  constructor(
    public minScore = 0,
    public maxScore = 0,
    public title = '',
    public description = '',
    public imgSrc = '',
  ) {}
}
