const express=require("express");
const dotenv=require("dotenv");
const morgan =require("morgan");
const  connectDB = require("./config/db");
const router=require("./routes/authRoute");
const cors=require("cors");
const categoryRoute =require ("./routes/categoryRoutes");
const productRoute =require ("./routes/productRoute");


const app=express();

dotenv.config();
connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/api/v1/auth',router);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/product",productRoute);

app.get("/",(req,res)=>{
    res.send("{<h1>welcome to my website</h1>}");
    });
    const PORT=process.env.PORT;
    app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    });
