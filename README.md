# My Restaurants (我的餐廳清單)
![Restaurant List](./public/restaurant-list.png)
這是一個使用 Node.js + Express 打造的餐廳網頁，可以彙整自己喜歡的餐廳資料並且瀏覽詳細資訊。

## Features
- 使用者可以註冊帳號或使用 Facebook Login 方式登入
- 使用者登入後，可以建立並管理專屬的餐廳清單
- 使用者可以瀏覽所有的餐廳列表
- 使用者可以看到餐廳的照片、名稱、分類及評分
- 使用者可以點擊餐廳取得更詳細的資訊（地址、電話、描述、Google 地圖）
- 使用者可以使用中文、英文名稱及類別關鍵字搜尋特定餐廳
- 使用者可以新增餐廳清單
- 使用者可以編輯特定的餐廳資料
- 使用者可以刪除特定的餐廳清單

## Prerequisites
- Node.js 16.15.1
- Express 4.17.1
- Express-Handlebars 4.0.2
- Bootstrap 4.6.2
- Font-awesome 5.8.1
- mongoose 5.13.14
- MongoDB

## Installing
1. 打開終端機（terminal）並 Clone 專案至本機

```
$ git clone https://github.com/darrenjon/restaurant_list.git
```

2. 進入存放此專案的資料夾

```
$ cd restaurant_list
```

3. 安裝 npm 及專案所需套件(dependencies)

```
$ npm install
```

4. 依照.env.example 設定環境變數，並建立.env 檔

```
$ mkdir .env
```

5. 建立種子資料到資料庫中

```
$ npm run seed
```

6. 啟動伺服器

```
$ npm run dev
```

7. 當 terminal 出現以下字樣，表示伺服器已啟動完成

`The server is running on http://localhost:3000`
`mongodb connected!`

8. 打開瀏覽器網址列輸入 http://localhost:3000/
可以看到本專案的網頁呈現
