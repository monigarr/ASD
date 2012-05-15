function(doc) {
//return courses in my db
//loop over docs & call function
  if (doc._id.substr(0, 7) === "incentive:") {
    emit(doc._id);
  }
};