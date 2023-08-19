const categoryModel=require("../models/categoryModel");


const slugify =require( "slugify");

const createcategoryController=async(req,res)=>{
   try{
       const{name}=req.body
       if(!name){
           return res.status(401).send({message:"name is require"})
       }
       const existingCategory=await categoryModel.findOne({name});
       if(existingCategory){
           return res.status(200).send({success:true,message:"category already exist"});
       }
       const category =await new categoryModel({name,slug:slugify(name)}).save();
       res.status(201).send({
           success:true,
           message:"new category created",
           category
       })

   }catch(error){
       console.log(error)
       res.status(500).send({
           success:false,
           error,
           message:"error in category"
       })
   }
};

const updateCategoryController=async(req,res)=>{
    try{
        const {name}=req.body
        const {id}=req.params
        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({success:true,message:" category update successfully",category});

    }catch(error){
        console.log(error);
        res.status(500).send({success:false,error,message:"error in updatingthe category"})
    }


};
const categoryController = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };
  const singleCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Category",
      });
    }
  };
  const deleteCategoryController = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };
module.exports= {createcategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController};