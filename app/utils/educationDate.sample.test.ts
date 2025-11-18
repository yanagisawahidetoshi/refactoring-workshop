import {
  calculateEducationDates,
  formatEducationDate,
  formatEducationDateJapanese,
} from "./educationDate";

describe("calculateEducationDates", () => {
  describe("given a standard birth date (not early admission)", () => {
    describe("when calculating education dates for birth date 2000-05-15", () => {
      it("then should return correct education dates", () => {
        // Given
        const birthDate = new Date("2000-05-15");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        expect(result.highSchoolGraduation).toEqual(new Date(2019, 2, 31)); // 2019年3月31日
        expect(result.universityEnrollment).toEqual(new Date(2019, 3, 1)); // 2019年4月1日
        expect(result.universityGraduation).toEqual(new Date(2023, 2, 31)); // 2023年3月31日
        expect(result.graduateSchoolEnrollment).toEqual(new Date(2023, 3, 1)); // 2023年4月1日
        expect(result.graduateSchoolGraduation).toEqual(new Date(2025, 2, 31)); // 2025年3月31日
      });
    });

    describe("when calculating education dates for birth date 1995-08-20", () => {
      it("then should return correct education dates", () => {
        // Given
        const birthDate = new Date("1995-08-20");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        expect(result.highSchoolGraduation).toEqual(new Date(2014, 2, 31)); // 2014年3月31日
        expect(result.universityEnrollment).toEqual(new Date(2014, 3, 1)); // 2014年4月1日
        expect(result.universityGraduation).toEqual(new Date(2018, 2, 31)); // 2018年3月31日
        expect(result.graduateSchoolEnrollment).toEqual(new Date(2018, 3, 1)); // 2018年4月1日
        expect(result.graduateSchoolGraduation).toEqual(new Date(2020, 2, 31)); // 2020年3月31日
      });
    });
  });

  describe("given early admission birth dates (April 1 or earlier)", () => {
    describe("when birth date is April 1 (early admission)", () => {
      it("then should treat as previous school year", () => {
        // Given
        const birthDate = new Date("2000-04-01");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        // 4月1日生まれは早生まれ扱い（1999年度生まれ）
        expect(result.highSchoolGraduation).toEqual(new Date(2018, 2, 31)); // 2018年3月31日
        expect(result.universityEnrollment).toEqual(new Date(2018, 3, 1)); // 2018年4月1日
        expect(result.universityGraduation).toEqual(new Date(2022, 2, 31)); // 2022年3月31日
      });
    });

    describe("when birth date is March 31", () => {
      it("then should treat as previous school year", () => {
        // Given
        const birthDate = new Date("2000-03-31");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        // 3月31日生まれも早生まれ扱い
        expect(result.highSchoolGraduation).toEqual(new Date(2018, 2, 31)); // 2018年3月31日
        expect(result.universityEnrollment).toEqual(new Date(2018, 3, 1)); // 2018年4月1日
      });
    });

    describe("when birth date is January 1", () => {
      it("then should treat as previous school year", () => {
        // Given
        const birthDate = new Date("2000-01-01");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        // 1月1日生まれも早生まれ扱い
        expect(result.highSchoolGraduation).toEqual(new Date(2018, 2, 31)); // 2018年3月31日
        expect(result.universityEnrollment).toEqual(new Date(2018, 3, 1)); // 2018年4月1日
      });
    });

    describe("when birth date is April 2 (not early admission)", () => {
      it("then should treat as current school year", () => {
        // Given
        const birthDate = new Date("2000-04-02");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        // 4月2日生まれは通常扱い（2000年度生まれ）
        expect(result.highSchoolGraduation).toEqual(new Date(2019, 2, 31)); // 2019年3月31日
        expect(result.universityEnrollment).toEqual(new Date(2019, 3, 1)); // 2019年4月1日
      });
    });
  });

  describe("given edge case birth dates", () => {
    describe("when birth date is December 31", () => {
      it("then should calculate correctly for year-end birth", () => {
        // Given
        const birthDate = new Date("2000-12-31");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        expect(result.highSchoolGraduation).toEqual(new Date(2019, 2, 31)); // 2019年3月31日
        expect(result.universityGraduation).toEqual(new Date(2023, 2, 31)); // 2023年3月31日
      });
    });

    describe("when birth date is in the 1980s", () => {
      it("then should calculate correctly for older dates", () => {
        // Given
        const birthDate = new Date("1985-07-10");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        expect(result.highSchoolGraduation).toEqual(new Date(2004, 2, 31)); // 2004年3月31日
        expect(result.universityEnrollment).toEqual(new Date(2004, 3, 1)); // 2004年4月1日
        expect(result.universityGraduation).toEqual(new Date(2008, 2, 31)); // 2008年3月31日
        expect(result.graduateSchoolEnrollment).toEqual(new Date(2008, 3, 1)); // 2008年4月1日
        expect(result.graduateSchoolGraduation).toEqual(new Date(2010, 2, 31)); // 2010年3月31日
      });
    });

    describe("when birth date is exactly 1900-01-01", () => {
      it("then should calculate correctly for minimum valid date", () => {
        // Given
        const birthDate = new Date("1900-01-01");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        expect(result.highSchoolGraduation).toEqual(new Date(1918, 2, 31)); // 1918年3月31日
        expect(result.universityGraduation).toEqual(new Date(1922, 2, 31)); // 1922年3月31日
      });
    });
  });

  describe("given recent birth dates", () => {
    describe("when birth date is 2010-06-15", () => {
      it("then should calculate future graduation dates", () => {
        // Given
        const birthDate = new Date("2010-06-15");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        expect(result.highSchoolGraduation).toEqual(new Date(2029, 2, 31)); // 2029年3月31日
        expect(result.universityEnrollment).toEqual(new Date(2029, 3, 1)); // 2029年4月1日
        expect(result.universityGraduation).toEqual(new Date(2033, 2, 31)); // 2033年3月31日
        expect(result.graduateSchoolGraduation).toEqual(new Date(2035, 2, 31)); // 2035年3月31日
      });
    });
  });

  describe("given invalid inputs", () => {
    describe("when birthDate is invalid", () => {
      it("then should throw error", () => {
        // Given
        const invalidDate = new Date("invalid");

        // When & Then
        expect(() => calculateEducationDates(invalidDate)).toThrow(
          "Invalid birthDate"
        );
      });
    });

    describe("when birthDate is in the future", () => {
      it("then should throw error", () => {
        // Given
        const futureDate = new Date("2030-01-01");

        // When & Then
        expect(() => calculateEducationDates(futureDate)).toThrow(
          "birthDate cannot be in the future"
        );
      });
    });

    describe("when birthDate is before 1900", () => {
      it("then should throw error", () => {
        // Given
        const oldDate = new Date("1899-12-31");

        // When & Then
        expect(() => calculateEducationDates(oldDate)).toThrow(
          "birthDate must be 1900 or later"
        );
      });
    });
  });

  describe("given validation of date sequence", () => {
    describe("when calculating all dates", () => {
      it("then dates should be in chronological order", () => {
        // Given
        const birthDate = new Date("2000-05-15");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        expect(result.highSchoolGraduation.getTime()).toBeLessThan(
          result.universityEnrollment.getTime()
        );
        expect(result.universityEnrollment.getTime()).toBeLessThan(
          result.universityGraduation.getTime()
        );
        expect(result.universityGraduation.getTime()).toBeLessThan(
          result.graduateSchoolEnrollment.getTime()
        );
        expect(result.graduateSchoolEnrollment.getTime()).toBeLessThan(
          result.graduateSchoolGraduation.getTime()
        );
      });
    });

    describe("when checking graduation and enrollment dates", () => {
      it("then enrollment should be 1 day after previous graduation", () => {
        // Given
        const birthDate = new Date("2000-05-15");

        // When
        const result = calculateEducationDates(birthDate);

        // Then
        // 高校卒業(3/31)の翌日が大学入学(4/1)
        const daysDiff1 =
          (result.universityEnrollment.getTime() -
            result.highSchoolGraduation.getTime()) /
          (1000 * 60 * 60 * 24);
        expect(daysDiff1).toBe(1);

        // 大学卒業(3/31)の翌日が大学院入学(4/1)
        const daysDiff2 =
          (result.graduateSchoolEnrollment.getTime() -
            result.universityGraduation.getTime()) /
          (1000 * 60 * 60 * 24);
        expect(daysDiff2).toBe(1);
      });
    });
  });
});

