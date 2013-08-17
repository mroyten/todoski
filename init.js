
// Build all of the remaining to Dos from Local Storage
$(function(){
	var storageLength = localStorage.length,
		key,
		value,
		itemsToDo,
		listItemToDo;
	
	for (var i = 0; i < storageLength; i++ ) {
		//console.log(localStorage.key(i));
		var key = localStorage.key(i),
			value = localStorage[key]
			itemsToDo = $('#itemsToDo'),
			listItemToDo = $('<li class="itemToDo">' + value + '</li>');
			listItemToDo.appendTo(itemsToDo);  ////////////////////////////change this to a docFrag type and append to dom at end
	}
	/*
	remainingToDos.push(listItemToDo);
	console.log(remainingToDos);
			itemsToDo.append(remainingToDos.join("")); 

	*/
		//var remainingToDos = [];
});

//loop through and check if item has line through, if so add class "completed"
$(function(){
	var keyGroup = [],
		valueGroup = [],
		itemToDo = $('.itemToDo'),
		pattern = /-completed/i, //regExp to check for completed keys
		storageLength = localStorage.length,
		theKey,
		value,
		match;
	
	//loop through storage and create arrays if to do is completed.	
	for (var i = 0; i < storageLength; i++ ) {
		theKey = localStorage.key(i), //get key 
		value = localStorage[theKey]; //get value 
		match = pattern.exec(theKey); // check for '-completed' in the storage key
		
		if (match != null) { 
			//keyGroup.push(match);
			valueGroup.push(value);
		}
	}
	
	valueGroup.forEach(function(index) {
		itemToDo.each( function(i) {			
			if ($(this).text() == index) {
				$(this).addClass('completed');
			}		
		});
	});
					
});



