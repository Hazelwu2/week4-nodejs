
<div align="center">
  <a href="https://github.com/Hazelwu2/week4-nodejs.git">
    <img src="./logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Week4 Nodejs Express</h3>

  <p align="center">
    🌱 貼文動態牆 API in Node.js
    <br />
    <a href="https://github.com/Hazelwu2/week4-nodejs/issues">Report Bug</a>
    ·
    <a href="https://week4-nodejs-frontend.vercel.app/">線上Demo</a>
  </p>
</div>

## 🛖 About This Project
第四週六角學院 Nodejs 主線任務，打造全端 (Full Stack) 網站架構，前後端分離開發。
- [後端Repo](https://github.com/Hazelwu2/week4-nodejs.git)
- [前端 React + Typescript + Axios](https://github.com/Hazelwu2/week4-nodejs-frontend.git)
- [線上Demo](https://week4-nodejs-frontend.vercel.app/)

### 等級表
#### LV1：整合 user model，只做後端 API
  - 設計[這頁](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/5b6bb2a0-f0f3-4b39-841f-8cf3a0ed9707)的 GET API
  - 設計[這頁](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/dfc7891e-63fd-4141-989a-8776ee7ea9f0) POST API
  - 發文人 ID 可先固定

#### LV2：前後端都做
  - 3.[全體動態牆](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/5b6bb2a0-f0f3-4b39-841f-8cf3a0ed9707)，並需設計篩選功能(從新到舊貼文、從舊到最新、關鍵字搜尋)
  - 3-3.[全體動態牆-沒有動態](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/fb06b070-009d-4ccf-9d60-248b9f51dcd4)
  - 7.[張貼動態](https://xd.adobe.com/view/c0763dbe-fc15-42e8-be0b-8956ed03e675-9525/screen/dfc7891e-63fd-4141-989a-8776ee7ea9f0)：上傳圖片按鈕請移除，改用 input.text，直接放圖片網址，可做簡易 client 驗證，是否開頭字串為 https

#### LV3：前後端都做 + 試著自己接 imgur API
  - 先上傳成功回傳圖片網址後，再送出貼文


* 上傳 [GitHub](https://github.com/Hazelwu2/week4-nodejs.git)
* config.env 忽略，不能在 GitHub 上：以.env取代
* 請連接 mongodb 雲端 atlas 資料庫
* dotenv 加上環境變數，讓程式更安全
* 部署到 [heroku 主機](https://week4-nodejs.herokuapp.com/)

API 規格

* Create：建立 Post 貼文，[POST] /posts/
* Read：閱讀 Post 貼文，[GET] /posts/
* Edit：編輯 Post 貼文，[GET] /posts/{id}
* Delete：刪除單篇 Post 貼文，[DELETE] /posts/{id}
* Delete：刪除所有 Post 貼文，[DELETE] /posts/


## 🔨 Built With
此專案會用到的 Framework / Library 或工具

* [Nodejs](https://github.com/nodejs)
* [Heroku](https://www.heroku.com/)
* [Git](https://git-scm.com/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Mongoose](https://mongoosejs.com/)
* [dotenv](https://www.npmjs.com/package/dotenv)

## 👨‍💻 Getting Started
以下照著範例做，可以讓你在本地端 run 此專案

1. Clone the Repo
  ```sh
    git clone git@github.com:Hazelwu2/posts-mongoose-week2.git
  ```
2. Install NPM packages
  ```
  cd posts-mongoose-week2
  npm install
  ```
3. Setup .env to connect DB
  ```
  cp .env.example .env
  設定 .env 參數 DB_URL, DB_PASSWORD，遠端資料庫使用 MongoDB Atlas
  ```

3. Start Runing Server
  ```
  npm run dev
  ```
4. Deploy to heroku
  ```
  herku create posts-mongoose-week2
  git push heroku main
  ```
5. Setting Heroku Variable
  ```
  Project/Settings
  Config Vars Add "DB_URL", "DB_PASSWORD"
  ```
6. DEBUG in Heroku
  ```
  heroku logs --tail
  ```


## 📕 Mongoose CRUD Syntax
- 新增：Model.create()
- 刪除：Model.findByIdAndDelete()
- 更新：Model.findByIdAndUpdate()
- 查詢：Model.find()
