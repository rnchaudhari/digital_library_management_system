const User = require("../models/user");
const  Books= require("../models/books");
const Query = require("../models/clientQuerry");
const EBooks = require("../models/ebook");

async function handleChangePassword(req, res){
    const {
        currentPassword,
        newPassword,
        confirmNewPassword,
    } = req.body;

    const user = await User.findOne({emailId: req.user.email});
    
    if (currentPassword == user.loginPassword && newPassword == confirmNewPassword){
        await User.findOneAndUpdate({emailId:user.emailId}, {loginPassword: newPassword}, {runValidators:true});
        return res.redirect("/dashboard");
    }
    return res.redirect("/dashboard/changepassword")
}

async function handleProfiePage(req, res){
    const user = await User.findOne({emailId:req.user.email}); 
    return res.render("aboutuser.ejs" , {
        user,
    });
}

async function handleHelpRequest(req, res){
    const {
        name,
        email,
        message
    } = req.body;
    try {
        await Query.create({
            emailId:email,
            name: name,
            message:message,
            isAcknoledged: false,
            raisedBy: req.user._id,
            
        });
        
    } catch (error) {
        console.log(error)
        res.render("error");
    }
    res.redirect("/dashboard");
}

async function handleSearchBooks(req, res){
    allBooks = await Books.find({})
    res.render("search",{
        allBooks
    })
}

async function handleGetAllEBooks(req, res){
    allEBooks = await EBooks.find({});
    res.render("ebook", {
        allEBooks,
    })
}

async function handleDownloadBookByIsbn(req, res ){
    const isbn = req.params.isbn;
    res.download(`/home/happypotter/Programming/pbl/digital_library_management_system/ebookFiles/${isbn}.pdf`)
}

async function handleGetAllBorrowedBooksByUser(req, res){
    const userId=req.user._id;
    const allBorrowedBooks = await Books.find({currentHolder:userId})
    return res.render("borrowed",{
        allBorrowedBooks,
    })    
}

async function handleReturnBorrowedBook(req, res){
    const isbn = req.body.query;
    const update = await Books.updateOne({isbn:isbn},{currentHolder:null});
    res.redirect("/dashboard/borrowed")
}

async function handleBorrowABook( req, res){
    const isbn = req.body.query;
    const user  = req.user;
    const update = await Books.updateOne({isbn:isbn}, {$set:{currentHolder:user._id}})
    res.redirect("/dashboard/search")
}

module.exports={
    handleChangePassword,   
    handleProfiePage,
    handleHelpRequest,
    handleSearchBooks,
    handleGetAllEBooks,
    handleDownloadBookByIsbn,
    handleGetAllBorrowedBooksByUser,
    handleReturnBorrowedBook,
    handleBorrowABook,
}