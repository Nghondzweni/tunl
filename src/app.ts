import express from "express";
import log from "./logger/index";
import connect from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware/deserializeUser";

// configure environment variables
require("dotenv").config();

const JSONSyntaxErr =  require('json-syntax-error')

//Environment Variables
const port = Number(process.env.PORT) as number;
const host = process.env.HOST as string;

const app = express();

// App Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(deserializeUser);
app.use(JSONSyntaxErr());

app.listen(port, () => {
  log.info(`Server listening on port:${port}`);

  connect();
  routes(app);
});
