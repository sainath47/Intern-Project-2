const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const isValid = mongoose.Types.ObjectId.isValid;

//===================POST/CREATE-COLLEGE=======

const createCollege = async function (req, res) {
  try {
    //*Empty body validation

    const data = req.body;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Invalid request, Please provide College details",
      });
    }

    //*Extracts data from body

    const name = req.body.name;
    const fullName = req.body.fullName;
    const logoLink = req.body.logoLink;
    const isDeleted = req.body.isDeleted;

    //*Body Validation

    if (!name)
      return res
        .status(400)
        .send({ status: false, msg: "Firstname is required" });
    if (!fullName)
      return res
        .status(400)
        .send({ status: false, msg: "fullNname is required" });
    if (!logoLink)
      return res
        .status(400)
        .send({ status: false, msg: "logoLink is required" });

        let duplicateData = await collegeModel.findOne({name:name})
        if(duplicateData) return res.status(400).send({status:false,msg:"college already created with this name"})

    let createCollege = await collegeModel.create(data);

    
    const result = {name,fullName,logoLink,isDeleted:createCollege.isDeleted}

    // console.log(createCollege)
    // let collegeCreated = await collegeModel.findOne(createCollege._id).select({name:1,fullName:1,logoLink:1,isDeleted:1,_id:0})
    res.status(201).send({ status: true, data: result });
  } catch (err) {
    res.status(500).send({ msg: "server error", error: err.message });
  }
};

//=================*Get College Details===============

const GetCollegeDetails = async function (req, res) {
  try {
    let collegeName = req.query.collegeName;
    if (!collegeName)
      return res.status(400).send({ msg: "college name required" });
    let college = await collegeModel.findOne({ name: collegeName });
    if (!college)
      return res
        .status(404)
        .send({ msg: "no such college is registered with us" });
   
    if (college.isDeleted == true) {
      res.status().send({ msg: "deleted college details" });
    }



 

    let allData = await internModel
      .find({
        isDeleted: false,
        collegeName: collegeName.name,
      })
      .select({ name: 1, email: 1, mobile: 1 });



    college["interests"] = allData;

   

    const {name,fullName,logoLink,isDeleted} = college
    const result= {name,fullName,logoLink,isDeleted,interests:allData}




    res.status(200).send({ status: true, msg: result });
  } catch (err) {
    res
      .status(500)
      .send({ status: false, msg: "server Error", err: err.message });
  }
};

module.exports.createCollege = createCollege;
module.exports.GetCollegeDetails = GetCollegeDetails;
