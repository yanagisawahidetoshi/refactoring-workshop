# リファクタリング勉強会アプリケーション

ライブラリの抽象化と依存性逆転の原則を学ぶための教育用 Next.js アプリケーション

## 環境要件

- Node.js: 18.17 以上
- npm: 9.x 以上

## 環境構築手順

### 1. リポジトリのクローン

```bash
git clone https://github.com/yanagisawahidetoshi/refactoring-workshop
cd refactoring-workshop
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてアプリケーションにアクセスできます。

## 利用可能なコマンド

- `npm run dev` - 開発サーバーの起動
- `npm run build` - プロダクションビルドの作成
- `npm run start` - プロダクションサーバーの起動
- `npm run lint` - Biome によるコードチェック
- `npm run lint:fix` - Biome による自動修正
- `npm run format` - Biome によるコードフォーマット

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **UI ライブラリ**: Material-UI (MUI)
- **HTTP クライアント**: Axios
- **日付ライブラリ**: date-fns
