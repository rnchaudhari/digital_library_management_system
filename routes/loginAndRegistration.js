const express = require("express");
const { handleloginUser, handleCreateNewUser, handleUnknowReq } = require("../controller/loginAndSignin");

const router = express.Router();

router.get("/", (req, res) => {
  return res.render("landingPage2.ejs");
});
router.get("/login", (req, res) => {
  return res.render("login");
})
.post("/login", handleloginUser);

router.get("/registration", (req, res) => {
  return res.render("registration_page");
})
.post("/registration", handleCreateNewUser);


//handling req which are not accounted for
router.get("/:anything", handleUnknowReq);

module.exports = router;
