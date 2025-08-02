# コードベース構造

## ディレクトリ構成
```
/
├── .serena/           # Serena設定
├── .next/             # Next.jsビルド出力
├── node_modules/      # npm依存関係
├── src/
│   └── app/          # Next.js App Router
│       ├── components/
│       │   └── ThemeProvider.tsx
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── next-env.d.ts
└── CLAUDE.md
```

## 現在のコンポーネント
- `ThemeProvider`: MUIテーマプロバイダー
- `Home`: メインページコンポーネント（現在は基本的なタイトル表示のみ）

## 予定されている構造（CLAUDE.mdより）
将来的に以下が追加される予定：
- `app/types/` - UserとPostの型定義
- `app/api/` - モックデータ付きAPIルートハンドラー
- `app/components/` - UserProfile、PostListコンポーネント
- `app/theme.ts` - MUIテーマ設定

## 特徴
- 最小限のコンポーネント構成（学習用のため）
- App Routerを使用したNext.js構造
- TypeScript完全対応