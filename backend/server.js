import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 4000

// ==========================
// ✅ Kết nối MongoDB LOCAL trước
// ==========================
connectDB()

// ==========================
// ✅ Kết nối Cloudinary
// ==========================
connectCloudinary()

// ==========================
// Middleware
// ==========================
app.use(express.json())
app.use(cors())

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Test upload form
app.get('/test-upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'test-upload.html'))
})

// ==========================
// Routes
// ==========================
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send('API working')
})

// ==========================
// Khởi động server
// ==========================
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`)
})
