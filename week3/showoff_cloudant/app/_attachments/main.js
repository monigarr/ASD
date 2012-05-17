//
//    Full Sail University
//    Advanced Scalability & Design Interfaces
//    Monica Peters
//    Week 3 Project 3
//    Due Thursday May 17th 2012
//    main.js

	
$(document).ready(function()
{
	//SHOW ALL PROJECTS ON INDEX.HTML#SEARCH PAGE
	//DATA-FILTER ON SEARCH PAGE
	$.ajax({
		"url":"_view/projects",
		"dataType":"json",
		"success": function(data)
		{
			$.each(data.rows, function(index, project)
			{
				var name = project.value.name;
				var tags = project.value.tags;
				var comments = project.value.comments;
				$('#projectlist').append(
					$('<li>').append(
						$('<a>').attr("href", "#")
							.text(name)
					)
				);
			});
			$('#projectlist').listview('refresh');
		}
	});
	
	//SHOW SCHOOL PROJECTS ON INDEX.HTML#BROWSE PAGE
	$.ajax({
		"url":"_all_docs?start_key='project:school:aaa'&end_key='project:school:zzz'",
		"dataType":"json",
		"success": function(data)
		{
			$.each(data.rows, function(index, project)
			{
				var name = project.value.name;
				var tags = project.value.tags;
				var comments = project.value.comments;
				$('#schoolprojectlist').append(
					$('<li>').append(
						$('<a>').attr("href", "#")
							.text(name)
					)
				);
			});
			$('#schoolprojectlist').listview('refresh');
		}
	});
});