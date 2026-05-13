const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

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

// app.get("/testListing", async (req, res) => {
//   let sample = new Listing({
//     tital: "My new villa",
//     description: "By this villa",
//     price: 12300,
//     location: "Calangute Goa",
//     country: "India",
//   });

//   await sample.save();
//   console.log("data saved");
// });

// Index route

app.get("/listings", async (req, res) => {
  let allListings = await Listing.find({});

  res.render("listings/index.ejs", { allListings });
});

// New route

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show route

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  res.render("listings/show.ejs", { listing });
});

// Create

app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();

  res.redirect("/listings");
});

// Edit route

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  res.render("listings/edit.ejs", { listing });
});

// Update route

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body.listing);

  res.redirect(`/listings/${id}`);
});

// Delete route

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;

  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.listen(port, () => {
  console.log(`Service is listning at port ${port}`);
});
