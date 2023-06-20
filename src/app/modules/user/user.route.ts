import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import ValidateRequest from '../../middleares/ValidateRequest';

const router = express.Router();

// router.post(
//   '/create-user',
//   ValidateRequest(UserValidation.createUserZodSchema),
//   UserController.createUser
// );

router.post(
  '/create-student',
  ValidateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  ValidateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  ValidateRequest(UserValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
