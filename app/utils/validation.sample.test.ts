import {
  validateRequired,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validate,
} from "./validation";

describe("validateRequired", () => {
  describe("エラーを返すケース", () => {
    it("nullの場合", () => {
      expect(validateRequired(null, "名前")).toBe("名前は必須です");
    });

    it("undefinedの場合", () => {
      expect(validateRequired(undefined, "名前")).toBe("名前は必須です");
    });

    it("空文字の場合", () => {
      expect(validateRequired("", "名前")).toBe("名前は必須です");
    });

    it("空白のみの場合", () => {
      expect(validateRequired("   ", "名前")).toBe("名前は必須です");
    });

    it("空配列の場合", () => {
      expect(validateRequired([], "選択項目")).toBe("選択項目は必須です");
    });

    it("フィールド名を指定しない場合", () => {
      expect(validateRequired("")).toBe("項目は必須です");
    });
  });

  describe("正常（nullを返す）ケース", () => {
    it("文字列がある場合", () => {
      expect(validateRequired("太郎", "名前")).toBeNull();
    });

    it("数値の0の場合", () => {
      expect(validateRequired(0, "数量")).toBeNull();
    });

    it("falseの場合", () => {
      expect(validateRequired(false, "フラグ")).toBeNull();
    });

    it("配列に要素がある場合", () => {
      expect(validateRequired(["item1"], "選択項目")).toBeNull();
    });

    it("オブジェクトの場合", () => {
      expect(validateRequired({}, "データ")).toBeNull();
    });
  });
});

describe("validateEmail", () => {
  describe("正常（nullを返す）ケース", () => {
    it("空文字の場合はチェックしない", () => {
      expect(validateEmail("")).toBeNull();
    });

    it("標準的なメールアドレス", () => {
      expect(validateEmail("user@example.com")).toBeNull();
    });

    it("サブドメインを含むメールアドレス", () => {
      expect(validateEmail("user@mail.example.com")).toBeNull();
    });

    it("数字を含むメールアドレス", () => {
      expect(validateEmail("user123@example123.com")).toBeNull();
    });

    it("ドットを含むローカル部", () => {
      expect(validateEmail("first.last@example.com")).toBeNull();
    });

    it("ハイフンを含むドメイン", () => {
      expect(validateEmail("user@my-domain.com")).toBeNull();
    });
  });

  describe("エラーを返すケース", () => {
    it("@がない", () => {
      expect(validateEmail("userexample.com")).toBe(
        "メールアドレスの形式が正しくありません"
      );
    });

    it("@が複数ある", () => {
      expect(validateEmail("user@@example.com")).toBe(
        "メールアドレスの形式が正しくありません"
      );
    });

    it("ドメイン部分にドットがない", () => {
      expect(validateEmail("user@example")).toBe(
        "メールアドレスの形式が正しくありません"
      );
    });

    it("@の前に文字がない", () => {
      expect(validateEmail("@example.com")).toBe(
        "メールアドレスの形式が正しくありません"
      );
    });

    it("@の後に文字がない", () => {
      expect(validateEmail("user@")).toBe(
        "メールアドレスの形式が正しくありません"
      );
    });

    it("スペースが含まれている", () => {
      expect(validateEmail("user name@example.com")).toBe(
        "メールアドレスの形式が正しくありません"
      );
    });

    it("255文字以上の長いメールアドレス", () => {
      const longEmail = "a".repeat(250) + "@example.com";
      expect(validateEmail(longEmail)).toBe("メールアドレスが長すぎます");
    });
  });
});

describe("validatePassword", () => {
  describe("デフォルト設定での検証", () => {
    describe("正常（nullを返す）ケース", () => {
      it("空文字の場合はチェックしない", () => {
        expect(validatePassword("")).toBeNull();
      });

      it("条件を満たすパスワード", () => {
        expect(validatePassword("Test1234")).toBeNull();
        expect(validatePassword("MyPassword123")).toBeNull();
      });
    });

    describe("エラーを返すケース", () => {
      it("8文字未満", () => {
        expect(validatePassword("Test123")).toBe(
          "パスワードは8文字以上で入力してください"
        );
      });

      it("小文字のみ", () => {
        expect(validatePassword("testtest123")).toBe(
          "パスワードは大文字と小文字を両方含めてください"
        );
      });

      it("大文字のみ", () => {
        expect(validatePassword("TESTTEST123")).toBe(
          "パスワードは大文字と小文字を両方含めてください"
        );
      });

      it("数字が含まれていない", () => {
        expect(validatePassword("TestTest")).toBe(
          "パスワードは数字を含めてください"
        );
      });

      it("101文字以上", () => {
        const longPassword = "Test1" + "a".repeat(96);
        expect(validatePassword(longPassword)).toBe(
          "パスワードは100文字以内で入力してください"
        );
      });
    });
  });

  describe("カスタム設定での検証", () => {
    it("最小文字数を変更", () => {
      expect(validatePassword("Test1", { minLength: 5 })).toBeNull();
      expect(validatePassword("Te1", { minLength: 5 })).toBe(
        "パスワードは5文字以上で入力してください"
      );
    });

    it("大文字小文字の混在を不要に", () => {
      expect(validatePassword("test1234", { requireMixedCase: false })).toBeNull();
    });

    it("数字を不要に", () => {
      expect(validatePassword("TestTest", { requireNumber: false })).toBeNull();
    });

    it("すべての制約を緩和", () => {
      expect(
        validatePassword("test", {
          minLength: 4,
          requireMixedCase: false,
          requireNumber: false,
        })
      ).toBeNull();
    });
  });
});

