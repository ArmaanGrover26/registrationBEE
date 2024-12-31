const fs = require("fs");
const express = require("express");
const port = 7777;

const app = express();

app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/submit", (req, res) => {
  const formData = req.body;
  fs.readFile("data.json", "utf8", (err, data) => {
    const jsonData = data ? JSON.parse(data) : [];
    jsonData.push(formData);
    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), () => {
      res.send("New User Created");
    });
  });
});
