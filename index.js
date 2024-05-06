const express = require("express");

const app = express();

const fs = require("fs");

app.get("/file/:filename", (req, res) => {
  const fname = req.params.filename;
  const filePath = __dirname + "/" + fname;

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("File not found");
  }
});

app.post("/file/:filename", (req, res) => {
  const fname = req.params.filename;
  const filePath = __dirname + "/" + fname;
  const data = "Hello, saurav";
  if (fs.existsSync(filePath)) {
    res.send("file already exits");
  } else {
    fs.writeFile(fname, data, { flag: "w" }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data appended to file");
      res.send(`Data appended to file, ${fname}`);
    });
  }
});

app.put("/file/:filename", (req, res) => {
  const fname = req.params.filename;
  const filePath = __dirname + "/" + fname;
  const data =
    "This is for the new file which does not exist so it creates a new file and enteres in it";

  if (fs.existsSync(filePath)) {
    fs.writeFile(fname, data, { flag: "a+" }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data appended to file");
      res.send(`File already exists so, Data appended to file, ${fname}`);
    });
  } else {
    fs.writeFile(fname, data, { flag: "w" }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data appended to file");
      res.send(`Data appended to file, ${fname}`);
    });
  }
});

app.delete("/file/:filename", (req, res) => {
  const fname = req.params.filename;
  const filePath = __dirname + "/" + fname;

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting file");
      return;
    }
    console.log("File deleted");
    res.send(`File deleted: ${fname}`);
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
