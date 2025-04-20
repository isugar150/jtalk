import { Field, Input } from "@chakra-ui/react";

const CustomInput = ({ invalid = false, label = "" }) => {
  return (
    <Field.Root invalid>
      <Field.Label>{label}</Field.Label>
      <Input placeholder="Enter your email" />
      <Field.ErrorText></Field.ErrorText>
    </Field.Root>
  );
};
export default CustomInput;
