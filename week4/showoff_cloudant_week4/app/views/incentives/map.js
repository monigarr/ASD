function(doc) {
//return school projects in my db
//loop over docs & call function
  if (doc._id.substr(0, 14) === "school") {
    emit(doc._id.substr(14), {
    	"name": doc.name,
    	"tags": doc.tags,
    	"comments": doc.comments
    });
  }
};