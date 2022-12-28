const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zlgr27w.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const messageCollection = client
      .db("yozzby")
      .collection("messageCollection");

    app.get("/messageCollection", async (req, res) => {
      const query = {};
      const users = await usersCollection.find(query).toArray();
      res.send(users);
    });
    //   user posted text
    app.post("/messageCollection", async (req, res) => {
      const text = req.body;
      const result = await messageCollection.insertOne(text);
      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));
// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// require("dotenv").config();
// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Yozzby server is running");
});
app.listen(port, () => {
  console.log(`YoZZbY server is running port,${port}`);
});
