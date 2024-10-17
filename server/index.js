import express from "express";
import cors from "cors";

import env from "dotenv";
import pool from "./database.js";

env.config();

//const pool = require("./database.js");
const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "DELETE"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
const port = process.env.PORT;

//app.use(cors(corsOptions)); //middleware
app.use(express.json());
// app.get("/", async (req, res) => {
//   const result = await pool.query("SELECT * FROM notes");
//   if (result) {
//     console.log("Existing notes loaded from db");
//   }
//   res.send(result.rows);
// });

app.get("/getnotes", async (req, res) => {
  console.log("<------------------------>");
  console.log("Get route activated");

  const result = await pool.query("SELECT * FROM notes");
  if (result) {
    console.log("Existing notes loaded from db");
  }
  res.json(result.rows);
});

app.post("/addnote", async (req, res) => {
  console.log("<------------------------>");
  console.log("Post route activated");

  const title = req.body.title;
  const content = req.body.content;

  const result = await pool.query(
    `INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING id`,
    [title, content]
  );
  const idReturn = result.rows[0].id;
  console.log("Returning id " + result.rows[0].id);

  if (result) {
    console.log("Note added to database");
  }
  res.json(idReturn);
});

app.delete("/deletenote", async (req, res) => {
  console.log("<------------------------>");
  console.log("Delete route activated");
  const id = req.body.deleteid;

  const result = await pool.query(`DELETE FROM notes WHERE id = $1`, [id]);
  console.log(result);
  if (result) {
    console.log("Note successfully deleted");
  }
  res.json({ message: "Note Successfully Deleted with id: ", id });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}, http://localhost:${port}`);
});
