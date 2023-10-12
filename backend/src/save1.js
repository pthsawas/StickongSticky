const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.json());

app.post("/save-image", (req, res) => {
  const imageData = req.body.image;
  // Here, you can save the image data to a file.
  fs.writeFile("saved-image.png", imageData, "base64", (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving image" });
    } else {
      res.json({ message: "Image saved on the server" });
    }
  });
});

app.get("/get-image", (req, res) => {
  // Here, you should send the saved image to the client.
  fs.readFile("saved-image.png", "base64", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error loading image" });
    } else {
      res.send(data);
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});