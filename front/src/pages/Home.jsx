import CustomInput from "../component/CustomInput.jsx";
import { useCallback, useState } from "react";
import { ValidationType } from "../utils/validationTypes";

const Home = () => {
  const [test, setTest] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleValidationChange = useCallback((isValid) => {
    setIsSubmitEnabled(isValid);
  }, []);

  return (
    <>
      <CustomInput
        label={"테스트"}
        value={test}
        setValue={setTest}
        validationRules={[
          ValidationType.REQUIRED,
          ValidationType.ALPHANUMERIC,
          ValidationType.MIN_LENGTH(3),
          ValidationType.MAX_LENGTH(20),
        ]}
        onValidationChange={handleValidationChange}
        placeholder="영문/숫자 3~20자 입력"
        width={300}
      />

      <button disabled={!isSubmitEnabled} style={{ marginTop: "10px" }}>
        제출
      </button>
    </>
  );
};

export default Home;
