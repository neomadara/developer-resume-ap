import express, {Express, NextFunction, Response, Request} from "express";
import healthRoute from './src/health/router.health'
import resumeRoute from './src/resume/router'
import userRoute from './src/user/router'
import * as mongoose from "mongoose";
import Logger from "./src/utils/logger";
import cors from "cors"
import resError from "./src/utils/resError";
import config from "./config";

const MONGODB_URI = config.MONGODB_URI;
const PORT = config.PORT;

const app: Express = express()

app.use(express.json());
app.use(cors());
app.use(healthRoute);
app.use(resumeRoute)
app.use(userRoute)

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  resError(res, err.statusCode, err.message);
})

const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    Logger.info('Connected to MongoDB:::Successfully');
  } catch (error) {
    Logger.error(`Connected to MongoDB:::Error ${error}`);
    process.exit(1);
  }
};

export const startServer = async () => {
  if (process.env.NODE_ENV !== 'test') {
    await connectToMongo();
  }

  app.listen(PORT, () => Logger.info(`Server started on port ${PORT}`));
};

export default app
