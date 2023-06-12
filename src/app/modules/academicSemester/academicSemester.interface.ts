import { Model } from 'mongoose';

export type IAcademicSemesterNonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';

export type IAcademicsemesterCode = '01' | '02' | '03';

export type IAcademicsemester = {
  title: IAcademicSemesterTitle;
  year: string;
  code: IAcademicsemesterCode;
  startMonth: IAcademicSemesterNonth;
  endMonth: IAcademicSemesterNonth;
};

export type AcademicSemesterModel = Model<IAcademicsemester>;

export type IAcademicSemesterFilter = {
  searchTerm?: string;
};
