const User = require("../models/user")
const { getUser } = require("../service/auth");

async function restrictedToLoginUserOnly(req, res, next){
    const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth (req, res, next){
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user
    
    next();
}
async function restrictedToAdminOnly(req, res, next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);

    if (!user) return res.redirect("/login");
    const userFromDb = await User.findOne({_id:user._id});
    if(userFromDb.isAdmin){
        req.user = user;
        next()
    }else{
        res.redirect("/login")
    }
}

module.exports = {
    restrictedToLoginUserOnly,
    checkAuth,
    restrictedToAdminOnly,
}