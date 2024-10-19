import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import OTProuter from './routes/otprouter.js'
import mOTProuter from './routes/motprouter.js'
import userRouter from './routes/userrouter.js'
import jobRouter from './routes/jobrouter.js'

app.use('/api/v1/otp', OTProuter)
app.use('/api/v1/motp',mOTProuter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/jobs',jobRouter)


export {app}

