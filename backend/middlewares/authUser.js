import jwt from 'jsonwebtoken'

// middleware kiểm tra xác thực người dùng
const authUser = async (req, res, next) => {
    try {
        const token = req.headers.token || req.headers.utoken // xử lý cả token và utoken nếu cần

        console.log('authUser - All headers:', req.headers);
        console.log('authUser - Token received:', token);

        if (!token) {
            return res.status(401).json({ success: false, message: "Bạn chưa đăng nhập" })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (!decoded?.id) {
                return res.status(401).json({ success: false, message: "Token không hợp lệ" })
            }

            req.userId = decoded.id
            next()
        } catch (jwtError) {
            console.log("JWT verification failed:", jwtError.message);
            // Token hết hạn hoặc không hợp lệ
            return res.status(401).json({ success: false, message: "Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại." })
        }

    } catch (error) {
        console.log("Lỗi authUser:", error)
        res.status(401).json({ success: false, message: "Xác thực thất bại" })
    }
}

export default authUser
