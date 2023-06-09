import express, { Application } from 'express';
import cors from 'cors';
// import { UserRoutes } from './app/modules/user/user.route';
// import { SemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
import globalErrorHandler from './app/modules/user/middleares/golbalErrorHandler';
import routes from './app/routes';
// import ApiError from './errors/ApiError'
const app: Application = express();

//cors
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);
// logger.info(app.get('env'))
// console.log(process.env)

// Application routes
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters/', SemesterRoutes);

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error Logger')

//   // res.send('Working Successfully')
//   //   Promise.reject(new Error('Unhandled Promise Rejection'))
//   //   throw new ApiError(400,'Server not Working')
//   // next('Orey Error')
// })

//globalErrorHandler

app.use(globalErrorHandler);

export default app;
