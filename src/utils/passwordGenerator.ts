import { PasswordGeneratorOptionsType } from "../types/PasswordGeneratorOptionsType";

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

export function getRandomPass(selectedOptions:PasswordGeneratorOptionsType[]): string {
  console.log('selectedOptions:', selectedOptions)
  
  return 'test'
}
