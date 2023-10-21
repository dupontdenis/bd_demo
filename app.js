const axios = require("axios");
const mongoose = require("mongoose");
const connectDB = require("./conf/bdConnect");
const Person = require("./model/pers");

require("dotenv").config();

main().catch((err) => console.log(" Huston, we have a pb ! " + err));

async function main() {
  // Connect to MongoDB
  connectDB();

  async function create() {
    const query = await axios.get("https://randomuser.me/api/?results=1");
    const my = new Person({ name: query.data.results[0].name.last });
    // const my = new Person({ name: "buzzleclair" });
    return await my.save();
  }

  const newPers = await create();
  console.log(`create: ${newPers}`);

  async function readAll() {
    return await Person.find();
  }

  const pers = await readAll();
  console.log(`People: ${pers}`);

  mongoose.connection.close();
}

// mongoose.connection.once("open", () => {
//   console.log("Connected to MongoDB");
//   //app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
