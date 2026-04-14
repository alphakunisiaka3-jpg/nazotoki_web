# 💕 彼女への謎解きサイト 💕

彼女さんのための素敵な謎解きゲームサイトです。Next.js を使用した静的サイトで、GitHub Pages で公開できます。

## 📖 プロジェクト概要

このプロジェクトは、大切な彼女さんへの思いを込めた謎解きサイトです。以下の特徴があります：

- **完全静的生成**: GitHub Pages で無料でホスティング可能
- **レスポンシブデザイン**: スマートフォン・タブレット対応
- **ダークモード対応**: ユーザーのシステム設定に自動対応
- **カスタマイズ可能**: クイズの内容を自由に編集可能
- **スコア計算**: 正解数をパーセント表示

## 🚀 セットアップ

### 開発環境での実行

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 本番用ビルド

```bash
npm run build
```

`out` ディレクトリに静的ファイルが生成されます。

## 📝 クイズをカスタマイズ

`app/page.tsx` の `quizzes` 配列を編集して、クイズを自由にカスタマイズできます：

```typescript
const quizzes: Quiz[] = [
  {
    id: 1,
    question: "質問内容",
    answer: "正解",
    hint: "ヒント内容",
  },
  // 追加のクイズをここに加える
];
```

## 🌐 GitHub Pages へのデプロイ

1. GitHub にリポジトリを作成
2. このプロジェクトをプッシュ
3. GitHub Actions で自動ビルド・デプロイが実行されます
4. Settings > Pages から GitHub Pages を有効にしたリポジトリ URL でアクセス可能

## 🛠️ 技術スタック

- **Next.js 16** - React フレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファーストなスタイリング
- **React Hooks** - 状態管理

## 📂 プロジェクト構造

```
kaede_nazotoki_web/
├── app/
│   ├── page.tsx          # メインページ（謎解きロジック）
│   ├── layout.tsx        # レイアウト
│   └── globals.css       # グローバルスタイル
├── public/               # 静的アセット
├── next.config.ts        # Next.js 設定
├── tailwind.config.ts    # Tailwind CSS 設定
└── package.json          # 依存パッケージ
```

## 💡 ヒント機能

ユーザーは各クイズで「ヒント」ボタンをクリックしてヒントを表示できます。

## 📊 スコア表示

すべてのクイズに答えて「採点する」ボタンを押すと、以下の情報が表示されます：

- 正解数 / 総クイズ数
- 正解率（パーセント）
- パフォーマンスに応じたメッセージ

## 🎨 デザインカスタマイズ

色合いやレイアウトは `app/page.tsx` の Tailwind CSS クラスで変更できます。

---

大切な彼女さんとの素敵な思い出を共有するサイト。ぜひ活用してください！❤️

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
