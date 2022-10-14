import {body} from "express-validator";
//Posts
export const titleValidation = body('title').trim().isLength({min: 1, max: 30})
export const shortDescriptionValidation = body('shortDescription').trim().isLength({min: 1, max: 100})
export const contentValidation = body('content').trim().isLength({min: 1, max: 1000})
export const blogIdValidation = body('blogId').isString().isLength({min: 1, max: 30})
export const blogNameValidation = body('blogName').trim().isLength({min: 1, max: 30}).optional()

// Blogs
export const nameValidation = body('name').trim().isLength({min: 1, max: 15})
export const youtubeUrlValidation = body('youtubeUrl').isURL().isLength({min: 1, max: 100})