import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    routeName: UserRoutes,
  },
  {
    path: '/academic-semesters',
    routeName: SemesterRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routeName));

// Not needed
// router.use('/users/', UserRoutes);
// router.use('/academic-semesters/', SemesterRoutes);

export default router;
