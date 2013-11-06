// Build all of the remaining to Dos from Local Storage
$(function(){
	var storageLength = localStorage.length,
		key,
		value,
		itemsToDo,
		listItemToDo;
	
	for (var i = 0; i < storageLength; i++ ) {
			key = localStorage.key(i),
			value = localStorage[key]
			itemsToDo = $('#itemsToDo'),
			listItemToDo = $('<li class="itemToDo">' + value + '</li>');
			listItemToDo.appendTo(itemsToDo);
	}
});

