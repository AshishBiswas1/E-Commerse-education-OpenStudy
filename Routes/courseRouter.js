const express = require('express');
const courseController = require('./../controllers/courseController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(courseController.getAllCourses)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'course-author'),
    courseController.createCourse
  );

router
  .route('/:id')
  .get(courseController.getOneCourse)
  .patch(courseController.updateCourse);

module.exports = router;

