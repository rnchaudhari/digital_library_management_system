const User = require("../models/user");
const { setUser, getUser } = require("../service/auth");
async function handleCreateNewUser(req, res) {
    const { 
        name,
        email,
        mobile,
        student_id,
        birthdate,
        permanent_address,
        temporary_address,
        year_of_studying,
        department,
        password,
    } = req.body;

    try {
        await User.create({
            student_id: student_id,
            emailId: email,
            name: name,
            loginPassword: password,
            tempaddress: temporary_address,
            permantAddress: permanent_address,
            contactNo: mobile,
            dob: birthdate,
            yearOfStudying: year_of_studying,
            department: department,
            isAdmin: false,
        })
        res.redirect("/login")


    } catch (error) {
        res.render("error.ejs")
    }
}

async function handleloginUser(req, res) {
    const { email, password , user_type } = req.body;
    const user = await User.findOne({ emailId: email, loginPassword: password })
    if (!user) {
        return res.redirect("/login");
    }
    if(user_type == "admin" && user.isAdmin == true){
        const token = setUser(user);
        res.cookie("uid", token);
        res.redirect("/admin")
    }else if( user_type == "user"){
        const token = setUser(user);
        res.cookie("uid", token);
        res.redirect("/dashboard");
    }else{
        res.render("notAuthorized")
    }   
}

async function handleUnknowReq(req, res) {
    res.render("pageNotFound.ejs");
}

module.exports = {
    handleCreateNewUser,
    handleloginUser,
    handleUnknowReq,
}
