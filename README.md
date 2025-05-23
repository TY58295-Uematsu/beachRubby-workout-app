# auth_sample

<h1 align="center"> 🏈🏖️🚀ビーチラグビー練習会記録アプリ🚀🏖️🏈 </h1> <br>
<p align="center">
チームで練習会での目標や反省点を共有しましょう！
<br/>
このアプリでは、前回の練習の動画や、個人の目標・結果を管理することができます。
<br/>
また、次回の練習日の気温・天候から、持参する水分量を提案します。
<br/>
さあ、今すぐ始めてみませんか？
  <a href="https://beachrubby-workout-app.onrender.com/">
    （アプリリンク）
  </a>
</p>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [概要](#概要)
- [Feedback](#feedback)
- [Contributors](#contributors)
- [Build Process](#build-process)
- [使用技術](#使用技術)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 概要

この Web アプリで以下のことができます。

- チームメンバーの練習目標・結果が共有できる
- 練習動画のリンクを保存できる
- 次回練習部の天気と気温から、持っていくべき水分量を提案

**Available for both PC device 　 and smartPhone.**

## Feedback

フィードバックがある場合は、Github issue を報告してください。プルリクエストもいつでも歓迎いたします。

## Contributors

講師陣の皆様、BTC8 期メンバーには多大なる貢献をいただいております。ありがとうございます。

## Build Process

- Follow the [React Native Guide](https://facebook.github.io/react-native/docs/getting-started.html) for getting started building a project with native code. **A Mac is required if you wish to develop for iOS.**
- Clone or download the repo
- ```powershell
  npm install 
  cd front-ts
  npm install
  ```
- バックエンドサーバーを立ち上げる
- ```powershell
  npm run dev (ルートディレクトリ)で 
  ```
- フロント側を立ち上げる
- ```powershell
  npm run dev (/front-ts ディレクトリ)で 
  ```

## 使用技術
<img src="https://img.shields.io/badge/-React-00bfff.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-TypeScript-0000cd.svg?logo=typescript&style=flat">
<img src="https://img.shields.io/badge/-mui-8a2be2.svg?logo=mui&style=flat">
<img src="https://img.shields.io/badge/-Express-ffa500.svg?logo=express&style=flat">
<img src="https://img.shields.io/badge/-Knex-019733.svg?logo=knex&style=flat">
<img src="https://img.shields.io/badge/-Postgre-00ffff.svg?logo=postgresql&style=flat">


## ディレクトリ構成
- 2025.05.23 時点
<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
  ```
.
├── .DS_Store
├── .env
├── .gitignore
├── README.md
├── authCheck.js
├── db
│   ├── fixtures.js
│   ├── migrations
│   └── seeds
├── front
│   ├── .DS_Store
│   ├── .gitignore
│   ├── README.md
│   ├── dist
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   └── vite.config.js
├── front-ts
│   ├── .gitignore
│   ├── README.md
│   ├── dist
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── index.js
├── iron-byte-460513-m1-3e0b7f65ae53.json
├── knex.js
├── knexfile.js
├── package-lock.json
├── package.json
├── public
│   └── .DS_Store
├── routes
│   └── gemini.js
├── server.js
└── test
    ├── index.test.js
    └── setup.js
  ```
