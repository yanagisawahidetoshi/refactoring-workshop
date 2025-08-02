# コードスタイルと規約

## TypeScript設定
- **厳密モード**: `strict: true`
- **ターゲット**: ES2017
- **モジュール解決**: bundler
- **パスエイリアス**: `@/*` → `./src/*`

## ESLint設定
- **ベース設定**: `next/core-web-vitals`
- **Next.js推奨設定**を使用

## ファイル構造規約
```
src/
├── app/
│   ├── components/    # Reactコンポーネント
│   ├── layout.tsx     # ルートレイアウト
│   ├── page.tsx       # ダッシュボードページ
│   └── globals.css    # グローバルスタイル
```

## 命名規約
- **コンポーネント**: PascalCase（例: `ThemeProvider`）
- **関数**: camelCase
- **Props**: `Props`インターフェース名を使用

## インポート規約
- パスエイリアス`@/`を使用してsrcディレクトリからの相対パスを指定

## スタイリング
- Tailwind CSSクラスを使用
- MUIコンポーネントと併用