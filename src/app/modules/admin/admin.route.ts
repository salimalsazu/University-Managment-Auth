import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import ValidateRequest from '../../middleares/ValidateRequest';
const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
router.get('/', AdminController.getAllAdmins);

router.delete('/:id', AdminController.deleteAdmin);

router.patch(
  '/:id',
  ValidateRequest(AdminValidation.updateAdmin),
  AdminController.updateAdmin
);

export const AdminRoutes = router;
