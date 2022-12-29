const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const myAbout = client.db("yozzby").collection("about");

    // get message
    app.get("/messageCollection", async (req, res) => {
      const query = {};
      const messages = await messageCollection.find(query).toArray();
      res.send(messages);
    });
    // get about me
    app.get("/about", async (req, res) => {
      const query = {};
      const result = await myAbout.find(query).toArray();
      // console.log(result);
      res.send(result);
    });

    // messageDetails api sending by id

    app.get("/messageDetails/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await messageCollection.findOne(query);
      res.send(result);
    });
    //   user posted text
    app.post("/messageCollection", async (req, res) => {
      const text = req.body;
      const result = await messageCollection.insertOne(text);
      res.send(result);
    });

    // updating about section

    app.put("/about/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const user = req.body;
      const option = { upsert: true };
      const updatedDoc = {
        $set: {
          name: user.name,
          email: user.email,
          university: user.university,
          address: user.address,
        },
      };
      // console.log(updatedDoc);
      const result = await myAbout.updateOne(filter, updatedDoc, option);
      res.send(result);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get("/", async (req, res) => {
  res.send("Yozzby server is running");
});
app.listen(port, () => {
  console.log(`YoZZbY server is running port,${port}`);
});
