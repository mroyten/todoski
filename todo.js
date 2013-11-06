//add items to to do list and to local storage upon inserting them into the text field
$('#toDoItem').bind('keypress', function(e) {
	if (e.which === 13) { 
		var toDoItem = $('#toDoItem'),
			toDoValue = toDoItem.val(),
			itemsToDo = $('#itemsToDo');
			listItemToDo = $('<li class="itemToDo">' + toDoValue + '</li>');
			
		if (toDoValue === "") { // check to see if nada is in the form to be entered.
			alert($.messages.emptyToDo);
			return;
		}
		
		listItemToDo.appendTo(itemsToDo); //add To Do to Da list
		localStorage.setItem(toDoValue, toDoValue); // add items to the storage
		toDoItem.val(''); 
	}
});

//toggle the item as completed
$(document).on( 'click','.itemToDo', function(e) {
	e.preventDefault;
	var target = $(e.target);
	var toDoText = target.text();
	var localStoreObject = localStorage.getItem(toDoText);
	
	localStorage.removeItem(localStoreObject);

	if (target.hasClass('completed')) {
		localStorage.setItem(toDoText, toDoText);
	} 

	target.toggleClass('completed');
});
