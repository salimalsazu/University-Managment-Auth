import express from 'express';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemsterController } from './academicSemester.controller';
import ValidateRequest from '../../middleares/ValidateRequest';
const router = express.Router();

router.post(
  '/create-semester',
  ValidateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemsterController.createSemester
);

router.get('/:id', AcademicSemsterController.getSingleSemester);

router.patch(
  '/:id',
  ValidateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemsterController.updateSemester
);

router.delete('/:id', AcademicSemsterController.deleteSemester);
router.get('/', AcademicSemsterController.getAllSemsters);

export const SemesterRoutes = router;
