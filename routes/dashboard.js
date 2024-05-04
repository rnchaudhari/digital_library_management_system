const express = require("express");
const { handleUnknowReq } = require("../controller/loginAndSignin")
const { checkAuth } = require("../middleware/auth");
const { 
    handleChangePassword,
    handleProfiePage,
    handleHelpRequest, 
    handleSearchBooks,
    handleGetAllEBooks,
    handleDownloadBookByIsbn,
    handleGetAllBorrowedBooksByUser,
    handleReturnBorrowedBook,
    handleBorrowABook,
} = require("../controller/dashboard");

const router = express.Router();

router.get("/", checkAuth,(req, res) => {
    return res.render("dashboard.ejs")
});

router.get("/search", checkAuth, handleSearchBooks)
.post("/search",checkAuth, handleBorrowABook);
router.get("/ebook/:isbn", checkAuth,handleDownloadBookByIsbn)

router.get("/ebook",checkAuth, handleGetAllEBooks)

router.get("/help",checkAuth, (req, res) => {
    return res.render("help.ejs");
})
.post("/help",checkAuth, handleHelpRequest);

router.get("/profile", checkAuth, handleProfiePage);

router.get("/borrowed", checkAuth, handleGetAllBorrowedBooksByUser)
.post("/borrowed", checkAuth, handleReturnBorrowedBook);

router.get("/changepassword", checkAuth,(req, res) => {
    return res.render("changepassword.ejs");
})
.post("/changepassword", checkAuth , handleChangePassword);

router.get("/aboutus", checkAuth, (req, res)=>{
    res.render("aboutus")
} );
router.get("/logout", (req, res) => {
    res.clearCookie("uid");
    res.redirect("/");

})

router.get("/:anything", handleUnknowReq)



module.exports = router;