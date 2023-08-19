const express =require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, realtedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController } = require("../controllers/productController");
const formidable =require("express-formidable");
const router=express.Router();
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController);
router.get("/get-product",getProductController);
router.get("/get-product/:slug",getSingleProductController);
router.get("/product-photo/:pid",productPhotoController);
router.delete("/delete-product/:pid",deleteProductController);
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController);
router.post("/product-filters",productFiltersController);
router.get("/product-count",productCountController);
router.get("/product-list/:page",productListController);
router.get("/search/:keyword",searchProductController);
router.get("/related-product/:pid/:cid",realtedProductController);
router.get("/product-category/:slug",productCategoryController);
router.get("/braintree/token",braintreeTokenController);
router.post("/braintree/payment",requireSignIn,brainTreePaymentController)

module.exports=router;
