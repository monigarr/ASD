//
//    Full Sail University
//    Advanced Scalability & Design Interfaces
//    Monica Peters
//    Week 3 Project 3
//    Due Thursday May 17th 2012
//    main.js

	
$('#home').live("pageshow", function()
{
	//app is name of this app see _id file
	//programs is name of db objects
	$.couch.db("asdproject").view("app/programs", 
	{
		cache: false,
		success: function(data)
		{
			$('#homeItems').empty();
			$.each(data.rows, function(index, value)
			{
				var item = (value.value || value.doc);
				$('#homeItems').append(
					$('<li>').append(
						$('<a>')
							.attr("href", "program.html?program=" + item.acronym)
							.text(item.title)
						)
					);
				});
				$('#homeItems').listview();
		}
	});
});

var urlVars = function()
{
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	//loop over the pairs
	var urlValues = {};
	for (var pair in urlPairs)
	{
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

/*
$('#program').live("pageshow", function()
{
	var program = urlVars()["program"];
	$.couch.db("asdproject").view("app/courses", 
	{
		key: "course:" + course
	});
});
*/



$('#program').live("pageshow", function()
{
	//app is name of this app see _id file
	//courses is name of db objects
	$.couch.db("asdproject").view("app/courses", 
	{
		cache: false,
		
		beforeSend: function(data)
		{
			$('#error').hide();
			$('#loading').show();
		},
		
		complete: function(data)
		{
			$('#loading').hide();
		},
		
		success: function(data)
		{
			$('#courseItems').empty();
			$.each(data.rows, function(index, value)
			{
				var item = (value.value || value.doc);
				$('#courseItems').append(
					$('<li>').append(item)
						.text(item.title + item.month + item.program)
					);
				});
				$('#courseItems').listview();
		},
		
		error: function(data)
		{
			$('#error').show();
		}
	});
	
	//form
	function additem(e)
	{
		e.preventDefault();
		$('#additem h4').slideUp();
		var form = $(this).serialize();
		$.ajax('/additem',
		{
			data: form,
			dataType: 'script',
			type: 'post'
		});
	}
});