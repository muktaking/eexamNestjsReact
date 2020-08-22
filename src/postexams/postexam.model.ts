import { Stem, QType } from "src/questions/question.model";

export interface Particulars {
  id: string;
  qText: string;
  stems: Stem;
  generalFeedback: string;
  result: Result;
}

export interface Result {
  stemResult?: Array<boolean> | number;
  mark: number;
}

export interface StudentAnswer {
  id: string;
  stems: Array<string>;
  type: QType;
}
