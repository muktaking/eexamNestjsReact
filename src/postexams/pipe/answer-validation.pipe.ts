import { PipeTransform } from "@nestjs/common";
import { StudentAnswer } from "../postexam.model";
import * as validator from "validator";

export class AnswerValidationPipe implements PipeTransform {
  transform(answers: StudentAnswer[]) {
    const errorMessage: Array<string> = [];
    answers = answers.filter(answer => {
      let msg;
      msg = validator.isEmpty(answer.id) ? "Answer id can not be empty" : null;
      msg = validator.isMongoId(answer.id)
        ? "Answer id is not a mongoId"
        : null;
      errorMessage.push(msg);
      if (msg) return false;
      answer.stems.map(v => {
        msg = validator.isNumeric(v) ? null : "stem value is not allowed";
      });
      errorMessage.push(msg);
      if (msg) return false;
      msg = validator.isIn(answer.type, ["matrix", "sba"])
        ? null
        : "Answer type is not allowed";
      errorMessage.push(msg);
      if (msg) return false;

      return true;
    });
  }
}
