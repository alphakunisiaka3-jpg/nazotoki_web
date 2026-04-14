# GitHub Copilot Instructions - 彼女への謎解きサイト

このプロジェクトは、彼女さんのための謎解きサイトです。以下の指示に従ってください。

## プロジェクト概要

- **フレームワーク**: Next.js 16.2.3 (TypeScript)
- **スタイリング**: Tailwind CSS
- **デプロイ**: GitHub Pages（静的生成）
- **特徴**: バックエンドレス、完全静的サイト

## セットアップ方法

### 開発環境

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

### ビルド

```bash
npm run build
npm start
```

## ファイル構造と役割

- `app/page.tsx` - メインの謎解きコンポーネント（クイズのロジック、UI、状態管理）
- `app/layout.tsx` - アプリケーション全体のレイアウト
- `app/globals.css` - グローバルスタイル
- `next.config.ts` - GitHub Pages デプロイ用の設定
- `.nojekyll` - GitHub Pages で必要

## カスタマイズガイド

### クイズを追加・編集する

`app/page.tsx` の `quizzes` 配列を編集：

```typescript
const quizzes: Quiz[] = [
  {
    id: 1,
    question: "質問内容",
    answer: "正解（複数形式対応：大文字小文字、前後の空白は無視）",
    hint: "ヒント内容",
  },
];
```

### デザイン変更

Tailwind CSS のクラスを編集。主な色設定：
- ピンク系: `from-pink-500 to-purple-600`
- 背景: `bg-gradient-to-br from-pink-50 to-purple-50`

## GitHub Pages デプロイ手順

1. 本番ビルド実行:
   ```bash
   npm run build
   ```

2. GitHub にプッシュ

3. リポジトリの Settings > Pages > Source を "GitHub Actions" に設定

4. 自動デプロイされたサイトが https://username.github.io/kaede_nazotoki_web で公開される

## マージ前チェックリスト

- [ ] `npm run build` でエラーなく完了
- [ ] `npm run dev` で http://localhost:3000 でテスト
- [ ] クイズ内容確認
- [ ] タイタル、ヒント、答えに誤字がないか確認
- [ ] モバイルで動作確認

## 重要な設定

- `next.config.ts`: `basePath` は開発時は空、本番時は `/kaede_nazotoki_web` に自動設定
- Turbopack は日本語パスで問題があるため、必要に応じて `turbopack.root` で対応済み

## よくある問題と解決策

### ビルド時に Turbopack エラーが出る場合

既に `turbopack.root` を設定しているので、通常は解決しています。

### 開発サーバーが起動しない

キャッシュをクリア:
```bash
rm -r .next
npm run dev
```

### GitHub Pages で 404 エラー

`basePath` 設定を確認してください。本番環境では自動的に `/kaede_nazotoki_web` が付きます。

---

質問はいつでも聞いてくださいね！❤️
