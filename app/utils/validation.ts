/**
 * シンプルなバリデーションロジック集
 * 純粋関数として実装
 */

/**
 * 必須チェック
 * @param value - チェックする値
 * @param fieldName - フィールド名（エラーメッセージ用）
 * @returns エラーメッセージ（エラーがない場合はnull）
 */
export function validateRequired(
  value: unknown,
  fieldName: string = "項目"
): string | null {
  // null, undefined, 空文字, 空配列をチェック
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return `${fieldName}は必須です`;
  }

  // 文字列の場合、空白のみもエラー
  if (typeof value === "string" && value.trim() === "") {
    return `${fieldName}は必須です`;
  }

  return null;
}

/**
 * メールアドレスの簡易チェック
 * @param email - チェックするメールアドレス
 * @returns エラーメッセージ（エラーがない場合はnull）
 */
export function validateEmail(email: string): string | null {
  // 空の場合はチェックしない（必須チェックは別途行う）
  if (!email) {
    return null;
  }

  // 最低限のパターンチェック
  // ・@が1つだけある
  // ・@の前後に文字がある
  // ・@の後にドットがある
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "メールアドレスの形式が正しくありません";
  }

  // 長さチェック（一般的な最大長）
  if (email.length > 254) {
    return "メールアドレスが長すぎます";
  }

  return null;
}

/**
 * パスワードの簡易チェック
 * @param password - チェックするパスワード
 * @param options - オプション設定
 * @returns エラーメッセージ（エラーがない場合はnull）
 */
export interface PasswordOptions {
  minLength?: number;
  maxLength?: number;
  requireMixedCase?: boolean; // 大文字小文字の混在
  requireNumber?: boolean; // 数字を含む
}

export function validatePassword(
  password: string,
  options: PasswordOptions = {}
): string | null {
  const {
    minLength = 8,
    maxLength = 100,
    requireMixedCase = true,
    requireNumber = true,
  } = options;

  // 空の場合はチェックしない（必須チェックは別途行う）
  if (!password) {
    return null;
  }

  // 長さチェック
  if (password.length < minLength) {
    return `パスワードは${minLength}文字以上で入力してください`;
  }
  if (password.length > maxLength) {
    return `パスワードは${maxLength}文字以内で入力してください`;
  }

  // 大文字小文字の混在チェック
  if (requireMixedCase) {
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      return "パスワードは大文字と小文字を両方含めてください";
    }
  }

  // 数字を含むかチェック
  if (requireNumber) {
    if (!/\d/.test(password)) {
      return "パスワードは数字を含めてください";
    }
  }

  return null;
}

/**
 * 電話番号の簡易チェック（日本の電話番号）
 * @param phoneNumber - チェックする電話番号
 * @returns エラーメッセージ（エラーがない場合はnull）
 */
export function validatePhoneNumber(phoneNumber: string): string | null {
  // 空の場合はチェックしない（必須チェックは別途行う）
  if (!phoneNumber) {
    return null;
  }

  // ハイフン、括弧、スペースを除去
  const digitsOnly = phoneNumber.replace(/[-\(\)\s]/g, "");

  // 数字のみかチェック
  if (!/^\d+$/.test(digitsOnly)) {
    return "電話番号は数字で入力してください";
  }

  // 桁数チェック（10桁または11桁）
  if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
    return "電話番号は10桁または11桁で入力してください";
  }

  // 0から始まるかチェック
  if (!digitsOnly.startsWith("0")) {
    return "電話番号は0から始まる番号を入力してください";
  }

  return null;
}

/**
 * 複数のバリデーションを実行するヘルパー関数
 * @param validations - バリデーション関数と実行条件の配列
 * @returns 最初に見つかったエラーメッセージ（エラーがない場合はnull）
 */
export function validate(
  ...validations: Array<() => string | null>
): string | null {
  for (const validation of validations) {
    const error = validation();
    if (error) {
      return error;
    }
  }
  return null;
}
