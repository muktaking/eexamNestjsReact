import * as fs from "fs";
import { join } from "path";

export const firstltrCapRestLow = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

//a very interesting small func to manage async-await error handling

export function to(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
}

export function deleteImageFile(imageUrl: string): void {
  fs.unlink(join(__dirname, "..", "uploads/images/", imageUrl), error => {
    console.log("File was deleted");
  });
}
