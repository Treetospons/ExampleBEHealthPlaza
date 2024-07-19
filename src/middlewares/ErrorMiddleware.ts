import type { NextFunction, Request, Response } from 'express'
import { BaseError } from '../utils/error';

export const errorMiddleware = (err: BaseError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status).json({
        message: err.message,
        stack: err.stack,
    })
}
