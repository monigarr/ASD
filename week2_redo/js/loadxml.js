$(document).ready(function()
{
	$.ajax(
	{
		type: "GET",
		url: "data.xml",
		dataType: "xml",
		success: function(xml) 
		{
			$(xml).find('item').each(function()
			{
				var id = $(this).attr('id');
				var title = $(this).find('type').text();
				var url = $(this).find('name').text();
				var date = $(this).find('date').val();
				var rating = $(this).find('rating').val();
				var incentive = $(this).find('incentive').val();
				var tags = $(this).find('tags').val();
				var graphic = $(this).find('graphic').val();
				var comments = $(this).find('comments').val();
				$('<div class="items" id="link_'+id+'"></div>')
					.html('<a href="'+type+'">'+type+'</a>')
					.appendTo('#page-wrap');
			});
		}
	});
});