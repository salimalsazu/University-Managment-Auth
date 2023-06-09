import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentRoutes } from '../modules/student/student.route';
import { FacultyRoutes } from '../modules/faculty/faculty/faculty.route';
import { AdminRoutes } from '../modules/admin/admin.route';

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
  {
    path: '/academic-faculties',
    routeName: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    routeName: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    routeName: StudentRoutes,
  },
  {
    path: '/faculties',
    routeName: FacultyRoutes,
  },
  {
    path: '/admins',
    routeName: AdminRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routeName));

// Not needed
// router.use('/users/', UserRoutes);
// router.use('/academic-semesters/', SemesterRoutes);

export default router;
