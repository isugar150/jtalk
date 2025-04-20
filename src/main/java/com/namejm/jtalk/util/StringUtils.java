package com.namejm.jtalk.util;

public class StringUtils {
    public static String stringPadder(String val, int len){
        if (val == null) {
            throw new IllegalArgumentException("입력 문자열(value)은 null일 수 없습니다.");
        }
        if (len <= 0) {
            throw new IllegalArgumentException("길이(length)는 0보다 커야 합니다.");
        }

        try {
            int intValue = Integer.parseInt(val);

            String formatSpecifier = "%0" + len + "d";

            return String.format(formatSpecifier, intValue);

        } catch (NumberFormatException e) {
            System.err.println("오류: 입력된 값 '" + val + "'는 유효한 정수 문자열이 아닙니다.");
            throw e;
        }
    }
}
