const express=require("express");
const Listing=require("../models/listing.js");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController=require("../controllers/listings.js");

const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))//Index route
.post(isLoggedIn,validateListing, upload.single("listing[image]"),wrapAsync(listingController.createListing));//Create Route


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))//Show Route
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))//Update Route
.delete(isLoggedIn,wrapAsync(listingController.destroyListing)); //Delete Route

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports=router;
