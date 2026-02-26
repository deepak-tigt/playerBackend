import dotenv from "dotenv"
dotenv.config()
import express from "express"
import {createServer} from "http"
import { initSocket } from "./src/config/socket.js"
import authRoutes from "./src/routes/auth.routes.js"
import errorHandler from "./src/middleware/errorHandler.js"
import administrationRoutes from "./src/routes/administration.routes.js"
import gameCategoryRoutes from "./src/routes/gameCategory.routes.js"
import gameRoutes from "./src/routes/game.routes.js"
import stripeRoutes from "./src/routes/stripe.routes.js"
import googleAuthRoutes from "./src/routes/googleAuth.routes.js"
import client from "./src/libs/connection/redis.js" 
import exportUserRoutes from "./src/routes/exportUserCsv.routes.js"
import startCron from "./src/libs/crons/bonusCron.js"
import bonusWorker from "./src/libs/worker/bonusWorker.js"

const app = express()

// creating http server 
const server = createServer(app)
 
// initializing socket.io 
export const io = initSocket(server)

app.use(express.static("src/views"))

startCron();
const PORT=process.env.PORT || 3000;

// app.use(express.json())

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString() // Only required for Stripe or similar services because it send the secure hash
  }
}))


// app.use(transactionMiddleware)

app.use('/api/v1',authRoutes);
app.use('/api/v1/',administrationRoutes);
app.use("/api/v1",gameCategoryRoutes)
app.use("/api/v1",gameRoutes)
app.use("/api/v1",exportUserRoutes)
app.use("/api/v1",stripeRoutes)
app.use("/api/v1",googleAuthRoutes)
app.use(errorHandler)

server.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is running on port ${PORT}`);
})