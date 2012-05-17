function(doc) {
//return project incentives in my db
//loop over docs & call function
  if (doc._id.substr(0, 7) === "incentive:") {
    emit(doc._id);
  }
};