describe("formatEducationDate", () => {
  describe("given various dates", () => {
    describe("when formatting March date", () => {
      it("then should return YYYY年M月 format", () => {
        // Given
        const date = new Date(2019, 2, 31); // 2019年3月31日

        // When
        const result = formatEducationDate(date);

        // Then
        expect(result).toBe("2019年3月");
      });
    });

    describe("when formatting April date", () => {
      it("then should return YYYY年M月 format", () => {
        // Given
        const date = new Date(2019, 3, 1); // 2019年4月1日

        // When
        const result = formatEducationDate(date);

        // Then
        expect(result).toBe("2019年4月");
      });
    });

    describe("when formatting December date", () => {
      it("then should return YYYY年M月 format with double-digit month", () => {
        // Given
        const date = new Date(2020, 11, 31); // 2020年12月31日

        // When
        const result = formatEducationDate(date);

        // Then
        expect(result).toBe("2020年12月");
      });
    });
  });
});

describe("formatEducationDateJapanese", () => {
  describe("given Reiwa era dates (2019/5/1~)", () => {
    describe("when formatting 2019年5月", () => {
      it("then should return 令和1年5月", () => {
        // Given
        const date = new Date(2019, 4, 1); // 2019年5月1日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("令和1年5月");
      });
    });

    describe("when formatting 2023年3月", () => {
      it("then should return 令和5年3月", () => {
        // Given
        const date = new Date(2023, 2, 31); // 2023年3月31日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("令和5年3月");
      });
    });

    describe("when formatting 2025年4月", () => {
      it("then should return 令和7年4月", () => {
        // Given
        const date = new Date(2025, 3, 1); // 2025年4月1日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("令和7年4月");
      });
    });
  });

  describe("given Heisei era dates (1989/1/8~2019/4/30)", () => {
    describe("when formatting 2019年4月", () => {
      it("then should return 平成31年4月", () => {
        // Given
        const date = new Date(2019, 3, 1); // 2019年4月1日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("平成31年4月");
      });
    });

    describe("when formatting 2010年3月", () => {
      it("then should return 平成22年3月", () => {
        // Given
        const date = new Date(2010, 2, 31); // 2010年3月31日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("平成22年3月");
      });
    });

    describe("when formatting 1989年1月", () => {
      it("then should return 平成1年1月", () => {
        // Given
        const date = new Date(1989, 0, 8); // 1989年1月8日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("平成1年1月");
      });
    });
  });

  describe("given Showa era dates (1926/12/25~1989/1/7)", () => {
    describe("when formatting 1989年1月7日", () => {
      it("then should return 昭和64年1月", () => {
        // Given
        const date = new Date(1989, 0, 7); // 1989年1月7日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("昭和64年1月");
      });
    });

    describe("when formatting 1980年4月", () => {
      it("then should return 昭和55年4月", () => {
        // Given
        const date = new Date(1980, 3, 1); // 1980年4月1日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("昭和55年4月");
      });
    });

    describe("when formatting 1926年12月", () => {
      it("then should return 昭和1年12月", () => {
        // Given
        const date = new Date(1926, 11, 25); // 1926年12月25日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("昭和1年12月");
      });
    });
  });

  describe("given dates before Showa era", () => {
    describe("when formatting 1920年4月", () => {
      it("then should return Western calendar format", () => {
        // Given
        const date = new Date(1920, 3, 1); // 1920年4月1日

        // When
        const result = formatEducationDateJapanese(date);

        // Then
        expect(result).toBe("1920年4月");
      });
    });
  });
});

