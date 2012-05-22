function(doc) {
//return courses in my db
//loop over docs & call function
  if (doc._id.substr(0, 8) === "program:") {
    emit(doc._id.substr(8), {
    	"title": doc.title,
    	"acronym": doc.acronym,
    	"months": doc.months
    });
  }
};