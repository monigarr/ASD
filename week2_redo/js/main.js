//
//    Full Sail University
//    Advanced Scalability & Design Interfaces
//    Monica Peters
//    Week 2 Project 2
//    Due Thursday May 10th 2012
//    main.js

/*	Corrected week 1 issues with week 2 project:
 Try http://wddbs.com/jshero/ to find errors. 
 Unclosed quote on line 318 is breaking a lot of the code.
	* Change all uses of $ to the jQuery equivalent.
    * Coding/Manipulation: 
		Line 59 creation would be $("); 
		setAttribute would become .attr, 
		.innerHTML will be .html, 
		.appendChild would be .append, 
		.style would be .css.
		 
    *** Check out .val to set your values. 
    	http://api.jquery.com/val/
    
    * Change addEventListener to .on
    
    * Coding/Functionality: Poor (0/10pts) 
    		Points can be refunded when CRUD is functional.
 
*/
	
$(document).ready(function()
{
	
	// Var Defaults
	var projectType = ["-- Choose Project Type--", "ios", "android", "html5", "wordpress", "graphic", "author"],mtopicValue;
		errMsg = $("errors");
		projectId = getUrlVars()["projectId"];
		projectForm = $("projectForm");
		displayLink = $("displayLink");
		clearLink = $("clear");
		displayIOSLink = $("displayIOSLink");
		displayAndroidLink = $("displayAndroidLink");
		displayHtml5Link = $("displayHtml5Link");
		displayWordpressLink = $("displayWordpressLink");
		displayGraphicLink = $("displayGraphicLink");
		displayAuthorLink = $("displayAuthorLink");
		save = $("submit");
		
		displayLink.on("click", getProjectJSON);
		clearLink.on("click", clearLocal);
		displayIOSLink.on("click", getProjectJSON);
		displayAndroidLink.on("click", getProjectJSON);
		displayHtml5Link.on("click", getProjectJSON);
		displayWordpressLink.on("click", getProjectJSON);
		displayGraphicLink.on("click", getProjectJSON);
		displayAuthorLink.on("click", getProjectJSON);
		save.on("click", saveProject);
		//save.on("click", validate);
		
		// Project Types DropDown
		var makeProjectTypes = function() 
		{
			$('<select></select>')
				.appendTo('#select');
			//populate with options
			for(var i=0, j=projectType.length; i<j; i++) 
			{
				var optText = projectType[i];
				$('<option></option>')
					.appendTo('select #mtype');
				$('#mtype option:last-child')
					.html(optText);
			}
			var selectType = $('select #mtype');
			selectType.selectmenu();
			selectType.selectmenu('refresh');
		}
		
		// Find value of Selected Radio Button
		var getSelectedRadio = function()
		{
			//create radio array
			//var radios = document.forms[0].mtopics;
			var radios = $("#mtopics").val();
			for(var i=0; i<radios.length; i++)
			{
				if(radios[i].checked)
				{
					mtopicValue = radios[i].value;
				}
			}
		}	
		
		var setDate = function()
		{
			if (!($('#date').val()))
			{
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1;
				var yyyy = today.getFullYear();
					if(dd<10){dd='0'+dd;}
					if(mm<10){mm='0'+mm;}
					$('#date').val(mm+'/'+dd+'/'+yyyy);
			}
		}
		
		//Auto Populate local storage
		var autoFillData = function()
		{
			//actual JSON Object data is coming from json.js file.
			//json.js file is loaded from additem.html
			//Store JSON Object into local storage
			for(var n in json)
			{
				var id = Math.floor(Math.random()*10000001);
				localStorage.setItem(id, JSON.stringify(json[n]));
			}
			$('#getProjectData').hide();
			getProjectJSON();
		}
		
		//Get icon for the relevant project type displayed
		var getImage = function(mediaType, makeSubList)
		{
			var imageLi = $('div')
				.attr('align', 'left')	
				.append('#items li a' + key);
			
			var newImg = $('img')
				.attr("src", "images/" + mediaType + ".jpg")
				.attr('class', 'projectIconAlign');
				.append('#imageLi' + key);
			
			
		}
		
		//Get graphic url for project.
		var getProjectGraphic = function(projectName, makeSubList)
		{
			var projectGraphicLi = $("div");
			makeSubList.append(projectGraphicLi);
			var newImg = $("img");
			var setSrc = newImg.attr("src", projectName);
			var alignImg = newImg.attr("class", "projectScreenshotAlign");
			var setWidth = newImg.attr("width", "75px");
			var setHeight = newImg.attr("height", "75px");
			projectGraphicLi.append(newImg);
			
		}
		
		//Get youtube video review url for project.
		
		//Make Item Links
		//Create Edit and Delete links for each stored item when displayed
		var makeItemLinks = function(key, linksLi)
		{
			//create line break to create space 
			//around elements
			var breakTag = document.createElement("br");
			
			//add edit single item link
			var editLink = document.createElement("a");
			editLink.href = "#";
			editLink.key = key;
			var editText = "Edit Project";
			editLink.on("click", editItem);
			editLink.html = editText;	
			linksLi.append(editLink);
			
			//add line break after edit project link
			//before delete project link
			linksLi.append(breakTag);
			
			//add delete single item link
			var deleteLink = document.createElement("a");
			deleteLink.href = "#";
			deleteLink.key = key;
			var deleteText = "Delete Project";
			deleteLink.on("click", deleteProject);
			deleteLink.html = deleteText;
			linksLi.append(deleteLink);
		}
		
		//Edit single item
		var editItem = function(projectId)
		{
			//Grab data from Item from local storage.
			var value = localStorage.getItem(projectId);
			var item = JSON.parse(value);
			
			//populate form fields with current local storage values
			//1 is value, 0 is label
			$('#mtype').val() = item.mtype[1];
			$('#mdate').val() = item.mdate[1];
			$('#mname').val() = item.mname[1];
			$('#mrating').val() = item.mrating[1];
			$('#mtags').val() = item.mtags[1];
			$('#mgraphic').val() = item.mgraphic[1];
			$('#mcomments').val() = item.mcomments[1];
			
			$('radio').removeAttr('checked');
			var radios = document.forms[0].mtopics;
			for(var i=0; i<radios.length; i++)
			{
				if(radios(i).value === "school" && item.mtopics(1) === "school")
				{
					$(radios[i]).attr("checked", "checked");
				}
				else if(radios(i).value === "work" && item.mtopics(1) === "work")
				{
					radios(i).attr("checked", "checked");
				}
				else if(radios(i).value === "inspiration" && item.mtopics(1) === "inspiration")
				{
					radios(i).attr("checked", "checked");
				}
			}
			$("input[type='radio']:first")
				.attr("checked",true)
				.checkboxradio("refresh");
			/*
			// handle yes / no check box
			if(obj.favorite(1) == "Yes")
			{
				$("fav").attr("checked", "checked");
			}
			*/
			// Remove the initial listener from the input 'save project' button
			$("#submit").unbind("click");
			
			// Change Submit button value to say Edit Button
			$('submit').val('Edit Project');
			$("submit").button('refresh');
			$('#projectForm').submit(function()
			{
				validate(projectId);
			});
		}
		
		var deleteProject = function()
		{
			var ask = confirm("You really want to Delete this Project?");
			if(ask)
			{
				localStorage.removeItem(projectId);
				alert("Project was Deleted");
				window.location.reload();
			}
			else
			{
				alert("Project was Not Deleted");
			}
		}
		
		var clearLocal = function()
		{
			if(localStorage.length === 0)
			{
				alert("No Projects in local storage to Delete.");
			}
			else
			{
				localStorage.clear();
				alert("All Projects Deleted from local storage.");
				window.location.reload();
				return false;
				//populate with test data
				//autoFillData();
			}
		}
				
		var validate = function(projectId)
		{
			//Define elements we want to check
			var getMtype = $("mtype").val();
			var getMname = $("mname").val();
			var getMdate = $("mdate").val();
			
			//Reset error messages
			$(".error").hide();
			var hasError = false;
			$('#errors').empty();
			$('#mtype').css("border", "none");
			$('#mname').css("border", "none");
			$('#mdate').css("border", "none");
			
			//Get error messages
			var messageAry = [];
			
			// Project Type Validation
			if(getMtype.value === "-- Choose Project Type--")
			{
				$('#select > div').after('<span class="error">Enter Project Type</span>');
				var projectTypeError = "Choose Project Type";
				$('#select > div').css("border", "1px solid yellow");
				hasError = true;
			}
			
			// Project Name Validation
			if(getMname.value === "")
			{
				$('#mname').after('<span class="error">Enter Project Name</span>');
				$('#mname').css("border", "1px solid yellow");
				hasError = true;
			}
			
			// Project Date Validation
			if(getMdate.value === "")
			{
				$('#mdate').after('<span class="error">Enter Project Date</span>');
				$('#mdate').css("border", "1px solid yellow");
				hasError = true;
			}
			
			// Set Errors
			if (hasError === true)
			{
				$('#submit-container').after('<span class="error">Enter Required Info</span>');
				event.preventDefault();
				return false;
			}
			else
			{
				saveProject(projectId);
			}
			
			//if errors, show them on screen
			if(messageAry.length >= 1)
			{
				for(var i=0, j=messageAry.length; i<j; i++)
				{
					var txt = document.createElement("li");
					txt.html = messageAry(i);
					errMsg.append(txt);
				}
				e.preventDefault();
				return false;
			}else{
				//If everything is good, save the data
				//Send key value that came from editData function
				//Remember key value was passed thru editSubmit even listener 
				//as a property.
				saveProject(this.key);
			}
		}

		var saveProject = function(key)
		{
			//if no key, this is brand new item 
			//so we need new key
			if(!key)
			{
				var id = Math.floor(Math.random()*10000001);
			}
			//Remove Weird Data that creates keys for file directories
			else if(key === "A-Z" || "a-z")
			{
				//delete weird data and move on
				localStorage.removeItem(this.key);
			}
			else
			{
				var id = key;
			}
			
			// run function to find Selected Radio Button
			getSelectedRadio();
				
				//Gather up all our form field values and store in object.
				//Object properties contain array with form label and input value
				var item 			= {};
					item.mtype 		= ["Project Type:",$('#mtype').val()];
					item.mgraphic   = ["Project Screenshot:",$('#mgraphic').val()];
					item.mname 		= ["Project Name:",$('#mname').val()];
					item.mdate  	= ["Project Date:",$('#mdate').val()];
					item.mrating 	= ["Project Rating:",$('#mrating').val()];
					//radio button
					item.mtopics 	= ["Project Incentive:",$('#mtopicValue').val()];
					item.mtags		= ["Project Tags:",$('#mtags').val()];
					item.mcomments	= ["Project Notes:",$('#mcomments').val()];
				//Save Data to Local Storage: Use Stringify to convert our object to a string
				//json.org
				localStorage.setItem(id, JSON.stringify(item));
				alert("Project Saved");
		}
		
		$.get("data.xml", function(d)
			{
				$("body".append("<h2>Projects</h2>");
				$("body").append("dl />");
				$(d).find("item").each(function()
				{
					var $item = $(this);
					var type = $item.attr("type");
					var name = $item.find("name").text();
					var comments = $item.find("comments").text();
					var imageurl = $item.attr("graphic");
					var html = '<dt><img class="projectImage" alt="" src="' + graphic + '" /></dt>';
					html += '<dd><span class="loadingPic" alt="Loading" />';
					html += '<p class="type">' + type + '</p>';
					html += '<p>' + name + '</p>';
					html += '<p>' + comments + '</p>';
					html += '</dd>';
					$("dl").append($(html));
				});
			});
		});

		var getData = function()
		{
			
			if(localStorage.length === 0)
			{
				$('loadjson').show();
				$('#loadjson').click(function()
				{
					alert("No Projects in local Storage. Test Data was Added.");
					//populate with test data
					autoFillData();
					return false;
				});
			}
							
			for(var i=0, len=localStorage.length; i<len; i++)
			{
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);
				
				$('<li></li>').appendTo('#items');
				
				$('<a></a>').appendTo('#items li.' + key);
				
				for(var n in obj)
				{
					//0 is label, 1 is the value
					//var optSubText = obj[n][0] + " " + obj[n][1];
					var optSubText = obj[n][1];
					makeSubli.html = optSubText;
					makeSubli.append(linksLi);
				}
				//add edit and delete button from function
				//for each item in local storage.
				makeItemLinks(localStorage.key(i), linksLi);
			}
		}
		
		makeProjectTypes();
		setDate();
});