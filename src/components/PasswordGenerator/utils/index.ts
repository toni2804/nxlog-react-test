import { PasswordGeneratorOptionsType } from "../types";

// Reference: https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
const optionsMap: { [K in PasswordGeneratorOptionsType]: number[][] } = {
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
        : getRandNumInRange(
            1,
            passwordLength - selectedOptions.length + 1 - passwordChars.length
          );

    while (amountOfCharsToGenerate-- > 0) {
      passwordChars.push(getRandCharForOption(option));
    }
  });

  return shuffleArray(passwordChars).join("");
}

function getRandCharForOption(option: PasswordGeneratorOptionsType): string {
  const optionAsciiCodes = optionsMap[option];
  let optionAsciiCodesRangeStart = optionAsciiCodes[0][0],
    optionAsciiCodesRangeEnd = optionAsciiCodes[0][1];

  if (optionAsciiCodes.length > 1) {
    const optionAsciiCodesRange =
      optionAsciiCodes[getRandNumInRange(0, optionAsciiCodes.length - 1)];
    optionAsciiCodesRangeStart = optionAsciiCodesRange[0];
    optionAsciiCodesRangeEnd = optionAsciiCodesRange[1];
  }

  return String.fromCharCode(
    getRandNumInRange(optionAsciiCodesRangeStart, optionAsciiCodesRangeEnd)
  );
}

function getRandNumInRange(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray<T>(arr: T[]) {
  return arr.sort(() => 0.5 - Math.random());
}
