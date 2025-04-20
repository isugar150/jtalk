export const ValidationType = Object.freeze({
  REQUIRED: "REQUIRED",
  ALPHANUMERIC: "ALPHANUMERIC",
  MIN_LENGTH: "MIN_LENGTH",
  MAX_LENGTH: "MAX_LENGTH",
});

export const validationMessages = {
  [ValidationType.REQUIRED]: "필수 입력 항목입니다.",
  [ValidationType.ALPHANUMERIC]: "소문자/대문자/숫자 3~20자 이내여야 합니다.",
  [ValidationType.MIN_LENGTH]: (minLength) =>
    `${minLength}자 이상 입력해야 합니다.`,
  [ValidationType.MAX_LENGTH]: (maxLength) =>
    `${maxLength}자 이하로 입력해야 합니다.`,
};

/**
 * 전화번호 형식 (010-0000-0000)을 검사합니다.
 * @param {string} phoneNumber - 검사할 전화번호 문자열
 * @returns {boolean} 형식이 맞으면 true, 아니면 false
 */
export function isValidPhoneNumber(phoneNumber) {
  const regex = /^010-\d{4}-\d{4}$/;
  return regex.test(phoneNumber);
}

/**
 * 이름 형식 (한글 2~10자)을 검사합니다.
 * @param {string} name - 검사할 이름 문자열
 * @returns {boolean} 형식이 맞으면 true, 아니면 false
 */
export function isValidKoreanName(name) {
  const regex = /^[가-힣]$/;
  return regex.test(name);
}

/**
 * 사용자 ID 또는 비밀번호 형식 (영문 소문자/대문자/숫자, 3~20자)을 검사합니다.
 * @param {string} inputString - 검사할 문자열
 * @returns {boolean} 형식이 맞으면 true, 아니면 false
 */
export function isValidAlphanumeric(inputString) {
  const regex = /^[a-zA-Z0-9]$/;
  return regex.test(inputString);
}

export const checkMinLength = (value, minLength) => value.length >= minLength;
export const checkMaxLength = (value, maxLength) => value.length <= maxLength;
