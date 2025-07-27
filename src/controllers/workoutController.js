// npm install express-async-handler
const asyncHandler = require('express-async-handler');

// @desc    Get all workouts
// @route   GET /api/workouts
// @access  Private
const getWorkouts = asyncHandler(async (req, res) => {
  // No try/catch needed here!
  const workouts = await Workout.find({ user: req.user.id });
  res.status(200).json(workouts);
});