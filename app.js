const express = require("express");
const connectDB = require("./connect/connectDB");
require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const port2 = process.env.PORT || 5000;
const io = require("socket.io")(port2, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
const Router = require("./router/User");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", Router);

app.get("/", (req, res) => {
  res.json({ listening: "true" });
});

const port = process.env.PORT_2 || 3000;

app.listen(port, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("listening...");
  } catch (error) {
    console.log(error);
  }
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  console.log(id);
  socket.on("send-message", ({ sender, text }) => {
    socket.to(sender).emit("receive-message", { text, id });
  });
});
