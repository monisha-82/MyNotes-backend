import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) =>{
    console.log(err)
})

const app = express()

// To make input as json
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: ["https://mynotes-panda.netlify.app"], credentials: true}))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is running")
})

// Import routes
import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"

app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)

// Error Hnadling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
