'use client';

import React, { useState, useEffect } from 'react';
import { 
  format, 
  addDays, 
  subDays, 
  startOfWeek, 
  endOfWeek, 
  isWithinInterval, 
  differenceInDays,
  parseISO,
  isValid
} from 'date-fns';
import { ja } from 'date-fns/locale';

export default function DateDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [inputDate, setInputDate] = useState('');

  // 現在時刻を1秒ごとに更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(event.target.value);
  };

  // 入力された日付をパース
  const parsedDate = inputDate ? parseISO(inputDate) : null;
  const isValidDate = parsedDate && isValid(parsedDate);

  // 週の開始日と終了日を計算
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // 月曜始まり
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

  // 様々な日付計算
  const yesterday = subDays(currentDate, 1);
  const tomorrow = addDays(currentDate, 1);
  const nextWeek = addDays(currentDate, 7);
  const lastMonth = subDays(currentDate, 30);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>📅 Date-fns Direct Usage Demo</h2>
      
      {/* リアルタイム時計 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>現在時刻</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
          {format(currentDate, 'yyyy年MM月dd日 HH:mm:ss', { locale: ja })}
        </p>
        <p>フォーマット: {format(currentDate, 'PPPPp', { locale: ja })}</p>
      </div>

      {/* 日付計算結果 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
        <h3>日付計算</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>📍 昨日: {format(yesterday, 'yyyy/MM/dd (E)', { locale: ja })}</li>
          <li>📍 今日: {format(currentDate, 'yyyy/MM/dd (E)', { locale: ja })}</li>
          <li>📍 明日: {format(tomorrow, 'yyyy/MM/dd (E)', { locale: ja })}</li>
          <li>📍 来週: {format(nextWeek, 'yyyy/MM/dd (E)', { locale: ja })}</li>
          <li>📍 30日前: {format(lastMonth, 'yyyy/MM/dd (E)', { locale: ja })}</li>
        </ul>
      </div>

      {/* 週の範囲 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
        <h3>今週の範囲</h3>
        <p>
          {format(weekStart, 'MM/dd (E)', { locale: ja })} 〜 {format(weekEnd, 'MM/dd (E)', { locale: ja })}
        </p>
      </div>

      {/* 日付入力と比較 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#d1ecf1', borderRadius: '8px' }}>
        <h3>日付比較</h3>
        <input
          type="date"
          value={inputDate}
          onChange={handleDateChange}
          style={{ padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {isValidDate && (
          <div>
            <p>選択した日付: {format(parsedDate, 'yyyy年MM月dd日 (E)', { locale: ja })}</p>
            <p>今日との差: {differenceInDays(parsedDate, currentDate)}日</p>
            <p>
              今週内かどうか: {
                isWithinInterval(parsedDate, { start: weekStart, end: weekEnd }) 
                  ? '✅ 今週内です' 
                  : '❌ 今週外です'
              }
            </p>
          </div>
        )}
      </div>

      {/* 様々なフォーマット例 */}
      <div style={{ padding: '15px', backgroundColor: '#f8d7da', borderRadius: '8px' }}>
        <h3>フォーマット例</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>ISO: {format(currentDate, "yyyy-MM-dd'T'HH:mm:ss")}</li>
          <li>US形式: {format(currentDate, 'MM/dd/yyyy')}</li>
          <li>EU形式: {format(currentDate, 'dd/MM/yyyy')}</li>
          <li>時刻のみ: {format(currentDate, 'HH:mm:ss')}</li>
          <li>年月: {format(currentDate, 'yyyy年MM月', { locale: ja })}</li>
          <li>曜日: {format(currentDate, 'EEEE', { locale: ja })}</li>
        </ul>
      </div>
    </div>
  );
}