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

const createSemester = catchAsync(async (req: Request, res: Response) => {
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
  // res.status(200).json({
  //   success: true,
  //   message: 'Academic Semester is created successfully!',
  //   data: result,
  // });
});

const getAllSemsters = catchAsync(async (req: Request, res: Response) => {
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
});

const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicSemesterService.getSingleSemester(id);
    sendResponse<IAcademicsemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Semester get Successfully',
      data: result,
    });
    next();
  }
);

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updatedData);
  sendResponse<IAcademicsemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester updated Successfully',
    data: result,
  });
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicSemesterService.deleteSemester(id);
  sendResponse<IAcademicsemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester deleted Successfully',
    data: result,
  });
});

export const AcademicSemsterController = {
  createSemester,
  getAllSemsters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};

// Ensure 1: Route Level: Update -> Give me title and code both, neither

// Ensure 2: Service Level: Update -< mapping title: code
