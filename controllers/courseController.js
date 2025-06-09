const Course = require('./../Models/courseModel');
const catchAsync = require('./../util/catchAsync');
const AppError = require('./../util/appError');
const APIFeatures = require('./../util/apiFeatures');
const factory = require('./../controllers/handleFactory');

exports.getAllCourses = factory.getAll(Course);

exports.getOneCourse = factory.getOne(Course, { path: 'reviews' });

exports.createCourse = factory.createOne(Course);

exports.updateCourse = factory.updateOne(Course);

exports.deleteCourse = factory.deleteOne(Course);
