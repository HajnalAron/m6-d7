import express from "express";
import BlogPostModel from "./schema.js";
import createHttpError from "http-errors";

const blogPostRouter = express.Router();

blogPostRouter.post("/", async (req, res, next) => {
  try {
    const newBlogPost = new BlogPostModel(req.body);
    const { _id } = await newBlogPost.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

blogPostRouter.get("/", async (req, res, next) => {
  try {
    const blogPosts = await BlogPostModel.find();
    res.send(blogPosts);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.get("/:blogPostId", async (req, res, next) => {
  try {
    const blogPostId = req.params.blogPostId;
    const blogPost = await BlogPostModel.findById(blogPostId);
    if (blogPost) {
      res.send(blogPost);
    } else {
      next(createHttpError(404, `BlogPost with id ${blogPostId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

blogPostRouter.put("/:blogPostId", async (req, res, next) => {
  try {
    const blogPostId = req.params.blogPostId;
    const modifiedBlogPost = await BlogPostModel.findByIdAndUpdate(
      blogPostId,
      req.body,
      {
        new: true
      }
    );
    if (modifiedBlogPost) {
      res.send(modifiedBlogPost);
    } else {
      next(createHttpError(404, `BlogPost with id ${blogPostId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

blogPostRouter.delete("/:blogPostId", async (req, res, next) => {
  try {
    const blogPostId = req.params.blogPostId;
    const deletedBlogPost = await BlogPostModel.findByIdAndDelete(blogPostId);
    if (deletedBlogPost) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `BlogPost with id ${blogPostId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

export default blogPostRouter;
