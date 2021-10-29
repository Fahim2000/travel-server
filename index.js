const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient } = require("mongodb");

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ezfbm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("Tourism_Database");
    const allToursCollection = database.collection("allToursCollection");

    app.get("/allTours", async (req, res) => {
      const cursor = allToursCollection.find({});
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    //   await client.close()
  }
}

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("This is Home server.");
});

app.listen(port, () => console.log(`Server is listening on Port `, port));
