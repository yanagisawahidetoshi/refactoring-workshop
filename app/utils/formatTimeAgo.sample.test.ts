import { formatTimeAgo } from "./formatTimeAgo";

/**
 * 日付を指定された時間分前後にずらす純粋関数
 * テスト用のヘルパー関数
 */
function adjustDate(
  date: Date,
  amount: number,
  unit: "seconds" | "minutes" | "hours" | "days" | "months" | "years"
): Date {
  const newDate = new Date(date);

  switch (unit) {
    case "seconds":
      newDate.setSeconds(newDate.getSeconds() + amount);
      break;
    case "minutes":
      newDate.setMinutes(newDate.getMinutes() + amount);
      break;
    case "hours":
      newDate.setHours(newDate.getHours() + amount);
      break;
    case "days":
      newDate.setDate(newDate.getDate() + amount);
      break;
    case "months":
      newDate.setMonth(newDate.getMonth() + amount);
      break;
    case "years":
      newDate.setFullYear(newDate.getFullYear() + amount);
      break;
  }

  return newDate;
}

describe("formatTimeAgo", () => {
  let currentDate: Date;

  beforeEach(() => {
    // 基準日時を固定（2024年3月15日 14:30:00）
    currentDate = new Date("2024-03-15T14:30:00");
  });

  describe("入力値検証", () => {
    it("無効なtargetDateの場合エラーをスロー", () => {
      expect(() => formatTimeAgo(new Date("invalid"), currentDate)).toThrow(
        "Invalid targetDate"
      );
    });

    it("無効なcurrentDateの場合エラーをスロー", () => {
      const targetDate = new Date("2024-03-15T14:00:00");
      expect(() => formatTimeAgo(targetDate, new Date("invalid"))).toThrow(
        "Invalid currentDate"
      );
    });
  });

  describe("たった今（1分未満）", () => {
    it("0秒前は「たった今」", () => {
      const result = formatTimeAgo(currentDate, currentDate);
      expect(result).toBe("たった今");
    });

    it("30秒前は「たった今」", () => {
      const targetDate = adjustDate(currentDate, -30, "seconds");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("たった今");
    });

    it("59秒前は「たった今」", () => {
      const targetDate = adjustDate(currentDate, -59, "seconds");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("たった今");
    });
  });

  describe("分前表示（1時間未満）", () => {
    it("1分前", () => {
      const targetDate = adjustDate(currentDate, -1, "minutes");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("1分前");
    });

    it("30分前", () => {
      const targetDate = adjustDate(currentDate, -30, "minutes");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("30分前");
    });

    it("59分前", () => {
      const targetDate = adjustDate(currentDate, -59, "minutes");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("59分前");
    });
  });

  describe("時間前表示（24時間未満）", () => {
    it("1時間前", () => {
      const targetDate = adjustDate(currentDate, -1, "hours");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("1時間前");
    });

    it("12時間前", () => {
      const targetDate = adjustDate(currentDate, -12, "hours");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("12時間前");
    });

    it("23時間前", () => {
      const targetDate = adjustDate(currentDate, -23, "hours");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("23時間前");
    });
  });

  describe("日前表示（7日未満）", () => {
    it("1日前", () => {
      const targetDate = adjustDate(currentDate, -1, "days");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("1日前");
    });

    it("6日前", () => {
      const targetDate = adjustDate(currentDate, -6, "days");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("6日前");
    });
  });

  describe("日付表示", () => {
    it("同じ年の場合は月日のみ", () => {
      const targetDate = new Date("2024-01-15T10:00:00");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("1月15日");
    });

    it("異なる年の場合は年月日", () => {
      const targetDate = new Date("2023-12-25T10:00:00");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("2023年12月25日");
    });
  });

  describe("未来の日付", () => {
    it("未来の日付は「たった今」と表示", () => {
      const futureDate = adjustDate(currentDate, 1, "hours");
      const result = formatTimeAgo(futureDate, currentDate);
      expect(result).toBe("たった今");
    });
  });

  describe("境界値テスト", () => {
    it("60秒ちょうどは1分前", () => {
      const targetDate = adjustDate(currentDate, -60, "seconds");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("1分前");
    });

    it("3600秒（60分）ちょうどは1時間前", () => {
      const targetDate = adjustDate(currentDate, -3600, "seconds");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("1時間前");
    });

    it("86400秒（24時間）ちょうどは1日前", () => {
      const targetDate = adjustDate(currentDate, -86400, "seconds");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("1日前");
    });

    it("604800秒（7日）ちょうどは日付表示", () => {
      const targetDate = adjustDate(currentDate, -7, "days");
      const result = formatTimeAgo(targetDate, currentDate);
      expect(result).toBe("3月8日");
    });
  });
});
