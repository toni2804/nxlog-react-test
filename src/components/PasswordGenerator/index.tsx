import { ChangeEvent, useMemo, useState } from "react";
import { Input } from "../Input";
import styles from "./PasswordGenerator.module.scss";
import { PasswordGeneratorOptionsType } from "./types";
import { getRandomPassword } from "./utils";
import { Checkbox } from "../Checkbox";

const DEFAULT_PASSWORD_LENGTH = 10,
  MIN_PASSWORD_LENGTH = 6,
  MAX_PASSWORD_LENGTH = 20,
  DEFAULT_SELECTED_OPTIONS: PasswordGeneratorOptionsType = "lowercase";

export function PasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<
    PasswordGeneratorOptionsType[]
  >([DEFAULT_SELECTED_OPTIONS]);
  const [passwordLength, setPasswordLength] = useState<number>(
    DEFAULT_PASSWORD_LENGTH
  );

  const optionsCheckboxes: {
    id: PasswordGeneratorOptionsType;
    label: string;
  }[] = useMemo(
    () => [
      { id: "uppercase", label: "Include Uppercase" },
      { id: "lowercase", label: "Include Lowercase" },
      { id: "symbols", label: "Include Symbols" },
      { id: "numbers", label: "Include Numbers" },
    ],
    []
  );

  function handleRangeChange(event: ChangeEvent<HTMLInputElement>) {
    setPasswordLength(+event.target.value);
  }

  function toggleSelectedOptions({
    target: { id, checked },
  }: ChangeEvent<HTMLInputElement>) {
    const option = id as PasswordGeneratorOptionsType;

    // Reject deselecting the last selected option.
    if (selectedOptions.length === 1 && option === selectedOptions[0]) return;

    if (selectedOptions.includes(option)) {
      if (!checked)
        setSelectedOptions(selectedOptions.filter((opt) => option !== opt));
    } else {
      if (checked) setSelectedOptions([...selectedOptions, option]);
    }
  }

  function handleCopyClick() {
    navigator.clipboard.writeText(password);
  }

  function handleGenerateClick() {
    setPassword(getRandomPassword(selectedOptions, passwordLength));
  }

  return (
    <div className={styles.container}>
      <Input
        type="text"
        Icon={<span>C</span>}
        value={password}
        onIconClick={handleCopyClick}
      />
      <Input
        label={`Character length ${passwordLength}`}
        type="range"
        id="char-lenght"
        name="fav_language"
        value={passwordLength}
        onChange={handleRangeChange}
        max={MAX_PASSWORD_LENGTH}
        min={MIN_PASSWORD_LENGTH}
        step={1}
      />
      {optionsCheckboxes.map(({ id, label }) => (
        <Checkbox
          key={id}
          id={id}
          label={label}
          onChange={toggleSelectedOptions}
          checked={selectedOptions.includes(id)}
        />
      ))}

      <button onClick={handleGenerateClick}>Generate</button>
    </div>
  );
}
export default PasswordGenerator;
