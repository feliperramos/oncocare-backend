import mongoose from "mongoose";

// Intercept and modify findOne() operations
mongoose.Query.prototype.findOne = function (...args) {
  // Set the timeout value (in milliseconds)
  const timeout = 30000; // 30 seconds

  // Apply the timeout to the findOne() operation
  this.maxTimeMS(timeout);

  // Call the original findOne() method with the modified arguments
  return this.findOne(...args);
};
