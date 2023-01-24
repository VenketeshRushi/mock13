const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db");
const { userRouter, jobRouter } = require("./routes/allroutes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/job", jobRouter);

app.listen(8080, async () => {
  try {
    await dbConnect();
    console.log(`listening on http://localhost:8080`);
  } catch (error) {
    console.log(error.message);
  }
});
