import IOption from './IOption';

export default interface IQuestion {
    id: number;
    text: string;
    options: IOption[];
    imgSrc?: string;
}
