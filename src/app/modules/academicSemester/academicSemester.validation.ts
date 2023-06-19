import { z } from 'zod';
import {
  AcademicSemesterCodes,
  AcademicSemesterTitles,
  academicSemesterMonths,
} from './academicSemster.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum([...AcademicSemesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is needed',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End Month is needed',
    }),
  }),
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...AcademicSemesterTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum([...AcademicSemesterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start Month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'End Month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    { message: 'Either both title and code should be provided or neither' }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