describe("integration: full education date workflow", () => {
  describe("given a complete education date calculation and formatting", () => {
    describe("when using all functions together", () => {
      it("then should provide complete formatted education history", () => {
        // Given
        const birthDate = new Date("2000-05-15");

        // When
        const dates = calculateEducationDates(birthDate);
        const formatted = {
          highSchoolGraduation: formatEducationDate(dates.highSchoolGraduation),
          universityEnrollment: formatEducationDate(dates.universityEnrollment),
          universityGraduation: formatEducationDate(dates.universityGraduation),
          graduateSchoolEnrollment: formatEducationDate(
            dates.graduateSchoolEnrollment
          ),
          graduateSchoolGraduation: formatEducationDate(
            dates.graduateSchoolGraduation
          ),
        };
        const formattedJapanese = {
          highSchoolGraduation: formatEducationDateJapanese(
            dates.highSchoolGraduation
          ),
          universityGraduation: formatEducationDateJapanese(
            dates.universityGraduation
          ),
          graduateSchoolGraduation: formatEducationDateJapanese(
            dates.graduateSchoolGraduation
          ),
        };

        // Then
        expect(formatted).toEqual({
          highSchoolGraduation: "2019年3月",
          universityEnrollment: "2019年4月",
          universityGraduation: "2023年3月",
          graduateSchoolEnrollment: "2023年4月",
          graduateSchoolGraduation: "2025年3月",
        });
        expect(formattedJapanese).toEqual({
          highSchoolGraduation: "平成31年3月",
          universityGraduation: "令和5年3月",
          graduateSchoolGraduation: "令和7年3月",
        });
      });
    });
  });
});
