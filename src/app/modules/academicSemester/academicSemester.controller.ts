import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterService } from './academicSemster.service';

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
    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Academic Semster is createded successfully`,
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semester is created successfully!',
    //   data: result,
    // });
  }
);

export const AcademicSemsterController = {
  createSemester,
};
