import { NextFunction, Request, Response, Router } from "express"
import { getAll, create, del, update, getById } from "../controllers/ToDoListController"
import { ToDoListModel, ToDoListValidator } from "../models/ToDoListModel"
import { BadRequestError, BaseError } from "../utils/error"
import { param } from 'express-validator';
import { ValidationResult } from "../utils/Validate";

const routers: Router = Router()

routers.route('/')

routers.get('/', (req: Request, res: Response<ToDoListModel[]>, next: NextFunction) => {
    try {
        const result = getAll()
        res.status(200).send(result)
    } catch (error: unknown) {
        const err = error as BaseError;
        next(new BaseError(err.message, err.status, err.stack))
    }
})

routers.get('/:id', param('id', 'Invalid id').notEmpty(), (req: Request, res: Response<ToDoListModel[] | object>, next: NextFunction) => {
    try {
        const errors: string[] = ValidationResult(req).array()
        if (errors.length > 0) {
            throw new BadRequestError("Bad Request", JSON.stringify(errors))
        }

        const id = parseInt(req.params?.id) || 0
        const result = getById(id)
        res.status(200).send(result)
    } catch (error: unknown) {
        const err = error as BaseError;
        next(new BaseError(err.message, err.status, err.stack))
    }
})

routers.post('/', ToDoListValidator, (req: Request<ToDoListModel>, res: Response<ToDoListModel | object>, next: NextFunction) => {
    try {
        const errors: string[] = ValidationResult(req).array()
        if (errors.length > 0) {
            throw new BadRequestError("Bad Request", JSON.stringify(errors))
        }

        const result = create(req.body)
        res.status(200).send(result)
    } catch (error: unknown) {
        const err = error as BaseError;
        next(new BaseError(err.message, err.status, err.stack))
    }
})

routers.put('/', (req: Request<ToDoListModel>, res: Response<ToDoListModel | object>, next: NextFunction) => {
    try {
        const errors: string[] = ValidationResult(req).array()
        if (errors.length > 0) {
            throw new BadRequestError("Bad Request", JSON.stringify(errors))
        }

        const result = update(req.body)
        res.status(200).send(result)
    } catch (error: unknown) {
        const err = error as BaseError;
        next(new BaseError(err.message, err.status, err.stack))
    }
})

routers.delete('/:id', param('id', 'Invalid id').notEmpty(), async (req: Request, res: Response<ToDoListModel[] | object>, next: NextFunction) => {
    try {
        const errors: string[] = ValidationResult(req).array()
        if (errors.length > 0) {
            throw new BadRequestError("Bad Request", JSON.stringify(errors))
        }

        const id = parseInt(req.params?.id) || 0
        const result = del(id)
        res.status(200).send(result)
    } catch (error: unknown) {
        const err = error as BaseError;
        next(new BaseError(err.message, err.status, err.stack))
    }
})


export default routers