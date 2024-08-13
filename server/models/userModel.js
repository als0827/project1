import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

//db connection // MariaDB 연결 드라이버를 통해 서버의 DBMS 데이터 접근
const pool = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    connectionLimit: 5
    });

// arrow function
const getAllUsers = async () => {
    let conn; // 연결설정 변수(연결POOL)
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users");
        return rows;
    } catch(err) {
        console.log(err);
        return conn.end();
    } finally {
        if(conn) conn.end();

    }
}
// 객체(Object): 변수(문자열, 숫자, 논리), 함수, 클래스, 심볼....
const userModel = {
    getAllUsers
}

export default userModel;