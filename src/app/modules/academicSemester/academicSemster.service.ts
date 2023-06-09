import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcademicsemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { AcademicSemesterTitleCodeMapper } from './academicSemster.constant';

const createSemester = async (
  payload: IAcademicsemester
): Promise<IAcademicsemester> => {
  if (AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
