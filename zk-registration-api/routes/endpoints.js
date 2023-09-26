const router = require("express").Router();

const registerStudent = require("../controllers/studentRegister");
const verifiedStudent = require("../controllers/verified");
const verifiedUniversity = require("../controllers/verify_university");
const approve = require("../controllers/approve");
const walletaddress = require("../controllers/Getwallet");
const getall = require("../controllers/Getall");
const notverified = require("../controllers/notverified");
const createClaim = require("../controllers/createClaim");
// const auth = require("../controllers/Login");




router.post("/studentRegister",registerStudent.studentRegister);
router.post("/verified",verifiedStudent.verified);
router.post("/university",verifiedUniversity.university);
router.post("/approve",approve.approve);
router.post("/walletaddress",walletaddress.walletaddress);
router.post("/getall",getall.getall);
router.post("/notverified",notverified.notverified);
router.post("/createClaim",createClaim.createClaim);
// router.post("/login",auth.auth);


module.exports = router;