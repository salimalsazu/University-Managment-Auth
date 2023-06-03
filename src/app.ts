import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/modules/users/middleares/golbalErrorHandler'
const app: Application = express()

//cors
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// logger.info(app.get('env'))
// console.log(process.env)

// Application routes
app.use('/api/v1/users/', usersRouter)

//Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully')

//   throw new ApiError('Server not Working')

//   // next('Orey Error')
// })

//globalErrorHandler

app.use(globalErrorHandler)

export default app
