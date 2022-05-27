
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
第四週、第五週六角學院 Nodejs 主線任務，打造全端 (Full Stack) 網站架構，前後端分離開發。
- [後端Repo](https://github.com/Hazelwu2/week4-nodejs.git)
- [前端 React + Typescript + Axios](https://github.com/Hazelwu2/week4-nodejs-frontend.git)
- [線上Demo](https://week4-nodejs-frontend.vercel.app/)
- [Week6 Postman 所有API](https://github.com/Hazelwu2/week4-nodejs-backend/blob/main/wee4-all-api.json)
- [Postman 匯入環境變數](https://github.com/Hazelwu2/week4-nodejs-backend/blob/main/Heroku-week4.postman_environment.json)
- [Week7 Postman 所有API](https://github.com/Hazelwu2/week4-nodejs-backend/blob/main/week7.json)

### Week4
等級表
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

### Week5
- 請設計一個 middleware，讓 controller 程式碼裡面沒有 try catch
- 請透過環境變數執行指令加上 dev、production 的客製化回饋
- 承第二點，請觀看此張圖，確保你的後端語言有客製化各種錯誤狀態，包含 NPM 的錯誤訊息客製化
- 請透過 node.js uncaughtException、unhandledRejection 來捕捉預期外的錯誤


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

### Week7
- 介接 Imgur 第三方圖床服務，教學文件
- 設計一個 /upload 路由，來設計上傳圖片功能，後端得驗證是否符合 2mb 限制、格式支援 jpg、png
- 需通過 isAuth 登入驗證 middleware 才可上傳

### Week8
#### 主線任務
請設計 17 隻 API，請使用 POSTMAN collecion 透過資料夾來分類。
若有額外新增 API，請於任務內容分享，並告知想看哪 5 支 API。

會員功能
- [POST]註冊會員：{url}/user/sign_up
- [POST]登入會員：{url}/users/sign_in
- [PATCH]重設密碼：{url}/users/updatePassword
- [GET]取得個人資料：{url}/users/profile
- [PATCH]更新個人資料：{url}/users/profile

會員按讚追蹤動態
- [POST]追蹤朋友：{url}/users/{userID}/follow
- [DELETE]取消追蹤朋友：{url}/users/{userID}/unfollow
- [GET]取得個人按讚列表：{url}/users/getLikeList
- [GET]取得個人追蹤名單：{url}/users/following

動態貼文
- [GET]取得所有貼文：{url}/posts
- [GET]取得單一貼文：{url}/posts/{postID}
- [POST]新增貼文：{url}/posts
- [POST]新增一則貼文的讚：{url}/posts/{postID}/like
- [DELETE]取消一則貼文的讚：{url}/posts/{postID}/unlike
- [POST]新增一則貼文的留言：{url}/posts/{postID}/comment
- [GET]取得個人所有貼文列表：{url}/post/user/{userID}
其他
- [POST]上傳圖片：{url}/upload

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
