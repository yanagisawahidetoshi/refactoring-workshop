/**
 * 生年月日から学歴の卒業・入学年月を計算するロジック
 * 純粋関数として実装
 */

/**
 * 学歴の年月情報の型定義
 */
export type TEducationDates = {
  highSchoolGraduation: Date; // 高校卒業年月（3月）
  universityEnrollment: Date; // 大学入学年月（4月）
  universityGraduation: Date; // 大学卒業年月（3月）
  graduateSchoolEnrollment: Date; // 大学院入学年月（4月）
  graduateSchoolGraduation: Date; // 大学院卒業年月（3月）
};

/**
 * 日本の学制に基づく年齢計算
 * 4月1日生まれは早生まれとして前年度扱い
 */
function getSchoolYear(birthDate: Date): number {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1; // 0-11 → 1-12
  const day = birthDate.getDate();

  // 4月1日以前の生まれは前年度扱い（早生まれ）
  if (month < 4 || (month === 4 && day === 1)) {
    return year - 1;
  }

  return year;
}

/**
 * 生年月日から学歴の入学・卒業年月を計算する純粋関数
 *
 * 前提条件（ストレート進学・卒業）:
 * - 小学校入学: 満6歳の4月（入学年度 = 生まれ年度 + 6）
 * - 高校卒業: 入学年度 + 12年後の3月
 * - 大学入学: 高校卒業年の4月
 * - 大学卒業: 大学入学年度 + 4年後の3月（4年制大学）
 * - 大学院入学: 大学卒業年の4月
 * - 大学院卒業: 大学院入学年度 + 2年後の3月（修士課程2年）
 *
 * @param birthDate - 生年月日
 * @returns 各学歴の入学・卒業年月
 * @throws 無効な日付の場合
 * @throws 未来の日付の場合
 * @throws 1900年より前の日付の場合
 */
export function calculateEducationDates(birthDate: Date): TEducationDates {
  // 入力値の検証
  if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
    throw new Error("Invalid birthDate");
  }

  const now = new Date();
  if (birthDate > now) {
    throw new Error("birthDate cannot be in the future");
  }

  if (birthDate.getFullYear() < 1900) {
    throw new Error("birthDate must be 1900 or later");
  }

  // 入学年度を計算（早生まれ考慮）
  const schoolYear = getSchoolYear(birthDate);

  // 小学校入学年度（満6歳の4月）
  const elementaryEnrollmentYear = schoolYear + 7;

  // 高校卒業年（小学校入学 + 12年）
  const highSchoolGraduationYear = elementaryEnrollmentYear + 12;

  // 大学入学年（高校卒業年と同じ）
  const universityEnrollmentYear = highSchoolGraduationYear;

  // 大学卒業年（大学入学 + 4年）
  const universityGraduationYear = universityEnrollmentYear + 4;

  // 大学院入学年（大学卒業年と同じ）
  const graduateSchoolEnrollmentYear = universityGraduationYear;

  // 大学院卒業年（大学院入学 + 2年）
  const graduateSchoolGraduationYear = graduateSchoolEnrollmentYear + 2;

  return {
    highSchoolGraduation: new Date(highSchoolGraduationYear, 2, 31), // 3月31日
    universityEnrollment: new Date(universityEnrollmentYear, 3, 1), // 4月1日
    universityGraduation: new Date(universityGraduationYear, 2, 31), // 3月31日
    graduateSchoolEnrollment: new Date(graduateSchoolEnrollmentYear, 3, 1), // 4月1日
    graduateSchoolGraduation: new Date(graduateSchoolGraduationYear, 2, 31), // 3月31日
  };
}

/**
 * 学歴の年月を「YYYY年M月」形式でフォーマットする純粋関数
 *
 * @param date - フォーマットする日付
 * @returns 「YYYY年M月」形式の文字列
 */
export function formatEducationDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}年${month}月`;
}

/**
 * 学歴の年月を和暦（令和・平成）で「R○年M月」形式でフォーマットする純粋関数
 *
 * @param date - フォーマットする日付
 * @returns 和暦形式の文字列
 */
export function formatEducationDateJapanese(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 令和: 2019年5月1日〜
  if (year > 2019 || (year === 2019 && month >= 5)) {
    const reiwaYear = year - 2018;
    return `令和${reiwaYear}年${month}月`;
  }

  // 平成: 1989年1月8日〜2019年4月30日
  if (year > 1989 || (year === 1989 && month > 1) || (year === 1989 && month === 1 && day >= 8)) {
    const heiseiYear = year - 1988;
    return `平成${heiseiYear}年${month}月`;
  }

  // 昭和: 1926年12月25日〜1989年1月7日
  if (year > 1926 || (year === 1926 && month >= 12)) {
    const showaYear = year - 1925;
    return `昭和${showaYear}年${month}月`;
  }

  // それ以前は西暦のまま
  return `${year}年${month}月`;
}
