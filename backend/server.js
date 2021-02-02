import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import Messages from "./dbMessages.js";
import cors from 'cors'

const app = express();

app.use(express.json());

// add cors
app.use(cors())

// configure pusher
const pusher = new Pusher({
  appId: "1148420",
  key: "f0cfbf8551983c35ad8f",
  secret: "4755258a101735e79229",
  cluster: "eu",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "insert") {
      const messageDetatails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetatails.name,
        message: messageDetatails.message,
      });
    } else {
      console.log("pusher trigger error");
    }
  });
});

//connect to db
mongoose
  .connect(
    "mongodb+srv://sam:thCg2vlIWhUuFdBt@cluster0.juvkw.mongodb.net/whatsapp-mean?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB Connected"));

app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.get("/messages", async (req, res, next) => {
  try {
    const message = await Messages.find({});

    res.status(200).json(message);
  } catch (error) {
    console.log(error.message);
    console.log(error);
  }
});

app.post("/messages/new", async (req, res) => {
  try {
    const message = await Messages.create(req.body);

    res.status(201).json(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const PORT = process.env.PORT || 9000;

// listen to the server
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
