const db = require("./config/database");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  const query = `
    SELECT * FROM Note
    ORDER BY id;
    `;
  const { rows } = await db.query(query);
  res.render("index", { item: rows });
});

app.listen(3000, () => {
  console.log("At port 3000");
});

const create = require("./routes/create");

app.use("/create", create);

const read = require("./routes/read");
app.use("/read", read);

const update = require("./routes/update");
app.use("/update", update);

const del = require("./routes/delete");
app.use("/delete", del);