const mongoose = require("mongoose");
const intiData = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then((res) => {
    console.log("connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(intiData.data);
  console.log("Data was initalized");
};

initDb();
