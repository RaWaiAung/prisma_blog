import express, { Request, Response } from 'express';
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./src/routes";
import AppError from "./src/utilities/appError";
import globalHandler from "./src/utilities/errorController";

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

// parse application/json

const PORT = process.env.PORT || 3000;

app.get('/test', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.all('*', (req: Request,res: Response,next) => {
 return next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalHandler);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
