import {
  IAcademicSemesterNonth,
  IAcademicSemesterTitle,
  IAcademicsemesterCode,
} from './academicSemester.interface';

export const academicSemesterMonths: IAcademicSemesterNonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterTitles: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSemesterCodes: IAcademicsemesterCode[] = [
  '01',
  '02',
  '03',
];

export const AcademicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchAbleFileds = ['title', 'code', 'year'];

export const academicSemsterFilterableFileds = [
  'searchTerm',
  'title',
  'code',
  'year',
];
