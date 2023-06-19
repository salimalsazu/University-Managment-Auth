import express from 'express';
import { StudentController } from './student.controller';
import ValidateRequest from '../../middleares/ValidateRequest';
import { StudentValidaion } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);

router.patch(
  '/:id',
  ValidateRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentRoutes = router;
