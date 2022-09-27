import {Request, Response, NextFunction} from "express";
import {body, validationResult} from "express-validator";
import {ifError} from "assert";


export const inputValidationMiddleware = (req: Request<{}, { bloggerId: number }>, res: Response, next: NextFunction) => {

    const errors = validationResult(req)
    const customErrors = []

    if(req.body.bloggerId) {
        if (typeof req.body.bloggerId !== 'number') {
            customErrors.push({
                message: "number",
                field: "bloggerId"
            })
        }
    }

    if (!errors.isEmpty() || customErrors.length) {
        const err = errors.array({onlyFirstError: true}).map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })
        return res.status(400).json({errorsMessages: [...err, ...customErrors]})
    }
    next()
}
