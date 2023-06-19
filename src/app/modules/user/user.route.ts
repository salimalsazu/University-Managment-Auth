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
  ValidateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

export const UserRoutes = router;
