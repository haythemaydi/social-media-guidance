const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/DB");
const userRouter = require("./router/useRouter");
const eventRouter = require("./router/blogRoutes");
const postRouter = require("./router/postRouter");
const conversationRouter = require("./router/conversationRoute");
const MessageRouter = require("./router/messageRouter");
db();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/blog", eventRouter);
app.use("/post", postRouter);
app.use("/conversation", conversationRouter);
app.use("/message", MessageRouter);
app.listen(5000, () => {
  console.log("server run in port 5000");
});
