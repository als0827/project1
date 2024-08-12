import { fileURLToPath } from "url";   // 👈 추가

const __dirname = fileURLToPath(new URL(".", import.meta.url));   // 👈 추가
const __filename = fileURLToPath(import.meta.url);   // 👈 추가

import express from "express";
import mariadb from "mariadb";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PWD);

//const mariadb = require('mariadb');//커몬방식 요새 잘 안쓴다

const app = express()

app.use(express.json()); // json 포맷 인식
app.use(cors()); // CORS policy
// route : .get(): 받기, .post(): 보내기, .put(): 보내서 부분 수정, .delete() : 보내서 삭제
// RESTful API : REpresentational (대표성 있는 방식으로 요청 URL을 생성하는 규칙)
app.get('/', function (req, res) {
 // console.log(__dirname);
 res.sendFile(__dirname+"/public/index.html")
  // res.send('<h1>Hello World</h1>')
})

// MariaDB 연결 드라이버를 통해 서버의 DBMS 데이터 접근
const pool = mariadb.createPool({
host: process.env.DB_HOST, 
user: process.env.DB_USER, 
password: process.env.DB_PWD,
database: process.env.DB_NAME,
connectionLimit: 5
});

app.get('/getAllUsers', function (req, res) {
  pool.getConnection()
    .then(conn => {
      console.log("=============== MariaDB is connected! ==============")
      conn.query("SELECT * FROM users")
        .then((rows) => {
          res.status(200).json(rows);
          //console.log(rows);
          //res.json(rows); // res 응답객체에서 제공하는 .json() 메소드로 데이터를 전송 /응답상태 200(정상), 
          return conn.end(); //또 다른 요청에 응답하기 위해 한번 요청처리하면 접속 끊기 //요청에 따른 응답후엔 연결 해제(다른 요청처리를 위해..)
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      console.log(err); // DB 연결시 에러가 발생되면. 에러 출력
      //not connected
    });
});


app.listen(3000)