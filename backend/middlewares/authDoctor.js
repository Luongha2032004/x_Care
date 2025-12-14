import jwt from 'jsonwebtoken';

const authDoctor = async (req, res, next) => {
    try {
        console.log('authDoctor - All headers:', req.headers);
        
        let dToken = req.headers['dtoken'];
        
        // Nếu không có dtoken, thử lấy từ custom header 'dToken' hoặc Authorization
        if (!dToken) {
            dToken = req.headers['dToken'] || req.headers['authorization']?.split(' ')[1];
        }
        
        console.log('authDoctor - Found dToken:', dToken ? 'Yes' : 'No');
        
        if (!dToken) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }

        const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);
        req.docId = token_decode.id;

        next();
    } catch (error) {
        console.log('authDoctor error:', error);
        res.status(401).json({ success: false, message: error.message });
    }
}

export default authDoctor;