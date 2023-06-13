import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicSemesterFilter,
  IAcademicsemester,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import {
  AcademicSemesterTitleCodeMapper,
  academicSemesterSearchAbleFileds,
} from './academicSemster.constant';
import { IpaginationOptions } from '../../../interface/pagination';
import { IGenericResponse } from '../../../interface/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicsemester
): Promise<IAcademicsemester> => {
  if (AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemsters = async (
  filters: IAcademicSemesterFilter,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IAcademicsemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchAbleFileds.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whenConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whenConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicsemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicsemester>
): Promise<IAcademicsemester | null> => {
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemsters,
  getSingleSemester,
  updateSemester,
};
