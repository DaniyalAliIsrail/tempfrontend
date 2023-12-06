const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const router = require("./routes");
const app = express();
const PORT = 7000;
const cloudinary = require("cloudinary").v2;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

const DB_URI = `mongodb+srv://daniyalali12568:smit_final@cluster0.6xfzfev.mongodb.net/smit_final?retryWrites=true&w=majority`;
mongoose.connect(DB_URI);
mongoose.connection.on("connected", () =>
  console.log("My MongoDB Is Connected")
);

mongoose.connection.on("error", (err) => console.log("Error In MongoDb", err));


cloudinary.config({
  cloud_name: 'dih6gzzhk',
  api_key: '553388149965484',
  api_secret: '0umYW6KOYp9ZO4_1ZteptavElNY'
});

app.get("/", (req, res) => {
  res.json({
    message: "server up",
  });
});

app.listen(PORT, () => {
  console.log(`Server Is Running On localhost:${PORT}`);
});
