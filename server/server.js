import express from "express";
import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PWD);

//const mariadb = require('mariadb');//커몬방식 요새 잘 안쓴다

const app = express()

// route : .get(): 받기, .post(): 보내기, .put(): 보내서 부분 수정, .delete() : 보내서 삭제
// RESTful API : REpresentational (대표성 있는 방식으로 요청 URL을 생성하는 규칙)
app.get('/', function (req, res) {
  res.send('Hello World')
})

// MariaDB 연결 드라이버를 통해 서버의 DBMS 데이터 접근
const pool = mariadb.createPool({
host: process.env.DB_HOST, 
user: process.env.DB_USER, 
password: process.env.DB_PWD,
connectionLimit: 5
});

app.get('/getAllUsers', function (req, res) {
  pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT 1 as val")
        .then((rows) => {
          console.log(rows); //[ {val: 1}, meta: ... ]
          //Table must have been created before 
          // " CREATE TABLE myTable (id int, val varchar(255)) "          
          return rows;

        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
      //not connected
    });
});


app.listen(3000)