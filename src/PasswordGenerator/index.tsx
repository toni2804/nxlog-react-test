import { ChangeEvent, useState } from "react";
import { Input } from "../components/Input";
import styles from "./PasswordGenerator.module.scss";
import { PasswordGeneratorOptionsType } from "./types";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import {
  getRandCharForOption,
  getRandIntInRange,
  shuffleArray,
} from "src/PasswordGenerator/utils";
import Toast, { ToastVariant } from "src/components/Toast";

const DEFAULT_PASSWORD_LENGTH = 10,
  MIN_PASSWORD_LENGTH = 6,
  MAX_PASSWORD_LENGTH = 40,
  DEFAULT_SELECTED_OPTION: PasswordGeneratorOptionsType = "lowercase",
  AVAILABLE_OPTIONS: {
    id: PasswordGeneratorOptionsType;
    label: string;
  }[] = [
    { id: "uppercase", label: "Include Uppercase" },
    { id: "lowercase", label: "Include Lowercase" },
    { id: "symbols", label: "Include Symbols" },
    { id: "numbers", label: "Include Numbers" },
  ];

export function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [checkedOptions, setCheckedOptions] = useState<
    PasswordGeneratorOptionsType[]
  >([DEFAULT_SELECTED_OPTION]);
  const [passwordLength, setPasswordLength] = useState<number>(
    DEFAULT_PASSWORD_LENGTH
  );
  const [copyPassStatus, setCopyPassStatus] = useState<ToastVariant | null>(
    null
  );

  function togglecheckedOptions({
    target: { id, checked },
  }: ChangeEvent<HTMLInputElement>) {
    const option = id as PasswordGeneratorOptionsType;

    // Reject unckecking the last checked option.
    if (checkedOptions.length === 1 && option === checkedOptions[0]) return;

    // If the option is unchecked, remove it from state.
    if (checkedOptions.includes(option) && !checked)
      setCheckedOptions(checkedOptions.filter((opt) => option !== opt));
    // If the option is checked, add it to state.
    else if (checked) setCheckedOptions([...checkedOptions, option]);
  }

  function getRandomPassword(): string {
    const passwordChars: string[] = [];

    checkedOptions.forEach((option, index) => {
      // The random number of characters to generate for each option.
      let charsNumToGenerate =
        // Check if current option is the last one.
        index + 1 === checkedOptions.length
          ? // Fill the remaining chars for the last option.
            passwordLength - passwordChars.length
          : // Generate random number of chars for current option.
            getRandIntInRange(
              1,
              passwordLength - checkedOptions.length + 1 - passwordChars.length
            );

      while (charsNumToGenerate-- > 0) {
        passwordChars.push(getRandCharForOption(option));
      }
    });

    return shuffleArray(passwordChars).join("");
  }

  function handleCopyClick() {
    navigator.clipboard
      .writeText(password)
      .then(() => setCopyPassStatus("success"))
      .catch(() => setCopyPassStatus("error"));
  }

  return (
    <div className={styles.container}>
      <Input
        type="text"
        value={password}
        Icon={<img src="/svgs/copy.svg" alt="copy" title="Copy" />}
        onIconClick={handleCopyClick}
      />
      <Input
        id="char-lenght"
        name="fav_language"
        value={passwordLength}
        type="range"
        label={`Password length: ${passwordLength}`}
        max={MAX_PASSWORD_LENGTH}
        min={MIN_PASSWORD_LENGTH}
        step={1}
        readOnly
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setPasswordLength(+event.target.value)
        }
      />
      <div>
        {AVAILABLE_OPTIONS.map(({ id, label }) => (
          <Checkbox
            key={id}
            id={id}
            label={label}
            checked={checkedOptions.includes(id)}
            onChange={togglecheckedOptions}
          />
        ))}
      </div>
      <div className={styles.btnWrapper}>
        <Button onClick={() => setPassword(getRandomPassword())}>
          Generate
        </Button>
      </div>
      {copyPassStatus && (
        <Toast
          variant={copyPassStatus}
          message={
            copyPassStatus === "success"
              ? "Password copied to clipboard!"
              : "An error happened copying password to clipboard"
          }
          onClose={() => setCopyPassStatus(null)}
          autoclose
        />
      )}
    </div>
  );
}
export default PasswordGenerator;
