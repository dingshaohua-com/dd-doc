import jwt from "jsonwebtoken";

const userMount = async (ctx, next) => {
    if (ctx.header?.authorization) {
        const token = ctx.header.authorization.replace('Bearer ', '');
        try {
            ctx.state.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error('Token 解析失败:', err);
        }
    }
    await next();
}
export default userMount;