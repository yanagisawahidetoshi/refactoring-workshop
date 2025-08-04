import {
  differenceInDays,
  endOfWeek,
  format,
  formatDistanceToNow,
  isThisMonth,
  isThisWeek,
  isToday,
  startOfWeek,
  subDays,
} from "date-fns"
import { ja } from "date-fns/locale"

export const useDateHelpers = () => {
  const currentDate = new Date()

  // date-fnsを使用した日付関連の関数
  const getDateInfo = () => {
    const today = format(currentDate, "yyyy年MM月dd日 (E)", { locale: ja })
    const thisWeekStart = format(startOfWeek(currentDate, { weekStartsOn: 1 }), "MM/dd", {
      locale: ja,
    })
    const thisWeekEnd = format(endOfWeek(currentDate, { weekStartsOn: 1 }), "MM/dd", { locale: ja })
    const daysUntilWeekend = differenceInDays(endOfWeek(currentDate), currentDate)

    return {
      today,
      thisWeek: `${thisWeekStart} - ${thisWeekEnd}`,
      daysUntilWeekend,
      currentTime: format(currentDate, "HH:mm:ss"),
      isToday: isToday(currentDate),
      isThisWeek: isThisWeek(currentDate),
      isThisMonth: isThisMonth(currentDate),
    }
  }

  const getPostDateInfo = (postId: number) => {
    // 投稿IDから疑似的な日付を生成
    const fakeDate = subDays(currentDate, postId % 30)
    return {
      formatted: format(fakeDate, "yyyy/MM/dd", { locale: ja }),
      relative: formatDistanceToNow(fakeDate, { addSuffix: true, locale: ja }),
      isRecent: differenceInDays(currentDate, fakeDate) <= 7,
    }
  }

  return {
    getDateInfo,
    getPostDateInfo,
    currentDate,
  }
}
