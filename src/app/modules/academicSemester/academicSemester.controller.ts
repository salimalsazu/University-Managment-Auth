import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterService } from './academicSemster.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicsemester } from './academicSemester.interface';
import { academicSemsterFilterableFileds } from './academicSemster.constant';

// const createSemester: RequestHandler = async (req, res, next) => {
//   try {
//     const { ...academicSemesterData } = req.body;
//     const result = await AcademicSemesterService.createSemester(
//       academicSemesterData
//     );
//     res.status(200).json({
//       success: true,
//       message: 'Academic Semester is created successfully!',
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Academic Semster is createded successfully`,
      data: result,
    });
    next();
    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semester is created successfully!',
    //   data: result,
    // });
  }
);

const getAllSemsters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemsterFilterableFileds);

    const paginationOptions = pick(req.query, paginationFields);

    const result = await AcademicSemesterService.getAllSemsters(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicsemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester get Successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemsterController = {
  createSemester,
  getAllSemsters,
};
