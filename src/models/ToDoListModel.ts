import { body } from "express-validator"

export type ToDoListModel = {
    id?: number,
    title: string,
    description: string,
    isSuccess: boolean,
    createAt?: Date,
    updateAt?: Date,
}

export const ToDoListValidator = [
    body('title', 'Invalid title').notEmpty(),
    body('description', 'Invalid description').notEmpty(),
    body('isSuccess', 'Invalid isSuccess').notEmpty(),
]
