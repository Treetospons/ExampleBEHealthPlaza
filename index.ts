import express, { Express, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser';
import routers from './src/routes/ToDoList'
import { errorMiddleware } from './src/middlewares/ErrorMiddleware';

const app: Express = express()

const port: number = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('OK.').end()
})

app.use('/ToDoList', routers)

app.use(errorMiddleware)

app.listen(port, () => console.log(`Application is running on port http://localhost:${port}`))