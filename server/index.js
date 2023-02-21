const express = require("express");
const bodyPaser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

const app = express();
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//get data
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json(result);
    }
  });
});

// insert data
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);";

  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Values inserted");
    }
  });
});

//delete movie

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
  db.query(sqlDelete, [id], (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Values inserted");
    }
  });
});

// update movie
app.put("/api/update/:id", (req, res) => {
  const id = req.params.id;
  const movieReview = req.body.movieReview;
  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?";
  db.query(sqlUpdate, [movieReview, id], (err) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Values inserted");
    }
  });
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
