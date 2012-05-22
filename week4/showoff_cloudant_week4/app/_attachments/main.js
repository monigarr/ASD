//
//    Full Sail University
//    Advanced Scalability & Design Interfaces
//    Monica Peters
//    Week 4 Project 4
//    Due Thursday May 24th 2012
//    main.js

	//refresh issue discussion
	//http://forum.jquery.com/topic/wish-listview-refresh-would-go-away

	//USE COUCH.JS TO LOAD DATA
	//MAKE SURE INDEX.HTML LOADED FIRST
	
//LOOK AT ID OF PAGE IS HOME

$('#search').live("pageshow", function()
{
	$.couch.db("showoff_cloudant_week4").view("app/projects", 
	{
		success: function(data)
		{
			$.each(data.rows, function(index, project)
			{
				var name = project.value.name;
				var tags = project.value.tags;
				var comments = project.value.comments;
				$('#projectlist').append(
					$('<li>').append(
						$('<a>').attr("href", "project.html?project=" + item.name)
							.text(name)
					)
				);
			});
			$('#projectlist').listview();
		}
	});
});
	
$('#browse').live("pageshow", function()
{
	$.couch.db("showoff_cloudant_week4").view("app/projects", 
	{
		success: function(data)
		{
			$.each(data.rows, function(index, project)
			{
				var name = project.value.name;
				var tags = project.value.tags;
				var comments = project.value.comments;
				$('#schoolprojectlist').append(
					$('<li>').append(
						$('<a>').attr("href", "program.html?program=" + item.name)
							.text(name)
					)
				);
			});
			$('#schoolprojectlist').listview();
		}
	});
});	
	//add page header to index.html
	$(function()
	{
		$('#logo').append('<center><h1><a href="index.html#home">ShowOff!</a></h1><small><center>asd week 4</center></small>');
	});
	
	//add page footer to index.html
	$('#navigate_footer').empty();
	$(function()
	{
		$('#navigate_footer').append('<div data-role="navbar"><ul data-role="listview" ><li><a href="#home" id="home" rel="internal" data-icon="home" data-add-back-btn="true">Home</a></li><li><a href="#search" id="displayLink" rel="internal" data-icon="search" data-add-back-btn="true">Search</a></li><li><a href="#browse" id="browse" rel="internal" data-icon="check" data-add-back-btn="true">Browse</a></li><li><a href="#contact" id="contact" rel="internal" data-icon="grid" data-add-back-btn="true">Contact</a></li><li><a href="#info" id="info" rel="internal" data-icon="info" data-add-back-btn="true">Info</a></li></ul></div>');
	});
	
	