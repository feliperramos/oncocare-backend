import mongoose from "mongoose";

const originalFindOne = mongoose.Query.prototype.findOne;

mongoose.Query.prototype.findOne = function (...args) {
  const timeout = 30000;

  this.maxTimeMS(timeout);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return originalFindOne.apply(this, args as [any?]);
};
