const Books = require("../models/books")
const Users = require("../models/user")
const Borrowings = require("../models/borrowing")

async function handleAddNewBook(req ,res){
    const {
        title,
        author,
        isbn,
    } =  req.body;
    const addBook = await Books.create({isbn:isbn, title:title, author:author});
    res.redirect("/admin/addbook")


}
async function handleAddNewMember(req ,res){

}
async function handleGetSettings(req ,res){

}
async function handleGetAdminDashboard(req, res){
    /*
    const countOfBooks = await Books.count({}, (count ,err)=>{
        if(err){
            console.log(err);
        }else{
            return count;
        }
    });
    const countOfUsers = await Users.count({}, (count ,err)=>{
        if(err){
            console.log(err);
        }else{
            return count;
        }
    });
    */
    const allBooks = await Books.find({});
    const allUsers = await Users.find({});
    const borrowedBooks = await Books.find({currentHolder: {$ne: null}})
    const pageStats = {
        totalBooks: allBooks.length,
        totalUsers: allUsers.length,
        totalBorrowedBooks: borrowedBooks.length
    }
    res.render("admindashboard" , {
        pageStats,
    })

}
module.exports={
    handleAddNewBook,
    handleAddNewMember,
    handleGetSettings,
    handleGetAdminDashboard,
    
}