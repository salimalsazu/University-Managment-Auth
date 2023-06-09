import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemsterController } from './academicSemester.controller';
import ValidateRequest from '../user/middleares/ValidateRequest';
const router = express.Router();

router.post(
  '/create-semester',
  ValidateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemsterController.createSemester
);

export const SemesterRoutes = router;
