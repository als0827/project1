import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt"

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

const getOneUser = async (userId) => {
    let conn; // 연결설정 변수(연결POOL)
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users WHERE id=?", [userId]);
        return rows;
    } catch(err) {
        console.log(err);
        return conn.end();
    } finally {
        if(conn) conn.end();

    }
}

const addUser = async (id, pwd, name, nick, email, hint) => {
    let conn; // 연결설정 변수(연결POOL)
    const saltRounds = 10;
    const hashedPwd = await bcrypt.hash(pwd, saltRounds); // 해싱된 비밀번호 생성
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("INSERT INTO users (id, pwd, name, nickname, email, pwd_hint) VALUES (?,?,?,?,?,?)", [id, hashedPwd, name, nick, email, hint]);
        return rows;
    } catch(err) {
        console.log(err);
        return conn.end();
    } finally {
        if(conn) conn.end(); // 또는 release() : 연결 해제 vs end() : 연결(POOL)중단 // pool 자체 종료 --> 시간, 네트워크 --> 개발비용 증가

    }
}
// 객체(Object): 변수(문자열, 숫자, 논리), 함수, 클래스, 심볼....
const userModel = {
    getAllUsers,
    getOneUser,
    addUser
}

export default userModel;