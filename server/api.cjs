const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const connectionString = "mongodb://127.0.0.1:27017";
const cors = require("cors");
const app = express();

//These 3 steps mandatory for Post, put and delete methods
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//req -- to request data from client - get somthing from client
//res -- if you want to send somthing to client then use response
app.get("/categories", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    let database = clientObject.db("video-tutorial");

    database
      .collection("categories")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);

        res.end();
      });
  });
});

app.get("/admin", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    let database = clientObject.db("video-tutorial");

    database
      .collection("admin")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);

        res.end();
      });
  });
});

app.get("/videos", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    let database = clientObject.db("video-tutorial");

    database
      .collection("videos")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);

        res.end();
      });
  });
});

app.get("/users", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    let database = clientObject.db("video-tutorial");

    database
      .collection("users")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/video/:id", (req, res) => {
  let id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    let database = clientObject.db("video-tutorial");

    database
      .collection("videos")
      .findOne({ video_id: id })
      .then((document) => {
        res.send(document);
        res.end();
      });
  });
});

app.post("/add-video", (req, res) => {
  var video = {
    video_id: parseInt(req.body.video_id),
    title: req.body.title,
    desciption: req.body.desciption,
    Likes: parseInt(req.body.Likes),
  };

  mongoClient.connect(connectionString).then((clientObject) => {
    let database = clientObject.db("video-tutorial");
    database
      .collection("videos")
      .insertOne(video)
      .then(() => {
        console.log("Video inserted");
        res.end();
      });
  });
});

app.post("/register-user", (req, res) => {
  var userObj = {
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    password: req.body.password,
    email: req.body.email,
  };

  mongoClient.connect(connectionString).then((clientObject) => {
    let database = clientObject.db("video-tutorial");
    database
      .collection("users")
      .insertOne(userObj)
      .then(() => {
        console.log("User inserted");
        res.end();
      });
  });
});

app.put("/edit-video/:id", (req, res) => {
  var id = parseInt(req.params.id);
  var video = {
    video_id: parseInt(req.body.video_id),
    title: req.body.title,
    desciption: req.body.desciption,
    Likes: parseInt(req.body.Likes),
  };

  mongoClient.connect(connectionString).then((clientObject) => {
    let database = clientObject.db("video-tutorial");
    database
      .collection("videos")
      .updateOne({ video_id: id }, { $set: video })
      .then(() => {
        console.log("Video edited");
        res.end();
      });
  });
});

app.delete("/delete-video/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    let database = clientObject.db("video-tutorial");
    database
      .collection("videos")
      .deleteOne({ video_id: id })
      .then(() => {
        console.log("Video deleted");
        res.end();
      });
  });
});

app.listen(4000);
console.log("server started :  http://localhost:4000");
