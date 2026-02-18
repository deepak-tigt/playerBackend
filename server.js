import dotenv from "dotenv"
dotenv.config()
import express from "express"
import authRoutes from "./src/routes/auth.routes.js"
import errorHandler from "./src/middleware/errorHandler.js"
import administrationRoutes from "./src/routes/administration.routes.js"
import gameCategoryRoutes from "./src/routes/gameCategory.routes.js"
import gameRoutes from "./src/routes/game.routes.js"
import client from "./src/libs/redis.js" 
import exportUserRoutes from "./src/routes/exportUserCsv.routes.js"
import startCron from "./src/libs/cron.js"
import bonusWorker from "./src/libs/worker/bonusWorker.js"

const app = express()

startCron();
const PORT=process.env.PORT || 3000;

app.use(express.json())
// app.use(transactionMiddleware)

app.use('/api/v1',authRoutes);
app.use('/api/v1/',administrationRoutes);
app.use("/api/v1",gameCategoryRoutes)
app.use("/api/v1",gameRoutes)
app.use("/api/v1",exportUserRoutes)
app.use(errorHandler)

app.listen(PORT,"0.0.0.0",()=>{
    console.log(`server is running on port ${PORT}`);
})