describe("validatePhoneNumber", () => {
  describe("正常（nullを返す）ケース", () => {
    it("空文字の場合はチェックしない", () => {
      expect(validatePhoneNumber("")).toBeNull();
    });

    it("携帯番号（11桁、ハイフンなし）", () => {
      expect(validatePhoneNumber("09012345678")).toBeNull();
    });

    it("携帯番号（ハイフンあり）", () => {
      expect(validatePhoneNumber("090-1234-5678")).toBeNull();
    });

    it("固定電話（10桁、ハイフンなし）", () => {
      expect(validatePhoneNumber("0312345678")).toBeNull();
    });

    it("固定電話（ハイフンあり）", () => {
      expect(validatePhoneNumber("03-1234-5678")).toBeNull();
    });

    it("括弧を含む形式", () => {
      expect(validatePhoneNumber("03(1234)5678")).toBeNull();
    });

    it("スペースを含む形式", () => {
      expect(validatePhoneNumber("090 1234 5678")).toBeNull();
    });
  });

  describe("エラーを返すケース", () => {
    it("数字以外が含まれている", () => {
      expect(validatePhoneNumber("090-abcd-5678")).toBe(
        "電話番号は数字で入力してください"
      );
    });

    it("9桁（短すぎる）", () => {
      expect(validatePhoneNumber("090123456")).toBe(
        "電話番号は10桁または11桁で入力してください"
      );
    });

    it("12桁（長すぎる）", () => {
      expect(validatePhoneNumber("090123456789")).toBe(
        "電話番号は10桁または11桁で入力してください"
      );
    });

    it("0から始まらない", () => {
      expect(validatePhoneNumber("1234567890")).toBe(
        "電話番号は0から始まる番号を入力してください"
      );
    });

    it("特殊文字が含まれている", () => {
      expect(validatePhoneNumber("090-1234-567@")).toBe(
        "電話番号は数字で入力してください"
      );
    });
  });
});

describe("ヘルパー関数", () => {
  describe("validate", () => {
    it("最初のエラーを返す", () => {
      const result = validate(
        () => null,
        () => "エラー1",
        () => "エラー2"
      );
      expect(result).toBe("エラー1");
    });

    it("エラーがない場合はnullを返す", () => {
      const result = validate(
        () => null,
        () => null,
        () => null
      );
      expect(result).toBeNull();
    });

    it("条件付きバリデーション", () => {
      const email = "";
      const result = validate(
        () => validateRequired(email, "メールアドレス"),
        () => validateEmail(email)
      );
      expect(result).toBe("メールアドレスは必須です");
    });
  });

  describe("実際の使用例", () => {
    it("メールアドレスの必須＋形式チェック", () => {
      // 空の場合
      const emptyResult = validate(
        () => validateRequired("", "メールアドレス"),
        () => validateEmail("")
      );
      expect(emptyResult).toBe("メールアドレスは必須です");

      // 形式が間違っている場合
      const invalidResult = validate(
        () => validateRequired("invalid", "メールアドレス"),
        () => validateEmail("invalid")
      );
      expect(invalidResult).toBe("メールアドレスの形式が正しくありません");

      // 正常な場合
      const validResult = validate(
        () => validateRequired("test@example.com", "メールアドレス"),
        () => validateEmail("test@example.com")
      );
      expect(validResult).toBeNull();
    });

    it("パスワードの必須＋形式チェック", () => {
      // 空の場合
      const emptyResult = validate(
        () => validateRequired("", "パスワード"),
        () => validatePassword("")
      );
      expect(emptyResult).toBe("パスワードは必須です");

      // 短すぎる場合
      const shortResult = validate(
        () => validateRequired("Test1", "パスワード"),
        () => validatePassword("Test1")
      );
      expect(shortResult).toBe("パスワードは8文字以上で入力してください");

      // 正常な場合
      const validResult = validate(
        () => validateRequired("Test1234", "パスワード"),
        () => validatePassword("Test1234")
      );
      expect(validResult).toBeNull();
    });
  });
});
