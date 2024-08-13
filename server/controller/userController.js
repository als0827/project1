import userModel from "../models/userModel.js"

const getAllusers = async (req, res) => {
    try {
        const users = await userModel.getAllusers(); // 사용자 정보를 모두 조회해서 users 변수에 담아
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "db connection is failed",
            message: "데이터베이스 연결이 실패했습니다."
        })
    }
}
// Object(객체) : 여러가지 변수, 값, 함수, 객체, 클래스,..포함할 수 있는 자바스크립트 데이터 타입
const userController = {
    getAllusers
}

export default userController;