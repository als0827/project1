import userModel from "../models/userModel.js"

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers(); // 사용자 정보를 모두 조회해서 users 변수에 담아
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "db connection is failed",
            message: "데이터베이스 연결이 실패했습니다."
        })
    }
}

const getOneUser = async (req, res) => {
    // localhost:3000/getOneUser/유저ID
    const id = parseInt(req.params.id);
    try {
        const users = await userModel.getOneUsers(id); // 사용자 정보를 모두 조회해서 users 변수에 담아
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "db connection is failed",
            message: "데이터베이스 연결이 실패했습니다."
        })
    }
}

const addUser = async (req, res) => {
    //post 요청 : FORM(HTML5) or AJAX로만 요청가능
    const {id, pwd, name, nick, email, hint} = req.body;
    try {
        const users = await userModel.addUser(id, pwd, name, nick, email, hint); // 사용자 정보를 모두 조회해서 users 변수에 담아
        if (users) {
            res.status(200).json({
                status: 'success',
                message: "사용자 등록 성공!"
            });
        } else {
            res.status(500).json({
                status: 'fail',
                message: "사용자 등록 실패!"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            code: 501,
            status: false,
            message: "데이터베이스 연결 실패."
        })
    }
}
// Object(객체) : 여러가지 변수, 값, 함수, 객체, 클래스,..포함할 수 있는 자바스크립트 데이터 타입
const userController = {
    getAllUsers,
    getOneUser,
    addUser
}

export default userController;