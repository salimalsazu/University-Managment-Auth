import { Schema, model } from 'mongoose';
import status from 'http-status';

import {
  IAcademicsemester,
  AcademicSemesterModel,
} from '../academicSemester/academicSemester.interface';
import {
  AcademicSemesterCodes,
  AcademicSemesterTitles,
  academicSemesterMonths,
} from './academicSemster.constant';
import ApiError from '../../../errors/ApiError';

const academicSemesterSchema = new Schema<IAcademicsemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic Semester is Already Exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicsemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);

//Handling Sane Year and Same semester Issue

//Data -> check - ? Same year && Same Semester
