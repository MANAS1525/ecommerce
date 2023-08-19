const express=require("express");
const {registerController,loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} =require("../controllers/authController");
const {requireSignIn,isAdmin}=require("../middlewares/authMiddleware")


const router =express.Router();


router.post('/register',registerController);
router.post('/login',loginController);
// to reset password
router.post("/forgot-password", forgotPasswordController);

router.get('/test',requireSignIn , isAdmin,testController);
//protect the route auth
router.get('/user-auth',requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
});
//protect the route admin
router.get('/admin-auth',requireSignIn,isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
});
router.put("/profile",requireSignIn,updateProfileController);
router.get("/orders",requireSignIn,getOrdersController);
router.get("/all-orders",requireSignIn,isAdmin ,getAllOrdersController);
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);







module.exports=router;