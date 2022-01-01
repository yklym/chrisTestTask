import Express from "express";
import userRouter from "./routes/user.route";
import cors from "cors";

const app = Express();

app.use(Express.json());
app.use(cors());

app.use("/userFormData", userRouter);
const port = 8080;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
