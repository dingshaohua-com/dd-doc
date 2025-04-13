import docBelongUser from '../utils/doc-belong-user.ts'

const checkDocOwnership = async (ctx, next) => {
    const userId = Number(ctx.state.user.id)
    const docId = Number(ctx.query.id)
    try {
        await docBelongUser(docId, userId)
        await next()
    } catch (e) {
        ctx.status = e.status;
        ctx.body = {
            msg: e.message
        }
    }
}
export default checkDocOwnership;