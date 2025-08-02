---
marp: true
theme: default
paginate: true
---

# 外部モジュールを直接使わない設計

## モジュール置換を容易にする第一歩

---

# 今日のテーマ

## 外部ライブラリを直接使うと...

- 変更が大変
- テストが大変
- 設定の管理が大変

## だから隠蔽しよう！

---

# 現状の問題点

```typescript
// 😰 各ファイルで外部モジュールを直接使用
import { format } from "date-fns";
import axios from "axios";
import { Button } from "@mui/material";
```

**100 箇所以上で同じようなインポートが...**

---

# なぜこれが問題なのか？

## 1. 強い結合度（Tight Coupling）

## 2. 変更の波及効果

## 3. テストの困難さ

## 4. バージョンアップへの脆弱性

---

# 問題 1：強い結合度

- アプリケーション全体が特定のライブラリに依存
- ライブラリ固有の API が至る所に散在
- ビジネスロジックとライブラリが密結合

---

# 問題 2：変更の波及効果

## 日付ライブラリを変更したい！

- moment.js → date-fns
- 数百ファイルの修正が必要...

---

# 問題 3：テストの困難さ

```typescript
// 各テストファイルでモックが必要
jest.mock("date-fns");
jest.mock("axios");
jest.mock("@mui/material");
```

モックの一貫性を保つのが困難

---

# 問題 4：バージョンアップへの脆弱性

破壊的変更があった場合...
→ 影響範囲が広大

---

# 実例 1：date-fns（Before ❌）

```typescript
// components/UserProfile.tsx
import { format } from "date-fns";

export const UserProfile = ({ user }) => {
  return <p>登録日: {format(user.createdAt, "yyyy年MM月dd日")}</p>;
};

// components/PostList.tsx
import { formatDistance } from "date-fns";
import { ja } from "date-fns/locale";

export const PostList = ({ posts }) => {
  return posts.map((post) => (
    <div>{formatDistance(post.date, new Date(), { locale: ja })}</div>
  ));
};
```

---

# 実例 1：date-fns（After ✅）

```typescript
// lib/date/formatter.ts
import { format } from "date-fns";
import { ja } from "date-fns/locale";

export class DateFormatter {
  formatDate(date: Date, pattern: string = "yyyy年MM月dd日"): string {
    return format(date, pattern);
  }

  formatTime(date: Date): string {
    return format(date, "HH:mm");
  }

  formatDateTime(date: Date): string {
    return format(date, "yyyy年MM月dd日 HH:mm", { locale: ja });
  }
}
```

---

# 責務ごとにクラスを分割

```typescript
// lib/date/calculator.ts
import { differenceInDays, addDays, formatDistance } from "date-fns";
import { ja } from "date-fns/locale";

export class DateCalculator {
  getDaysDifference(date1: Date, date2: Date): number {
    return differenceInDays(date1, date2);
  }

  addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }

  getRelativeTime(date: Date, baseDate: Date = new Date()): string {
    return formatDistance(date, baseDate, { locale: ja });
  }
}
```

---

# なぜクラスベース？

## 次のステップ（DIP）への準備

```typescript
// 将来的にインターフェースを定義しやすい
interface IDateFormatter {
  formatDate(date: Date, pattern?: string): string;
  formatTime(date: Date): string;
}

class DateFormatter implements IDateFormatter {
  // 実装
}
```

**依存性注入（DI）への移行が容易に！**

---

# axios の問題点

- タイムアウト値が統一されていない
- 認証トークンの設定が重複
- エラーハンドリングが各所でバラバラ
- インターセプターを追加したい時、全ファイルに影響

---

# 実例 2：axios（After ✅）

```typescript
// lib/http.ts
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // 統一されたタイムアウト
});

// 共通のインターセプター設定
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

# HTTP クライアントの抽象化

```typescript
export const http = {
  get: async <T>(url: string): Promise<T> => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  },

  post: async <T>(url: string, data?: any): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  },
};

// 使用側
export const getUser = async (id: string) => {
  return http.get<User>(`/api/users/${id}`);
  // タイムアウトも認証も自動で適用される！
};
```

---

# 実例 3：MUI（Before ❌）

```typescript
// components/SubmitButton.tsx
import { Button } from "@mui/material";

export const SubmitButton = ({ onClick, children }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {children}
    </Button>
  );
};
```

直接 MUI の API に依存

---

# 実例 3：MUI（After ✅）

```typescript
// components/ui/Button.tsx
import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  const muiVariant = variant === "outline" ? "outlined" : "contained";
  const muiColor = variant === "secondary" ? "secondary" : "primary";

  return <MuiButton variant={muiVariant} color={muiColor} {...props} />;
};
```

---

# メリットまとめ

## 1. 置換が容易

- moment.js → date-fns：1 ファイルの修正で完了

## 2. 統一されたインターフェース

- アプリケーション固有のニーズに合わせた API

## 3. テストの簡素化

- モックポイントが集約

## 4. 型安全性の向上

- アプリケーション固有の型定義

---

# 実装のベストプラクティス

## 1. 最小限のインターフェース

```typescript
// ❌ 全機能を公開
export { format, parse, isValid, ... } from 'date-fns';

// ✅ 必要な機能のみ
export const dateUtils = {
  formatDate: (date: Date) => format(date, 'yyyy-MM-dd'),
  formatTime: (date: Date) => format(date, 'HH:mm'),
};
```

---

# 2. アプリケーション固有の抽象化

```typescript
// ビジネスロジックに沿った名前付け
export const formatters = {
  userJoinDate: (date: Date) => dateUtils.formatDate(date),

  articlePublishTime: (date: Date) => dateUtils.formatRelativeTime(date),
};
```

---

# 3. 段階的な移行

1. **Wrapper を作成**
2. **新規コードでは Wrapper を使用**
3. **既存コードを段階的に置換**
4. **直接インポートを禁止（ESLint ルール）**

---

# ESLint ルールの例

```json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": ["date-fns", "date-fns/*", "axios", "@mui/material"],
        "message": "ライブラリを直接使用せず、lib/以下のWrapperを使用してください"
      }
    ]
  }
}
```

---

# まとめ

## 外部モジュールの隠蔽化は...

- **保守性の向上**
- **テスタビリティの向上**
- **柔軟性の確保**

## これは第一歩！

次回予告：依存性注入（DI）パターン

---

# 実践課題

1. よく使うライブラリを 1 つ選ぶ
2. Wrapper を作成する
3. 新規コードで Wrapper を使用する
4. 効果を実感する

---

# ご清聴ありがとうございました

## 質問・ディスカッション
