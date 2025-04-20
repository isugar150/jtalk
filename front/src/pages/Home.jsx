import CustomInput from "../component/CustomInput.jsx";
import { useCallback, useState } from "react";
import { ValidationType } from "../utils/validationTypes";
import useMutateApi from "../hooks/useMutateApi.js";
import { useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const [token, setToken] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleValidationChange = useCallback((isValid) => {
    setIsSubmitEnabled(isValid);
  }, []);

  const loginMutation = useMutateApi({
    onSuccess: (data, variables) => {
      // variables: mutate 함수 호출 시 전달된 값 (예: token은 variables.data.token)
      console.log("로그인 성공:", data);
      alert("로그인 성공!");
      // 필요시 로그인 관련 상태 업데이트 또는 캐시 처리
      // 예: localStorage.setItem('userData', JSON.stringify(data));
    },
    onError: (error) => {
      // 에러 메시지 오타 수정: "로그인 실패"
      console.error("로그인 실패:", error);
      alert(`로그인 실패: ${error.message}`);
    },
  });

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    loginMutation.mutate({
      url: `/login`,
      method: "post",
      data: { token },
    });
  };

  return (
    <>
      <CustomInput
        label={"사용자 토큰"}
        value={token}
        setValue={setToken}
        validationRules={[
          ValidationType.REQUIRED,
          ValidationType.ALPHANUMERIC,
          ValidationType.MIN_LENGTH,
          ValidationType.MAX_LENGTH,
        ]}
        onValidationChange={handleValidationChange}
        minLength={3}
        maxLength={20}
        placeholder="영문/숫자 3~20자 입력"
        width={300}
      />

      <button
        disabled={!isSubmitEnabled}
        style={{ marginTop: "10px" }}
        onClick={handleSubmit}
      >
        제출
      </button>
    </>
  );
};

export default Home;
