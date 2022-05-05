const express = require('express');
const router = express.Router();

const collegeController = require("../Controller/collegeController")
const internController = require("../Controller/internController")
// const authentication = require("../middlewares/authentication")
// const authorisation = require("../middlewares/authorisation")

//*!---APIs To Perform CURD Operation--------

router.post("/functionup/colleges",collegeController.createCollege)

router.post("/functionup/interns",internController.createInten)

router.get("/functionup/collegeDetails",collegeController.GetCollegeDetails)



 module.exports=router

 