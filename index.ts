import * as dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { handleError } from "./utils/errors";
import { BookRouter } from "./routers/book.router";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(json());
app.use("/books", BookRouter);

app.use(handleError);

app.listen(3001, "0.0.0.0", () => {
  console.log("listening on port http://localhost:3001");
});
