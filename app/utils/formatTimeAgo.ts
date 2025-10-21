/**
 * Twitter風の投稿時刻表示ロジック
 */

/**
 * 指定された日時から現在時刻までの経過時間を
 * Twitter風の形式で返す純粋関数
 *
 * @param targetDate - 対象の日時
 * @param currentDate - 現在の日時（デフォルトは現在時刻、テスト時のみ指定）
 * @returns フォーマットされた時刻文字列
 */
export function formatTimeAgo(
  targetDate: Date,
  currentDate: Date = new Date()
): string {
  // 入力値の検証
  if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
    throw new Error("Invalid targetDate");
  }
  if (!(currentDate instanceof Date) || isNaN(currentDate.getTime())) {
    throw new Error("Invalid currentDate");
  }

  // 未来の日付の場合
  if (targetDate > currentDate) {
    return "たった今";
  }

  const diffMs = currentDate.getTime() - targetDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // 1分未満
  if (diffSeconds < 60) {
    return "たった今";
  }

  // 1時間未満
  if (diffMinutes < 60) {
    return `${diffMinutes}分前`;
  }

  // 24時間未満
  if (diffHours < 24) {
    return `${diffHours}時間前`;
  }

  // 7日未満
  if (diffDays < 7) {
    return `${diffDays}日前`;
  }

  // 同じ年の場合
  if (targetDate.getFullYear() === currentDate.getFullYear()) {
    return `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
  }

  // 異なる年の場合
  return `${targetDate.getFullYear()}年${
    targetDate.getMonth() + 1
  }月${targetDate.getDate()}日`;
}
