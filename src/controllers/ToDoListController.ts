import { ToDoListModel } from "../models/ToDoListModel"

let toDoList: ToDoListModel[] = []

export const getAll = (): ToDoListModel[] => {
    return toDoList
}

export const getById = (id: number): ToDoListModel[] => {
    return toDoList.filter(item => item.id === id)
}

export const create = (payload: ToDoListModel): ToDoListModel => {
    const ids: number[] = [...toDoList].map(item => (item.id || 0))
    const lastId: number = ids.length > 0 ? Math.max(...ids) + 1 : 1
    const payloadTodo: ToDoListModel = Object.assign({}, payload, { id: lastId, createAt: new Date(), updateAt: new Date() });

    toDoList.push(payloadTodo)

    return payloadTodo
}

export const update = (payload: ToDoListModel): ToDoListModel => {
    const index: number = [...toDoList].findIndex(item => item.id === payload.id)
    if (index > -1) {
        toDoList[index] = payload
        return toDoList[index]
    } else {
        return create(payload)
    }
}

export const del = (id: number): ToDoListModel[] => {
    toDoList = toDoList.filter(item => item.id !== id)

    return toDoList
}