import jwt from "jsonwebtoken";

// 生成唯一令牌
const genToken = (payload) => {
    const params = { expiresIn: '1h' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, params);
    return token;
}

export default genToken;