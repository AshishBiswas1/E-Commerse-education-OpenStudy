const mongoose = require('mongoose');
const slugify = require('slugify');

//DATABASE MODEL
const courseSchema = mongoose.Schema({
  courseName: {
    type: String,
    required: [true, 'Please enter the course name.'],
    maxlength: [50, 'A course name must have less or equal then 40 character'],
    minlength: [
      10,
      'A course name must have greater or equal then 10 character'
    ]
  },
  price: Number,
  author: {
    type: String,
    required: [true, 'A course must have an author.']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above or equal to 1.0'],
    max: [5, 'Rating must be less then or equal to 5.0']
  },
  slug: String,
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A course must have a summary']
  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'Please upload an image for the cover.']
  },
  startDate: [Date]
});

courseSchema.pre('save', function (next) {
  this.slug = slugify(this.courseName, { lower: true });
  next();
});

// courseSchema.virtual('reviews', {
//   ref: 'Review',
//   foreignField: 'tour',
//   localField: '_id'
// });

const Courses = mongoose.model('Courses', courseSchema);

module.exports = Courses;
