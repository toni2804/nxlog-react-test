import { PasswordGeneratorOptionsType } from "../types";

// Reference: https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
const charMap: { [K in PasswordGeneratorOptionsType]: number[][] } = {
  lowercase: [[97, 122]],
  uppercase: [[65, 90]],
  numbers: [[48, 57]],
  symbols: [
    [32, 47],
    [58, 64],
    [91, 96],
    [123, 126],
  ],
};

export function getRandomPassword(
  selectedOptions: PasswordGeneratorOptionsType[],
  passwordLength: number
): string {
  const passwordChars: string[] = [];

  selectedOptions.forEach((option, index) => {
    let amountOfCharsToGenerate =
      index + 1 === selectedOptions.length
        ? passwordLength - passwordChars.length
        : getRandInRange(
            1,
            passwordLength - selectedOptions.length + 1 - passwordChars.length
          );

    while (amountOfCharsToGenerate-- > 0) {
      passwordChars.push(getRandForOption(option));
    }
  });

  return passwordChars.join("");
}

function getRandForOption(option: PasswordGeneratorOptionsType): string {
  return option[0] + getRandInRange(1, 100);
}

function getRandInRange(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
