import express, { Request, Response } from 'express';
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./src/routes";
import AppError from "./src/utilities/appError";
import globalHandler from "./src/utilities/errorController";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", routes);

// parse application/json


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
