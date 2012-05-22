function(doc) {
//return courses in my db
//loop over docs & call function
  if (doc._id.substr(0, 7) === "course:") {
    emit(doc._id.substr(7), {
    	"title": doc.title,
    	"program": doc.program,
    	"months": doc.month
    });
  }
};