import { PasswordGeneratorOptionsType } from "../types";

// Reference: https://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
const passwordOptionsAsciiMap: {
  [K in PasswordGeneratorOptionsType]: number[][];
} = {
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

/**
 * Generates a random characted for given password option.
 * 
 * @param {PasswordGeneratorOptionsType} option 
 * @returns 
 * Random character for particular option.
 */
export function getRandCharForOption(
  option: PasswordGeneratorOptionsType
): string {
  // ASCII codes range for given option.
  const asciiCodesForOptionArray = passwordOptionsAsciiMap[option];
  // Assume the asciiCodesForOptionArray has only one range.
  let asciiCodesForOptionRange = [
    asciiCodesForOptionArray[0][0],
    asciiCodesForOptionArray[0][1],
  ];

  // Check if asciiCodesForOptionArray has multiple ranges.
  if (asciiCodesForOptionArray.length > 1) {
    // Randomly pick one codes range to generate the char from.
    const randomAsciiCodesForOptionRange =
      asciiCodesForOptionArray[
        getRandIntInRange(0, asciiCodesForOptionArray.length - 1)
      ];

    // Update asciiCodesForOptionRange.
    asciiCodesForOptionRange[0] = randomAsciiCodesForOptionRange[0];
    asciiCodesForOptionRange[1] = randomAsciiCodesForOptionRange[1];
  }

  // Return random picked character from randomly choosen ascii codes
  // range for given option.
  return String.fromCharCode(
    getRandIntInRange(asciiCodesForOptionRange[0], asciiCodesForOptionRange[1])
  );
}

/**
 * Generates random integer in given range,
 * where range limits are inclusive.
 *
 * @param {number} min
 * The inclusive lower limit of desired range.
 * @param {number} max
 * The inclusive upper limit of desired range.
 * @returns  {number}
 * Randomly generated integer in given range.
 */
export function getRandIntInRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffleArray<T>(arr: T[]) {
  return arr.sort(() => 0.5 - Math.random());
}
