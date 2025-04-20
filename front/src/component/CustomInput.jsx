import { Field, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  ValidationType,
  validationMessages,
  isValidAlphanumeric,
  checkMaxLength,
  checkMinLength,
} from "../utils/validationTypes";

const CustomInput = (props) => {
  const {
    validationRules = [],
    onValidationChange,
    width = 200,
    label,
    value,
    setValue,
    ...restProps
  } = props;

  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    let currentIsValid = true;
    let currentErrorMsg = "";

    for (const rule of validationRules) {
      let ruleIsValid = true;
      let ruleErrorMsg = "";

      switch (rule) {
        case ValidationType.REQUIRED:
          if (!value || value.trim() === "") {
            ruleIsValid = false;
            ruleErrorMsg = validationMessages[ValidationType.REQUIRED];
          }
          break;
        case ValidationType.ALPHANUMERIC:
          if (value && !isValidAlphanumeric(value)) {
            ruleIsValid = false;
            ruleErrorMsg = validationMessages[ValidationType.ALPHANUMERIC];
          }
          break;
        case ValidationType.MIN_LENGTH:
          const minLength = 5; // 예시: 최소 길이를 props로 받거나 여기서 정의
          if (value && !checkMinLength(value, minLength)) {
            ruleIsValid = false;
            ruleErrorMsg =
              validationMessages[ValidationType.MIN_LENGTH](minLength);
          }
          break;
        case ValidationType.MAX_LENGTH:
          const maxLength = 20; // 예시: 최대 길이를 props로 받거나 여기서 정의
          if (value && !checkMaxLength(value, maxLength)) {
            ruleIsValid = false;
            ruleErrorMsg =
              validationMessages[ValidationType.MAX_LENGTH](maxLength);
          }
          break;
        default:
          console.warn(`Unknown validation rule: ${rule}`);
          break;
      }

      if (!ruleIsValid) {
        currentIsValid = false;
        currentErrorMsg = ruleErrorMsg;
        break;
      }
    }

    setIsValid(currentIsValid);
    setErrorMsg(currentErrorMsg);

    if (onValidationChange) {
      onValidationChange(currentIsValid);
    }
  }, [value, validationRules, onValidationChange]);

  const isRequired = validationRules.includes(ValidationType.REQUIRED);

  return (
    <Field.Root invalid={!isValid} required={isRequired} style={{ width }}>
      <Field.Label>
        {label} {isRequired && <Field.RequiredIndicator />}
      </Field.Label>
      <Input
        {...restProps}
        value={value}
        onChange={onChange}
        aria-invalid={!isValid}
      />
      <Field.ErrorText>{errorMsg}</Field.ErrorText>
    </Field.Root>
  );
};

export default CustomInput;
