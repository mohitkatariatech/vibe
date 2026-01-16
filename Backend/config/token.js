import jwt from "jsonwebtoken"

const genToken = (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "10y" })
        return token
    } catch (error) {
        // throw so caller can handle
        throw new Error(`gen token error ${error.message || error}`);
    }
}
export default genToken
