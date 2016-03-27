$(document).ready(function(){
	$(document.body).on('click', '.collapsible-control.collapsed', function(){
		$(this).next('.collapsible-section').slideDown(100);
		$(this).addClass('expanded').removeClass('collapsed');
	});
	$(document.body).on('click', '.collapsible-control.expanded', function(){
		$(this).next('.collapsible-section').slideUp(100);
		$(this).addClass('collapsed').removeClass('expanded');
	});
});