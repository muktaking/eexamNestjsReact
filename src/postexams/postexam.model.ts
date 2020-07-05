import { Stem, QType } from "src/questions/question.model";

export interface Particulars {
  id: string;
  qText: string;
  stems: Stem;
  generalFeedback: string;
  result: Result;
}

export interface Result {
  matrixResult?: Array<boolean>;
  sbaResult?: number;
  mark: number;
}

export interface StudentAnswer {
  id: string;
  stems: Array<string>;
  type: QType;
}
