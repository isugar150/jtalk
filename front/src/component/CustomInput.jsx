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
    isForm = true,
    validationRules = [],
    onValidationChange,
    width = 200,
    label,
    value,
    setValue,
    minLength,
    maxLength,
    helperText,
    ...restProps
  } = props;

  const [isValid, setIsValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => {
    const htmlMaxLength = e.target.maxLength;
    if (htmlMaxLength > 0 && e.target.value.length > htmlMaxLength) {
      setValue(e.target.value.slice(0, htmlMaxLength));
    } else {
      setValue(e.target.value);
    }
  };

  useEffect(() => {
    let currentIsValid = true;
    let currentErrorMsg = "";

    for (const rule of validationRules) {
      let ruleIsValid = true;
      let ruleErrorMsg = "";

      const valueExists =
        value !== null && value !== undefined && String(value).trim() !== "";

      switch (rule) {
        case ValidationType.REQUIRED:
          if (!valueExists) {
            ruleIsValid = false;
            ruleErrorMsg = validationMessages[ValidationType.REQUIRED];
          }
          break;
        case ValidationType.ALPHANUMERIC:
          if (valueExists && !isValidAlphanumeric(value)) {
            ruleIsValid = false;
            ruleErrorMsg = validationMessages[ValidationType.ALPHANUMERIC];
          }
          break;
        case ValidationType.MIN_LENGTH:
          if (
            minLength !== undefined &&
            valueExists &&
            !checkMinLength(value, minLength)
          ) {
            ruleIsValid = false;
            ruleErrorMsg =
              validationMessages[ValidationType.MIN_LENGTH](minLength);
          }
          break;
        case ValidationType.MAX_LENGTH:
          if (
            maxLength !== undefined &&
            valueExists &&
            !checkMaxLength(value, maxLength)
          ) {
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
  }, [value, validationRules, onValidationChange, minLength, maxLength]);

  const isRequired = validationRules.includes(ValidationType.REQUIRED);

  if (isForm)
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
          maxLength={maxLength}
        />
        <Field.HelperText>{helperText}</Field.HelperText>
        <Field.ErrorText>{errorMsg}</Field.ErrorText>
      </Field.Root>
    );
  else
    return (
      <Input
        {...restProps}
        value={value}
        onChange={onChange}
        aria-invalid={!isValid}
        maxLength={maxLength}
      />
    );
};

export default CustomInput;
