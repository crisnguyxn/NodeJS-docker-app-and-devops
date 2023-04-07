const { handleCustomError } = require("../errors/custom-error");
const asyncWrapper = require("../middlewares/async");
const Blog = require("../models/blog");

const getAllBlog = asyncWrapper(async (req,res) => {
    console.log('con me may');
    const blogs = await Blog.find({})
    res.status(200).json({
        status:'success',
        count:blogs.length,
        blogs
    })
})

const getOneBlog = asyncWrapper(async(req,res,next) => {
    const {id:blogID} = req.params;
    const blog = await Blog.findOne({_id:blogID})
    if(!blog){
        return next(handleCustomError(`The blog with id: ${blogID} is not existed`,400))
    }else{
        res.status(200).json({blog})
    }
})

const createBlog = asyncWrapper(async(req,res) => {
    const blog = await Blog.create(req.body)
    res.status(201).json({blog})
})

const updateBlog = asyncWrapper(async(req,res,next) => {
    const {id:blogID} = req.params 
    const blog = await Blog.findOne({_id:blogID})
    if(!blog){
        return next(handleCustomError(`The blog with id: ${blogID} is not existed`,400))
    }else{
        const updatedBlog = await Blog.updateOne({_id:blogID},req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({updatedBlog})
    }
})

const deleteBlog = asyncWrapper(async(req,res,next) => {
    const {id:blogID} = req.params 
    const blog = await Blog.findOne({_id:blogID})
    if(!blog){
        return next(handleCustomError(`The blog with id: ${blogID} is not existed`,400))
    }else{
        const deletedBlog = await Blog.deleteOne({_id:blogID}) 
        res.status(200).json({deletedBlog})
    }
})

module.exports = {
    getAllBlog,createBlog,updateBlog,deleteBlog,getOneBlog
}