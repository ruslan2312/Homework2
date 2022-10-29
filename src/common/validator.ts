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

// Users
export const usersLoginValidation = body('login').isString().trim().isLength({min: 3, max: 10})
export const usersPasswordValidation = body('password').isString().trim().isLength({min: 6, max: 20})
export const usersEmailValidation = body('email').isString().isEmail().trim().isLength({min: 1, max: 30})

// Comments
export const commentsContentValidation = body('content').trim().isLength({min: 20, max: 300})