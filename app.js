require("dotenv").config();

const { connectToMongoDB } = require("./connect")
const loginpageRouter = require("./routes/loginAndRegistration")
const express = require("express")
const path = require("path")
const dashboardRouter = require("./routes/dashboard")
const cookieParser = require("cookie-parser");
const { restrictedToLoginUserOnly, restrictedToAdminOnly } = require("./middleware/auth")
const adminDashboardRouter = require("./routes/adminDashboard")
const cluster = require("cluster")
const os = require("os")
const process = require("process")

if(cluster.isPrimary){
  console.log(`Primary ${process.pid} is running`);

  for(var i =0 ; i< os.cpus().length;i++){
    cluster.fork();
  }
}else{
    //const vars
    const app = express();
    const PORT = process.env.PORT || 8000;

    //ejs
    app.set("view engine", "ejs");
    app.set('views', path.resolve("./views"));

    //middleware 
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //connection to MongoDb
    //connectToMongoDB(process.env.MONGO_URL)
    connectToMongoDB("mongodb://127.0.0.1:27017/dlms")
    .then(() => {
       // console.log("MongoDB connected.....")
    });

    //Routers
    app.use("/admin",restrictedToAdminOnly,adminDashboardRouter);
    app.use("/dashboard", restrictedToLoginUserOnly, dashboardRouter); //restrictedToLoginUserOnly is a inline middleware
    app.use("/", loginpageRouter);

    //listener
    app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`));

}
