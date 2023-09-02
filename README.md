## Simple Twitter

利用 React 製作一個與 Twitter 相似的社交平台，使用者進入後可以註冊、登入、發佈貼文及與他人互動

## 專案功能

- 前台

  - 可以從登入頁登入後進到首頁
  - 可以透過註冊頁註冊自己的帳號
  - 在首頁可以瀏覽全部推文及發表自己的推文
  - 可以瀏覽使用者的推文/回覆/喜歡的內容
  - 可以對其他使用者進行跟隨/取消跟隨
  - 可以自行修改個人資料及上傳照片修改頭像、背景
  - 點擊一則推文可進入此推文的單一畫面
  - 透過點擊推文下方的圖示對此推文作喜歡/回覆的動作

- 後台(admin)
  - 從後台登入頁登入(一般使用者無法登入)
  - 可以在推文清單瀏覽/刪除所有的推文
  - 可以在使用者列表查看所有的使用者詳細資料

## 專案主頁

https://u88872625.github.io/simple-twitter/

## 頁面呈現

### 1. 登入頁面

![img](https://upload.cc/i1/2023/09/02/LRrfUA.png)

### 2. 註冊頁

![img](https://upload.cc/i1/2023/09/02/NbryCP.png)

### 3. 後台登入頁

![img](https://upload.cc/i1/2023/09/02/3Gc8F6.png)

### 4. 登入後進入首頁，可觀看到全部的推文

![img](https://upload.cc/i1/2023/09/02/biOFde.png)

### 5. 個人資料頁

![img](https://upload.cc/i1/2023/09/02/ZtjbvO.png)

### 6. 帳戶設定頁

![img](https://upload.cc/i1/2023/09/02/xztSZk.png)

### 7. 發佈推文

![img](https://upload.cc/i1/2023/09/02/ZD3qRW.png)

### 8. 單一推文頁面

![img](https://upload.cc/i1/2023/09/02/bJHc6U.png)

### 9. 回覆推文

![img](https://upload.cc/i1/2023/09/02/eSMWxD.png)

### 10. 推文清單(後台)

![img](https://upload.cc/i1/2023/09/02/f15GiC.png)

### 11. 使用者列表(後台)

![img](https://upload.cc/i1/2023/09/02/yQIbln.png)

## 如何使用

1. 安裝 Node.js 及 npm
2. clone 專案到本地

3. 在本地開啟後，透過終端機進入資料夾，輸入：

```bash
npm install
```

4. 安裝完畢，繼續輸入:

```bash
npm start
```

5.  接著瀏覽器將會自動開啟 "http://localhost:3000/simple-twitter/login"
    若成功運行，則會看到底下訊息:

```bash

webpack compiled successfully
```

6. 要停止時則按 ：

```bash
ctrl + c
```

## 開發工具

- Node.js
- react: v18.2.0
- clsx: v1.2.1
- react-bootstrap: v2.8.0
- react-router-dom: v6.4.1
- sass: v1.66.1
